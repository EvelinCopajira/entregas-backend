//Módulo router en express
const { Router } = require("express");
//Rutas
const productos = Router();

//Importo clase contenedorProductos para usar sus métodos
const contenedor = require("../contenedor");

//Trabajo con los elementos del contenedor
const contenedorProductos = new contenedor();

//Endpoints
//GET PRODUCTOS
productos.get("/", async (req, res) => {
  try {
    //Reutilizo métodos del la class
    const mostrarProductos = await contenedorProductos.getAll();
    //Renderizo
    res.render("productos", { productos: mostrarProductos });
  } catch (error) {
    res.status(500).json(`No se pueden mostrar los productos: ${error}`);
  }
});

//POST PRODUCTOS
productos.post("/", async (req, res) => {
  try {
    const { title, price, thumbnail } = req.body;
    //Guardo en una variable los nuevos
    const productoNuevo = await contenedorProductos.create({
      title,
      price,
      thumbnail,
    });
    //Rendirecciono
    res.redirect("/productos");
  } catch (error) {
    res.status(500).json(`No se puede agregar el producto: ${error}`);
  }
});

module.exports = { productos };
