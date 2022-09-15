const cartRepositorioModule = require("../persistencia/carritoRepositorio");

const cartRepositorio = new cartRepositorioModule();

//Require 'fs' y lo asocio a promises para acortar código
const { promises: fs } = require("fs");
//Creo la clase CONTENEDOR
class Contenedor {
  //Ruta del archivo
  constructor() {
    this.ruta = "asd";
  }

  //Métodos
  //GET ALL
  async getAll() {
    try {
      const listaCarritos = await fs.readFile(this.ruta, "utf-8");
      return JSON.parse(listaCarritos);
    } catch (error) {
      console.log(`El error es: ${error}`);
      return undefined;
    }
  }
  //GET BY ID
  async getById(id) {
    try {
      //Obtenengo los datos existentes con getAll()
      const listaCarritos = await this.getAll();
      //.filter para identificar el producto a filtrar por id
      const productoFiltrado = listaCarritos.filter(
        (elemento) => elemento.id == id
      );
      //Si al buscar no encuentra nada, entonces el resultado es null
      if (productoFiltrado.length === 0) {
        return null;
      }
      //Escribir/guardar el nuevo [] con el producto buscado
      return productoFiltrado[0];
    } catch (error) {
      console.log(`El error es: ${error}`);
    }
  }
  //SAVE
  async create() {
    try {
      //Obtenengo los datos existentes con getAll()
      let listaCarritos = await cartRepositorio.getAll();
      listaCarritos = listaCarritos == undefined ? [] : listaCarritos;
      //Validación para asignarle 1 al primer producto, si el array está vacío, y sino sumarle 1 al último que tenga creado
      const nuevoId =
         listaCarritos.length == 0
          ? 1
          : listaCarritos[listaCarritos.length - 1].id + 1;
      //Timestamp
      const timeStamp = Date.now();

      const nuevoCarrito = { id: nuevoId, timestamp: timeStamp, productos: []}

      return cartRepositorio.saveCart(listaCarritos, nuevoCarrito)

      // const product_id = nuevoCarrito.product_id
      // const product = getProductById(product_id)
      // if (product == undefined) {
      //   console.log("No existe el producto")
      //   return undefined;
      // }
      

      // //Sumo el id generado al carrito
      // nuevoCarrito = { id: nuevoId, timestamp: timeStamp, ...nuevoCarrito };
      //.push del nuevo producto al []
      listaCarritos.push(nuevoCarrito);
      //Escribir/guardar el nuevo [] con el producto agregado
      await fs.writeFile(this.ruta, JSON.stringify(listaCarritos, null, 2));
      return nuevoCarrito;
    } catch (error) {
      console.log(`El error es: ${error}`);
    }
  }

  async agregarProduct(id, product_id) {
    // Leer carrito por id
    // leer producto por product_id
    // si ambos existen, 
  }

  //MODIFY BY ID
  //Según el id que quiero modificar le asigno nuevosValores para reescribirlo
  async modifyById(id, nuevosValores) {
    try {
      //Obtenengo los datos existentes con getAll()
      const listaCarritos = await this.getAll();
      //.filter para identificar el producto a traer por id
      const productoFiltrado = listaCarritos.filter(
        (elemento) => elemento.id == id
      );
      //Si al buscar no encuentra nada, entonces el resultado es null
      if (productoFiltrado.length === 0) {
        return null;
      }
      //"Piso" los valores, con los nuevos ingresos que hago a nombre, precio y thumbnail. No traigo id porque no permito que se modifique. Si lo agrega lo ignora
      productoFiltrado[0].nombre = nuevosValores.nombre;
      productoFiltrado[0].descripcion = nuevosValores.descripcion;
      productoFiltrado[0].codigo = nuevosValores.codigo;
      productoFiltrado[0].thumbnail = nuevosValores.thumbnail;
      productoFiltrado[0].precio = nuevosValores.precio;
      productoFiltrado[0].stock = nuevosValores.stock;
      //Escribir/guardar el nuevo [] con el producto modificado
      await fs.writeFile(this.ruta, JSON.stringify(listaCarritos, null, 2));
      return productoFiltrado[0];
    } catch (error) {
      console.log(`El error es: ${error}`);
    }
  }
  //DELETE BY ID
  async deleteById(id) {
    try {
      //Obtenengo los datos existentes con getAll()
      const listaCarritos = await this.getAll();
      //.filter para identificar el producto a elimianar por id y traer una nueva lista sin ese producto
      const otrosProductos = listaCarritos.filter(
        (elemento) => elemento.id != id
      );
      //Escribir/guardar el nuevo [] con el objeto borrado
      await fs.writeFile(this.ruta, JSON.stringify(otrosProductos, null, 2));
    } catch (error) {
      console.log(`El error es: ${error}`);
    }
  }
}

//Exporto el contenedor para reutilizar métodos
module.exports = Contenedor;
