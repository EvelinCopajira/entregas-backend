//Require 'fs' y lo asocio a promises para acortar código
const { promises: fs } = require("fs");
//Creo la clase CONTENEDOR
class Contenedor {
  //Ruta del archivo
  constructor() {
    this.ruta = "./dataBase/productos.txt";
    //this.ruta = "./preentrega1/dataBase/productos.txt";
  }

  //Métodos
  //GET ALL
  async getAll() {
    try {
      //Leo el array con los productos
      const listaProductos = await fs.readFile(this.ruta, "utf-8");
      //Verifio si el archivo txt está vacío y traigo un [], sino parseo los datos
      if (listaProductos == "") {
        return [];
      }
      return JSON.parse(listaProductos);
    } catch (error) {
      console.log(`El error es: ${error}`);
      throw new Error("No se pueden traer los productos");
    }
  }
  //GET BY ID
  async getById(id) {
    try {
      //Obtenengo los datos existentes con getAll()
      const listaProductos = await this.getAll();
      //.filter para identificar el producto a filtrar por id
      const productoFiltrado = listaProductos.filter(
        (elemento) => elemento.id == id
      );
      //Si al buscar no encuentra nada, entonces el resultado es null
      if (productoFiltrado.length === 0) {
        return null;
      } else {
        //Escribir/guardar el nuevo [] con el producto buscado
        return productoFiltrado[0];
      }
    } catch (error) {
      console.log(`El error es: ${error}`);
    }
  }
  //SAVE
  async saveProduct(producto) {
    try {
      //Obtenengo los datos existentes con getAll()
      const listaProductos = await this.getAll();
      //.filter para traer el producto con el mismo id (si existe)
      const productosFiltrados = listaProductos.filter(
        (elem) => elem.id == producto.id
      );
      //si el producto no existe hago .push y lo creo
      if (productosFiltrados.length == 0) {
        //.push del nuevo producto al []
        listaProductos.push(producto);
      } else {
        //"Piso" los valores, con los nuevos ingresos que hago a nombre, precio y thumbnail. No traigo id porque no permito que se modifique
        productosFiltrados[0].nombre = producto.nombre;
        productosFiltrados[0].descripcion = producto.descripcion;
        productosFiltrados[0].codigo = producto.codigo;
        productosFiltrados[0].thumbnail = producto.thumbnail;
        productosFiltrados[0].precio = producto.precio;
        productosFiltrados[0].stock = producto.stock;
      }
      //Escribir/guardar el nuevo [] con el producto agregado
      await fs.writeFile(this.ruta, JSON.stringify(listaProductos, null, 2));
      return producto;
    } catch (error) {
      console.log(`El error es: ${error}`);
    }
  }
  //DELETE BY ID
  async deleteById(id) {
    try {
      //Obtenengo los datos existentes con getAll()
      const listaProductos = await this.getAll();
      //.filter para identificar el producto a elimianar por id y traer una nueva lista sin ese producto
      const otrosProductos = listaProductos.filter(
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
