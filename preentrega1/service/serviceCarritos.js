//Require del repositorio para usar sus métodos - lo traigo desde persistence
const moduloRepositorioCarritos = require("../persistence/repositorioCarritos");
const respositorioCarritos = new moduloRepositorioCarritos();

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
}

//Exporto el contenedor para reutilizar métodos
module.exports = CartService;
