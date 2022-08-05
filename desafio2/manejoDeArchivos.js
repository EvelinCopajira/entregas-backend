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
    //Obtenengo los datos existentes con getAll()
    const objetos = await this.getAll();

    //.filter para identificar el objeto a traer por id
    const objetoFiltrado = objetos.filter((elemento) => elemento.id === id);
    //Si al buscar no encuentra nada, entonces el resultado no existe que traiga error
    if (objetoFiltrado.length === 0) {
      console.log(`Error al buscar: no se encontró el id ${id}`);
    }
    //Si existe, leo todo el archivo de productos.txt y parseo el string objetos usando async/await - try/catch
    try {
      await fs.writeFile(this.ruta, JSON.stringify(objetoFiltrado, null, 2));
      return JSON.parse(objetos);
    } catch (error) {
      return [];
    }
  }

  async getAll() {
    //Leo todo el archivo de productos.txt y parseo el string objetos usando async/await - try/catch
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

    //.filter para identificar el objeto a elimianar por id
    const objetoFiltrado = objetos.filter((elemento) => elemento.id !== id);
    //Si el id no existe no cambió el tamaño de mi []
    if (objetoFiltrado.length === objetos.length) {
      throw new Error(`Error al borrar: no se encontró el ${id}`);
    }

    //Escribir/guardar el nuevo [] con el objeto borrado usando async/await - try/catch
    try {
      await fs.writeFile(this.ruta, JSON.stringify(objetoFiltrado, null, 2));
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async deleteAll() {
    //Vacío el [] completo y re escribo
    try {
      const arrayVacio = [];
      await fs.writeFile(this.ruta, JSON.stringify(arrayVacio, null, 2));
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
}

//Creo elementos/listas dentro del contenedor con el constructor
const listaProductos = new Contenedor("./productos.txt");

//Listado de productos - agregar SAVE
//listaProductos.save({ title: "Pantalon corto", price: 150 });

//Listado de productos - buscar por id GET BY ID
listaProductos.getById(2);

//Listado de productos - traer todos los disponibles GET ALL
//listaProductos.getAll();

//Listado de productos - borrar por id DELETE BY ID
//listaProductos.deleteById(1);

//Listado de productos - vaciar todo DELETE ALL
//listaProductos.deleteAll()
