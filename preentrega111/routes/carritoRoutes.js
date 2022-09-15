//Módulo router en express
const { Router } = require("express");
//Rutas
const carrito = Router();

//Importo class contenedor para usar sus métodos
const contenedor = require("../api/contenedorCar");

//Trabajo con los elementos del contenedor
const contenedorCarrito = new contenedor("./preentrega1/dataBase/carrito.txt");

//Endpoints
//GET PRODUCT /:id?
carrito.get("/:id?", async (req, res) => {
  try {
    let id = req.params.id;
    //Si no paso id por params entonces me trae todos, sino el que busco
    if (!id) {
      const mostrarcarrito = await contenedorCarrito.getAll();
      res.json(mostrarcarrito);
    } else {
      const productoBuscado = await contenedorCarrito.getById(id);
      if (!productoBuscado) {
        return res.status(400).json({ error: `Producto no encontrado` });
      }
      //Devuelvo un json
      res.json(productoBuscado);
    }
  } catch (error) {
    console.log(`El error es: ${error}`);
  }
});

//POST CARRITO
carrito.post("/", async (req, res) => {
  try {
    const carritoNuevo = await contenedorCarrito.create()
    //Devuelvo un json
    res.status(200).json(carritoNuevo);
  } catch (error) {
    res.status(500).json(`No se puede agregar el carrito: ${error}`);
  }
});

//PUT carrito BY ID
carrito.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const { nombre, descripcion, codigo, thumbnail, precio, stock } = req.body;
    //Valido que se ingresen todos los datos necesarios para crear un producto
    if (!nombre || !descripcion || !codigo || !thumbnail || !precio || !stock) {
      res.status(400).json(`Debe ingresar todos los datos del producto`);
    }
    //Guardo en una variable los elementos que quiero modificar según el id que le pase
    const productoModificado = await contenedorCarrito.modifyById(id, {
      nombre,
      descripcion,
      codigo,
      thumbnail,
      precio,
      stock,
    });
    //Valido si el id existe
    if (!productoModificado) {
      return res.status(404).json({ error: `Producto no encontrado` });
    }
    //Devuelvo un json
    res.status(200).json(productoModificado);
  } catch (error) {
    res.status(500).json(`No se puede modificar el producto: ${error}`);
  }
});

//DELETE carrito BY ID
carrito.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    //Guardo en una variable el producto que quiero eliminar segun el id que le pase
    const productoEliminado = await contenedorCarrito.deleteById(id);
    //Valido si el id existe
    if (!productoEliminado) {
      return res.status(404).json({ error: `Producto no encontrado` });
    }
    //Devuelvo un json vacío porque el producto ya fue eliminado
    res.status(200).json(`Producto eliminado con éxito`);
  } catch (error) {
    res.status(500).json(`No se puede eliminar el producto: ${error}`);
  }
});

module.exports = { carrito };
