//Creo la clase CONTENEDOR
class Contenedor {
  //Ruta del archivo
  constructor() {
    this.listaProductos = [
      {
        title: "Pantalon",
        price: 1150,
        thumbnail: "url",
        id: 1,
      },
      {
        title: "Pantalon corto",
        price: 850,
        thumbnail: "url",
        id: 2,
      },
      {
        title: "Remera",
        price: 250,
        thumbnail: "url",
        id: 3,
      },
    ];
  }

  //Métodos
  //CREATE
  //Recibe un producto (nuevoproducto) y guarda en el archivo y le asigna un el id a ese producto
  async create(nuevoProducto) {
    try {
      //Validación para asignarle 1 al primer producto, si el array está vacío, y sino sumarle 1 al último que tenga creado
      const nuevoId =
        this.listaProductos.length == 0
          ? 1
          : this.listaProductos[this.listaProductos.length - 1].id + 1;

      //Sumo el id generado al producto
      nuevoProducto = { ...nuevoProducto, id: nuevoId };

      //.push del nuevo producto al []
      this.listaProductos.push(nuevoProducto);

      return nuevoProducto;
    } catch (error) {
      throw new Error(`Error: ${error}`);
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
      throw new Error(`Error: ${error}`);
    }
  }

  //GET ALL
  async getAll() {
    try {
      return this.listaProductos;
    } catch (error) {
      throw new Error(`Error: ${error}`);
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

      //"Piso" los valores, con los nuevos ingresos que hago a title, price y thumbnail. No traigo id porque no permito que se modifique. Si lo agrega lo ignora
      productoFiltrado[0].title = nuevosValores.title;
      productoFiltrado[0].price = nuevosValores.price;
      productoFiltrado[0].thumbnail = nuevosValores.thumbnail;

      return productoFiltrado[0];
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      //.filter para identificar el producto a elimianar por id y traer una nueva lista sin ese producto
      const otrosProductos = this.listaProductos.filter(
        (elemento) => elemento.id != id
      );

      //Guardo el resto de productos, sobre listaProductos y no traigo nada más porque ya se eliminó
      this.listaProductos = otrosProductos;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
}

//Exporto el contenedor para reutilizar métodos
module.exports = Contenedor;
