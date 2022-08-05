//Importo 'fs' y lo asocio a promises para acortar código
const { promises: fs } = require("fs");

//Creo la clase CONTENEDOR
class Contenedor {
  //Ruta del archivo
  constructor(ruta) {
    this.ruta = ruta;
  }
  //Métodos
  //Recibe un objeto (nuevoObjeto) y guarda en el archivo y devuelve el id de ese objeto
  async save(nuevoObjeto) {
    //Obtenengo los datos existentes con getAll()
    const objetos = await this.getAll();

    //Buscar el id contemplando si el [] está vacío y si tiene datos que al último le suma 1 unid.
    let nuevoId;
    if (objetos.length === 0) {
      nuevoId = 1;
    } else {
      const ultimoId = objetos[objetos.length - 1].id;
      nuevoId = ultimoId + 1;
    }

    //.push del nuevo producto al [] y le sumo la propiedad id
    objetos.push({ id: nuevoId, ...nuevoObjeto });

    //Escribir/guardar el nuevo [] con el objeto agregado usando async/await - try/catch
    try {
      await fs.writeFile(this.ruta, JSON.stringify(objetos, null, 2));
      return nuevoId;
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async getById(id) {
    return "";
  }

  async getAll() {
    //Leo todo el archivo de productos.txt y parseo el string productos usando async/await - try/catch
    try {
      const objetos = await fs.readFile(this.ruta, "utf-8");
      return JSON.parse(objetos);
    } catch (error) {
      return [];
    }
  }

  async deleteById(id) {
    //Obtenengo los datos existentes con getAll()
    const objetos = await this.getAll();

    //.filter para identificar el objeto a elimianr por id
    const objetosFiltrados = objetos.filter((elemento) => elemento.id != id);
    //Si el id no existe no cambió el tamaño de mi []
    if (objetosFiltrados.length === objetos.length) {
      throw new Error(`Error al borrar: no se encontró el ${id}`);
    }

    //Escribir/guardar el nuevo [] con el objeto agregado usando async/await - try/catch
    try {
      await fs.writeFile(this.ruta, JSON.stringify(objetosFiltrados, null, 2));
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async deleteAll() {}
}

//Creo elementos/listas dentro del contenedor con el constructor
const listaProductos = new Contenedor("./productos.txt");

//Listado de productos - agregar
//listaProductos.save({ title: "Remera", price: 100 });

//Listado de productos - borrar por id
listaProductos.deleteById(1)
