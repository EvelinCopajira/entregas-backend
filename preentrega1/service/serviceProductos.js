//Require del repositorio para usar sus métodos - lo traigo desde persistence
const moduloRepositorioProductos = require("../persistence/repositorioProductos");
const repositorioProductos = new moduloRepositorioProductos();

class ProductsService {
  //CREATE
  async createProduct(nuevoProducto) {
    if (!global.administrador) {
        throw new Error("No tenes permisos")
    }
    const { nombre, descripcion, codigo, thumbnail, precio, stock } =
      nuevoProducto;
    //Valido que se ingresen todos los datos necesarios para crear un producto
    if (!nombre || !descripcion || !codigo || !thumbnail || !precio || !stock) {
      throw new Error(
        "Error en la validacion de entrada de datos: falta alguno"
      );
    }
    //Programación defensiva - por si el array queda vacío
    const listaProductos = (await repositorioProductos.getAll()) || [];
    //Validación para asignarle 1 al primer producto, si el array está vacío, y sino sumarle 1 al último que tenga creado
    const nuevoId =
      listaProductos.length == 0
        ? 1
        : listaProductos[listaProductos.length - 1].id + 1;
    //Timestamp con Date.now
    const timeStamp = Date.now();
    //Sumo el id generado al producto
    nuevoProducto = { id: nuevoId, timestamp: timeStamp, ...nuevoProducto };
    return await repositorioProductos.save(nuevoProducto);
  }
  //GET ALL
  async getAllProducts() {
    return await repositorioProductos.getAll();
  }

  //GET BY ID
  async getProductById(id) {
    const producto = await repositorioProductos.getById(id);
    //Si el producto es null es porque no existe cuando hice el .filter en persistence, sino devuelvoe el producto asociado al id
    if (producto == null) {
      throw new Error("No existe producto con ese id");
    }
    return producto;
  }

  //UPDATE PRODUCT BY ID
  async updateProduct(id, nuevosValores) {
    if (!global.administrador) {
        throw new Error("No tenes permisos")
    }
    const { nombre, descripcion, codigo, thumbnail, precio, stock } =
      nuevosValores;
    //Valido que se ingresen todos los datos necesarios para modificar un producto
    if (!nombre || !descripcion || !codigo || !thumbnail || !precio || !stock) {
      throw new Error(
        "Error en la validacion de entrada de datos: falta alguno"
      );
    }
    //Busco el producto a modificar por su id
    const producto = await repositorioProductos.getById(id);
    //Valido si existe el id que quiero modificar
    if (!producto) {
      throw new Error("No existe producto con ese id");
    }
    //"Piso" los valores, con los nuevos ingresos. No traigo id porque no permito que se modifique. Si lo agrega lo ignora
    producto.nombre = nuevosValores.nombre;
    producto.descripcion = nuevosValores.descripcion;
    producto.codigo = nuevosValores.codigo;
    producto.thumbnail = nuevosValores.thumbnail;
    producto.precio = nuevosValores.precio;
    producto.stock = nuevosValores.stock;
    return await repositorioProductos.save(producto);
  }

  async deleteProductById(id) {
    if (!global.administrador) {
        throw new Error("No tenes permisos")
    }
    const productoAEliminar = await repositorioProductos.getById(id);
    //Valido si existe el id que quiero modificar
    if (productoAEliminar) {
        console.log("asd")
      await repositorioProductos.deleteById(id);
    }
  }
}

//Exporto el contenedor para reutilizar métodos
module.exports = ProductsService;
