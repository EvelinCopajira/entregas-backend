//Módulo router en express
const { Router } = require("express");
//Rutas
const productos = Router();

//Importo class contenedor para usar sus métodos
const contenedor = require("../contenedor");

//Trabajo con los elementos del contenedor
const contenedorProductos = new contenedor();

//Endpoints
//GET PRODUCT /:id?
productos.get("/:id?", async (req, res) => {
  try {
    let id = req.params.id;
    //Si no paso id por params entonces me trae todos, sino el que busco
    if (!id) {
      const mostrarProductos = await contenedorProductos.getAll();
      res.json(mostrarProductos);
    } else {
      const productoBuscado = await contenedorProductos.getById(id);
      if (!productoBuscado) {
        return res.status(404).json({ error: `Producto no encontrado` });
      }
      //Devuelvo un json
      res.json(productoBuscado);
    }
  } catch (error) {
    res.status(500).json(`Proucto no encontrado: ${error}`);
  }
});

//POST PRODUCTOS
productos.post("/", async (req, res) => {
  try {
    const { nombre, descripcion, codigo, thumbnail, precio, stock } = req.body;

    if (!nombre || !descripcion || !codigo || !thumbnail || !precio || !stock) {
      res.status(400).json(`Debe ingresar todos los datos del producto`);
    }
    //Guardo en una variable los nuevos
    const productoNuevo = await contenedorProductos.save({
      nombre,
      descripcion,
      codigo,
      thumbnail,
      precio,
      stock,
    });
    //Devuelvo un json
    res.status(200).json(productoNuevo);
  } catch (error) {
    res.status(500).json(`No se puede agregar el producto: ${error}`);
  }
});

//PUT PRODUCTOS BY ID
productos.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const { nombre, precio, thumbnail } = req.body;

    //Guardo en una variable los elementos que quiero modificar según el id que le pase
    const productoModificado = await contenedorProductos.modifyById(id, {
      nombre,
      precio,
      thumbnail,
    });

    //Valido si el id eiste
    if (!productoModificado) {
      return res.status(404).json({ error: `Producto no encontrado` });
    }
    //Devuelvo un json
    res.json({ productoModificado });
  } catch (error) {
    res.status(500).json(`No se puede modificar el producto: ${error}`);
  }
});

//DELETE PRODUCTOS BY ID
productos.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;

    //Guardo en una variable el producto que quiero modificar según el id que le pase
    const productoEliminado = await contenedorProductos.deleteById(id);

    //Devuelvo un json vacío porque el producto ya fue eliminado
    res.json({});
    //res.status(204); - CONSULTAR SI SE USA ESTE ERROR
  } catch (error) {
    res.status(500).json(`No se puede eliiminar el producto: ${error}`);
  }
});

module.exports = { productos };
