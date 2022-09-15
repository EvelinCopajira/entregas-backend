//Require 'fs' y lo asocio a promises para acortar código
const { promises: fs } = require("fs");
//Creo la clase CONTENEDOR
class Contenedor {
  //Ruta del archivo
  constructor() {
    this.ruta = "./dataBase/carritos.txt";
    // this.ruta = "./preentrega1/dataBase/carritos.txt";
  }

  //Métodos
  //SAVE
  async saveCart(carrito) {
    try {
      //Obtenengo los datos existentes con getAll()
      const listaCarritos = await this.getAll();
      //.filter para traer el carrito con el mismo id (si existe)
      const carritosFiltrados = listaCarritos.filter(
        (elem) => elem.id == carrito.id
      );
      //si el carrito no existe hago .push y lo creo
      if (carritosFiltrados.length == 0) {
        //.push del nuevo carrito al []
        listaCarritos.push(carrito);
      } else {
        //"Piso" los valores, con los nuevos ingresos que hago a nombre, precio y thumbnail. No traigo id porque no permito que se modifique
        carritosFiltrados[0].productos = carrito.productos;
      }
      //Escribir/guardar el nuevo [] con el carrito agregado
      await fs.writeFile(this.ruta, JSON.stringify(listaCarritos, null, 2));
      return carrito;
    } catch (error) {
      console.log(`El error es: ${error}`);
    }
  }
  //GET ALL
  async getAll() {
    try {
      //Leo el array con los carritos
      const listaCarritos = await fs.readFile(this.ruta, "utf-8");
      //Verifio si el archivo txt está vacío y traigo un [], sino parseo los datos
      if (listaCarritos == "") {
        return [];
      }
      return JSON.parse(listaCarritos);
    } catch (error) {
      console.log(`El error es: ${error}`);
      throw new Error("No se pueden traer los carritos");
    }
  }
  //DELETE BY ID
  async deleteById(id) {
    try {
      //Obtenengo los datos existentes con getAll()
      const listaCarritos = await this.getAll();
      //.filter para identificar el carrito a elimianar por id y traer una nueva lista sin ese carrito
      const otrosCarritos = listaCarritos.filter(
        (elemento) => elemento.id != id
      );
      //Escribir/guardar el nuevo [] con el objeto borrado
      await fs.writeFile(this.ruta, JSON.stringify(otrosCarritos, null, 2));
    } catch (error) {
      console.log(`El error es: ${error}`);
    }
  }
  //GET BY ID
  async getById(id) {
    try {
      //Obtenengo los datos existentes con getAll()
      const listaCarritos = await this.getAll();
      //.filter para identificar el carrito a filtrar por id
      const carritoFiltrado = listaCarritos.filter(
        (elemento) => elemento.id == id
      );
      //Si al buscar no encuentra nada, entonces el resultado es null
      if (carritoFiltrado.length === 0) {
        return null;
      } else {
        //Escribir/guardar el nuevo [] con el producto buscado
        return carritoFiltrado[0];
      }
    } catch (error) {
      console.log(`El error es: ${error}`);
    }
  }
}

//Exporto el contenedor para reutilizar métodos
module.exports = Contenedor;
