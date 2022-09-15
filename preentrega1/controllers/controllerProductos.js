//Módulo router en express
const { Router } = require("express");
//Rutas
const productos = Router();

//Require del service para utilizar las funciones
const ProductService = require("../service/serviceProductos");
const productService = new ProductService();

//Endpoints
//GET ALL
productos.get("/", async (req, res) => {
  try {
    //Reutilizo funciones del la class en service
    const showAll = await productService.getAllProducts();
    //Devuelvo un json
    res.status(200).json(showAll);
  } catch (error) {
    res.status(500).json({
      mensaje: "No se puden traer los productos",
      detalle: `${error}`,
    });
  }
});
//GET PRODUCT
productos.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    //Reutilizo funciones del la class en service
    const productoBuscado = await productService.getProductById(id);
    //Devuelvo un json
    res.status(200).json(productoBuscado);
  } catch (error) {
    res.status(500).json({
      mensaje: `No se pude traer el producto con id ${id}`,
      detalle: `${error}`,
    });
  }
});
//POST PRODUCT
productos.post("/", async (req, res) => {
  try {
    //Guardo en una variable las key del nuevo producto
    const productoNuevo = await productService.createProduct(req.body);
    //Devuelvo un json
    res.status(200).json(productoNuevo);
  } catch (error) {
    res.status(500).json({
      mensaje: "No se puede crear el producto",
      detalle: `${error}`,
    });
  }
});
//PUT PRODUCT BY ID
productos.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    //Guardo en una variable los elementos que quiero modificar según el id que le pase
    const productoModificado = await productService.updateProduct(id, req.body);
    //Devuelvo un json
    res.status(200).json(productoModificado);
  } catch (error) {
    res.status(500).json({
      mensaje: `No se pudo modificar el producto con id ${id}`,
      detalle: `${error}`,
    });
  }
});
//DELETE PRODUCT BY ID
productos.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    //Guardo en una variable el producto eliminado segun el id que le pase
    const productoEliminado = await productService.deleteProductById(id);
    //Devuelvo no content
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      mensaje: `No se puden eliminar el producto con id ${id}`,
      detalle: `${error}`,
    });
  }
});

module.exports = { productos };
