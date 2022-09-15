//Require 'fs' y lo asocio a promises para acortar código
const { promises: fs } = require("fs");
//Creo la clase CONTENEDOR
class Contenedor {
  //Ruta del archivo
  constructor(ruta) {
    this.ruta = ruta;
  }

  //Métodos
  //GET ALL
  async getAll() {
    try {
      const listaProductos = await fs.readFile(this.ruta, "utf-8");
      return JSON.parse(listaProductos);
    } catch (error) {
      console.log(`El error es: ${error}`);
      return undefined;
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
      //Obtenengo los datos existentes con getAll()
      let listaProductos = await this.getAll();
      listaProductos = listaProductos == undefined ? [] : listaProductos;
      //Validación para asignarle 1 al primer producto, si el array está vacío, y sino sumarle 1 al último que tenga creado
      const nuevoId =
        listaProductos.length == 0
          ? 1
          : listaProductos[listaProductos.length - 1].id + 1;
      //Timestamp
      const timeStamp = Date.now();
      //Sumo el id generado al producto
      nuevoProducto = { id: nuevoId, timestamp: timeStamp, ...nuevoProducto };
      //.push del nuevo producto al []
      listaProductos.push(nuevoProducto);
      //Escribir/guardar el nuevo [] con el producto agregado
      await fs.writeFile(this.ruta, JSON.stringify(listaProductos, null, 2));
      return nuevoProducto;
    } catch (error) {
      console.log(`El error es: ${error}`);
    }
  }
  //MODIFY BY ID
  //Según el id que quiero modificar le asigno nuevosValores para reescribirlo
  async modifyById(id, nuevosValores) {
    try {
      //Obtenengo los datos existentes con getAll()
      const listaProductos = await this.getAll();
      //.filter para identificar el producto a traer por id
      const productoFiltrado = listaProductos.filter(
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
      await fs.writeFile(this.ruta, JSON.stringify(listaProductos, null, 2));
      return productoFiltrado[0];
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
