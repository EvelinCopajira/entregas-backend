//Instalo módulo express y hago un require
const express = require("express");

//Creo la app
const app = express();

//Importo clase Contenedor para usar sus métodos
const contenedor = require("./contenedor");

//Trabajo con los elementos dentro del contenedor y asociado al .txt
const products = new contenedor("./productos.txt");

//Mostrar todos los productos
app.get("/productos", async (req, res) => {
  try {
    //Reutilizo métodos del la class
    const showAll = await products.getAll();

    //Devuelvo un json
    res.json(showAll);
  } catch (error) {
    console.log(`Hubo un error ${error}`);
    res.status(500).send("No se pueden mostrar los productos");
  }
});

//Mostrar producto random
app.get("/productoRandom", async (req, res) => {
  try {
    //Reutilizo métodos del la class
    const showAll = await products.getAll();

    //Aleatorio Math floor y random
    const productoRandom = Math.floor(Math.random() * showAll.length);

    //Devuelvo un json con el producto random
    res.json({ producto: showAll[productoRandom] });
  } catch (error) {
    console.log(`Hubo un error ${error}`);
    res.status(500).send("No se pueden mostrar los productos");
  }
});

//Enviroment
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

//Manejo de errores server.on
server.on("error", (error) => console.log(error));
