class Contenedor {
    //Ruta del archivo
    constructor() {
      this.ruta = "./preentrega1/dataBase/carrito.txt";
    }

async saveCart(listaCarritos, carrito) {
    listaCarritos.push(nuevoCarrito);
      //Escribir/guardar el nuevo [] con el producto agregado
    await fs.writeFile(this.ruta, JSON.stringify(listaCarritos, null, 2));
    
    return nuevoCarrito;
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

  // get by id de carrito

}