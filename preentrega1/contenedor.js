//Require 'fs' y lo asocio a promises para acortar código
const { promises: fs } = require("fs");
//Creo la clase CONTENEDOR
class Contenedor {
  //Ruta del archivo
  constructor() {
    this.listaProductos = [
      {
        id: 1,
        timestamp: 1662774219923,
        nombre: "Pantalon",
        descripcion: "",
        codigo: "",
        thumbnail: "url",
        precio: 1150,
        stock: 3,
      },
      {
        id: 2,
        timestamp: 1662774219933,
        nombre: "Pantalon corto",
        descripcion: "",
        codigo: "",
        thumbnail: "url",
        precio: 850,
        stock: 9,
      },
    ];
  }

  //Métodos
  //GET ALL
  async getAll() {
    try {
      return this.listaProductos;
    } catch (error) {
      console.log(`El error es: ${error}`);
    }
  }
  //GET BY ID
  async getById(id) {
    try {
      //.filter para identificar el producto a filtrar por id
      const productoFiltrado = this.listaProductos.filter(
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
  async save(nuevoProducto) {
    try {
      //Validación para asignarle 1 al primer producto, si el array está vacío, y sino sumarle 1 al último que tenga creado
      const nuevoId =
        this.listaProductos.length == 0
          ? 1
          : this.listaProductos[this.listaProductos.length - 1].id + 1;
      //Timestamp
      const timeStamp = Date.now();
      //Sumo el id generado al producto
      nuevoProducto = { id: nuevoId, timestamp: timeStamp, ...nuevoProducto };
      //.push del nuevo producto al []
      this.listaProductos.push(nuevoProducto);
      return nuevoProducto;
    } catch (error) {
      console.log(`El error es: ${error}`);
    }
  }
  //MODIFY BY ID
  //Según el id que quiero modificar le asigno nuevosValores para reescribirlo
  async modifyById(id, nuevosValores) {
    try {
      //.filter para identificar el producto a traer por id
      const productoFiltrado = this.listaProductos.filter(
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
      return productoFiltrado[0];
    } catch (error) {
      console.log(`El error es: ${error}`);
    }
  }
  //DELETE BY ID
  async deleteById(id) {
    try {
      //.filter para identificar el producto a elimianar por id y traer una nueva lista sin ese producto
      const otrosProductos = this.listaProductos.filter(
        (elemento) => elemento.id != id
      );
      //Guardo el resto de productos, sobre listaProductos y no traigo nada más porque ya se eliminó
      this.listaProductos = otrosProductos;
    } catch (error) {
      console.log(`El error es: ${error}`);
    }
  }
}

//Exporto el contenedor para reutilizar métodos
module.exports = Contenedor;
