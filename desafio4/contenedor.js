//Importo 'fs' y lo asocio a promises para acortar código
const { promises: fs } = require("fs");

//Creo la clase CONTENEDOR
class Contenedor {
  //Ruta del archivo
  constructor(ruta) {
    this.ruta = ruta;
  }
  //Métodos
  //Recibe un producto (nuevoproducto) y guarda en el archivo y devuelve el id de ese producto
  async save(nuevoProducto) {
    try {
      //Obtenengo los datos existentes con getAll()
      const productos = await this.getAll();

      //Buscar el id contemplando si el [] está vacío y si tiene datos que al último le suma 1 unid.
      let nuevoId;
      if (productos.length === 0) {
        nuevoId = 1;
      } else {
        const ultimoId = productos[productos.length - 1].id;
        nuevoId = ultimoId + 1;
      }
      //.push del nuevo producto al [] y le sumo la propiedad id
      productos.push({ ...nuevoProducto, id: nuevoId });

      //Escribir/guardar el nuevo [] con el producto agregado
      await fs.writeFile(this.ruta, JSON.stringify(productos, null, 2));
      return nuevoId;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async getById(id) {
    try {
      //Obtenengo los datos existentes con getAll()
      const productos = await this.getAll();

      //.filter para identificar el producto a traer por id
      const productoFiltrado = productos.filter((elemento) => elemento.id === id);

      //Si al buscar no encuentra nada, entonces el resultado no existe que avise por consola, si no que traiga el producto con ese id
      if (productoFiltrado.length === 0) {
        throw new Error(`No se encontró el id ${id}`);
      } else {
        //Escribir/guardar el nuevo [] con el producto buscado
        return productoFiltrado[0];
      }
    } catch (error) {
      console.log(`Error getById: ${error}`);
    }
  }

  async getAll() {
    //Leo todo el archivo de productos.txt y parseo el string productos usando async/await - try/catch
    try {
      const productos = await fs.readFile(this.ruta, "utf-8");
      return JSON.parse(productos);
    } catch (error) {
      return [];
    }
  }

  async deleteById(id) {
    try {
      //Obtenengo los datos existentes con getAll()
      const productos = await this.getAll();

      //.filter para identificar el producto a elimianar por id
      const productoFiltrado = productos.filter((elemento) => elemento.id !== id);

      //Si el id no existe no cambió el tamaño de mi []
      if (productoFiltrado.length === productos.length) {
        throw new Error(
          `No existe el producto con el id nro ${id}, no se elimina nada`
        );
      }
      //Escribir/guardar el nuevo [] con el producto borrado
      await fs.writeFile(this.ruta, JSON.stringify(productoFiltrado, null, 2));
    } catch (error) {
      console.log(`Error deleteById: ${error}`);
    }
  }
}

//Exporto el contenedor para reutilizar métodos
module.exports = Contenedor;
