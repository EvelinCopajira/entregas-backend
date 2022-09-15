//Módulo router en express
const { Router } = require("express");
//Rutas
const carritos = Router();

//Require del service para utilizar las funciones
const CartService = require("../service/serviceCarritos");
const cartService = new CartService();

//Endpoints
//GET ALL - BORRAR NO LO NECESITO
carritos.get("/", async (req, res) => {
  try {
    //Reutilizo funciones del la class en service
    const showAll = await cartService.getAllCarts();
    //Devuelvo un json
    res.status(200).json(showAll);
  } catch (error) {
    res.status(500).json({
      mensaje: "No se puden traer los carritos",
      detalle: `${error}`,
    });
  }
});
//POST CART
carritos.post("/", async (req, res) => {
  try {
    //Guardo en una variable las key del nuevo producto
    const carritoNuevo = await cartService.createCart(req.body);
    //Devuelvo un json
    res.status(200).json(carritoNuevo);
  } catch (error) {
    res.status(500).json({
      mensaje: "No se pudo crear el carrito",
      detalle: `${error}`,
    });
  }
});
//DELETE CART BY ID
carritos.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    //Guardo en una variable el carrito eliminado segun el id que le pase
    const carritoEliminado = await cartService.deleteCartById(id);
    //Devuelvo no content
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      mensaje: `No se puden eliminar el carrito con id ${id}`,
      detalle: `${error}`,
    });
  }
});
//GET CART BY ID/PRODUCTOS
carritos.get("/:id/productos", async (req, res) => {
  const id = req.params.id;
  try {
    //Guardo en una variable el carrito eliminado segun el id que le pase
    const cartProducts = await cartService.getCartProducts(id);
    //Devuelvo no content
    res.status(200).json(cartProducts);
  } catch (error) {
    res.status(500).json({
      mensaje: `No se puden listar los productos del carrito con id ${id}`,
      detalle: `${error}`,
    });
  }
});
// POST ID/PRODUCTOS
carritos.post("/:id/productos", async (req, res) => {
  const id = req.params.id;
  try {
    //Guardo en una variable el carrito al que le voy a agregar productos según el id que le pase
    const carritoNuevo = await cartService.addProductToCart(
      id,
      req.body.product_id
    );
    //Devuelvo un json
    res.status(200).json(carritoNuevo);
  } catch (error) {
    res.status(500).json({
      mensaje: `No existe el carrito con id ${id}`,
      detalle: `${error}`,
    });
  }
});
//DELETE ID/PRODUCTOS/ID_PROD
carritos.delete("/:id/productos/:product_id", async (req, res) => {
  const id = req.params.id;
  try {
    //Guardo en una variable el carrito al que le voy a eliminar productos según el id que le pase
    const carritoNuevo = await cartService.deleteProductInCart(
      id,
      req.body.product_id
    );
    //Devuelvo un json
    res.status(200).json(carritoNuevo);
  } catch (error) {
    res.status(500).json({
      mensaje: `No se pude eliminar el producto del carrito con id ${id}`,
      detalle: `${error}`,
    });
  }
});

module.exports = { carritos };
