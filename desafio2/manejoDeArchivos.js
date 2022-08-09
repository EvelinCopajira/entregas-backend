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
    try {
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
      objetos.push({ ...nuevoObjeto, id: nuevoId });

      //Escribir/guardar el nuevo [] con el objeto agregado
      await fs.writeFile(this.ruta, JSON.stringify(objetos, null, 2));
      return nuevoId;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async getById(id) {
    try {
      //Obtenengo los datos existentes con getAll()
      const objetos = await this.getAll();

      //.filter para identificar el objeto a traer por id
      const objetoFiltrado = objetos.filter((elemento) => elemento.id === id);

      //Si al buscar no encuentra nada, entonces el resultado no existe que avise por consola, si no que traiga el producto con ese id
      if (objetoFiltrado.length === 0) {
        throw new Error(`No se encontró el id ${id}`);
      } else {
        //Escribir/guardar el nuevo [] con el objeto buscado
        return objetoFiltrado[0];
      }
    } catch (error) {
      console.log(`Error getById: ${error}`);
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
    try {
      //Obtenengo los datos existentes con getAll()
      const objetos = await this.getAll();

      //.filter para identificar el objeto a elimianar por id
      const objetoFiltrado = objetos.filter((elemento) => elemento.id !== id);

      //Si el id no existe no cambió el tamaño de mi []
      if (objetoFiltrado.length === objetos.length) {
        throw new Error(`No existe el producto con el id nro ${id}, no se elimina nada`);
      }
      //Escribir/guardar el nuevo [] con el objeto borrado
      await fs.writeFile(this.ruta, JSON.stringify(objetoFiltrado, null, 2));
    } catch (error) {
      console.log(`Error deleteById: ${error}`);
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

//Llamado a métodos
async function main() {
  //Creo elementos/listas dentro del contenedor con el constructor
  const listaProductos = new Contenedor("./productos.txt");

  //Listado de productos - traer todos los disponibles GET ALL
  console.log(`- Método GET ALL -`);
  let listadoCompleto = await listaProductos.getAll();
  console.log(`Listado de productos completo:`, listadoCompleto);

  //Listado de productos - agregar SAVE
  console.log(`- Método SAVE -`);
  const producto1 = await listaProductos.save({
    title: "Pantalon",
    price: 1150,
    thumbnail: "url",
  });
  const producto2 = await listaProductos.save({
    title: "Pantalon corto",
    price: 850,
    thumbnail: "url",
  });
  const producto3 = await listaProductos.save({
    title: "Remera",
    price: 250,
    thumbnail: "url",
  });

  console.log(`Id de producto 1`, producto1);
  console.log(`Id de producto 2`, producto2);
  console.log(`Id de producto 3`, producto3);

  //Listado de productos - buscar por id GET BY ID
  console.log(`- Método GET BY ID -`);
  let productoBuscado = await listaProductos.getById(3);
  if (productoBuscado != undefined) {
    console.log(`El producto con id nro ${productoBuscado.id} es:`, productoBuscado);
  }

  //Listado de productos - traer todos los disponibles GET ALL
  console.log(`- Método GET ALL -`);
  listadoCompleto = await listaProductos.getAll();
  console.log(`Listado de productos completo:`, listadoCompleto);

  //Listado de productos - borrar por id DELETE BY ID
  console.log(`- Método DELETE BY ID -`);
  listadoCompleto = await listaProductos.deleteById(13);

  console.log(`- Método DELETE ALL -`);
  //Listado de productos - vaciar todo DELETE ALL
  //listadoCompleto = await listaProductos.deleteAll()
}

main();
