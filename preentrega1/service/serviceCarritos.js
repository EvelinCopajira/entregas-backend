//Require del repositorio para usar sus métodos - lo traigo desde persistence
const moduloRepositorioCarritos = require("../persistence/repositorioCarritos");
const respositorioCarritos = new moduloRepositorioCarritos();
//Require del repositorio para usar sus métodos - lo traigo desde persistence
const moduloRepositorioProductos = require("../persistence/repositorioProductos");
const repositorioProductos = new moduloRepositorioProductos();

class CartService {
  //CREATE CARRITO
  async createCart(nuevoCarrito) {
    //Programación defensiva - por si el array queda/está vacío
    const listaCarritos = (await respositorioCarritos.getAll()) || [];
    //Validación para asignarle 1 al primer carrito, si el array está vacío, y sino sumarle 1 al último que tenga creado
    const nuevoIdCarrito =
      listaCarritos.length == 0
        ? 1
        : listaCarritos[listaCarritos.length - 1].id + 1;
    //Timestamp con Date.now
    const timeStampCarrito = Date.now();
    //Sumo el id y el timestamp generados al carrito
    nuevoCarrito = {
      id: nuevoIdCarrito,
      timestamp: timeStampCarrito,
      ...nuevoCarrito,
    };
    return await respositorioCarritos.saveCart(nuevoCarrito);
  }
  //GET ALL- BORRAR NO LO NECESITO
  async getAllCarts() {
    return await respositorioCarritos.getAll();
  }
  //DELETE CARRITO BY ID
  async deleteCartById(id) {
    const carritoAEliminar = await respositorioCarritos.getById(id);
    //Valido si existe el id que quiero eliminar, lo vacío y borro
    if (carritoAEliminar) {
      carritoAEliminar.productos = [];
      await respositorioCarritos.deleteById(id);
    }
  }
  //GET PRODUCTS IN CART BY ID
  async getCartProducts(id) {
    const carrito = await respositorioCarritos.getById(id);
    //Valido que el caarrito existe
    if (carrito == null) {
      throw new Error("No se puede traer el carrito");
    }
    //Con .map traigo todos los productos del carrito que tenga el id que le estoy pasando
    return await Promise.all(
      carrito.productos.map(async (productId) => {
        return await repositorioProductos.getById(productId);
      })
    );
  }
  //POST PRODUCTS IN CART BY ID
  async addProductToCart(id, productId) {
    const carrito = await respositorioCarritos.getById(id);
    //Valido que el caarrito existe
    if (carrito == null) {
      throw new Error("No se puede traer el carrito");
    }
    //Si el carrito existe, traigo de repositorio productos los id's disponibles para agregar
    const product = await repositorioProductos.getById(productId);
    if (product == null) {
      throw new Error("No existe el producto");
    }
    //Le agrego el product.id a un carrito especifico
    carrito.productos.push(product.id);
    return await respositorioCarritos.saveCart(carrito);
  }
  //DELETE PRODUCTS BY ID IN CART BY ID
  async deleteProductInCart(id, productId) {
    const carrito = await respositorioCarritos.getById(id);
    //Valido que el carrito existe
    if (carrito == null) {
      throw new Error("No se puede traer el carrito");
    }
    //Si el carrito existe, traigo de repositorio productos los id's disponibles para eliminar
    const product = await repositorioProductos.getById(productId);
    if (product == null) {
      throw new Error("No existe el producto");
    }
    await repositorioProductos.deleteById(productId);
  }
}

//Exporto el contenedor para reutilizar métodos
module.exports = CartService;
