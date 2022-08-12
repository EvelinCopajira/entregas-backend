//Instalo módulo express y hago un require
const express = require("express");

//Creo la app
const app = express();

//Endpoints
//Importo módulo fs
const fs = require("fs");

//Mostrar todos los productos
app.get("/productos", (req, res) => {
  //Leo el archivo
  fs.readFile("./productos.txt", "utf-8", (error, fileData) => {
    if (error) {
      console.log("Hubo un error");
    }
    //Parselo los datos
    const listaProductos = JSON.parse(fileData);

    //Devuelvo un json
    res.json({ listaProductos });
  });
});

//Mostrar producto random
app.get("/productoRandom", (req, res) => {
  //Leo el archivo
  fs.readFile("./productos.txt", "utf-8", (error, fileDataR) => {
    if (error) {
      console.log("Hubo un error");
    }
    //Parselo los datos
    const listaProductos = JSON.parse(fileDataR);

    //Aleatorio Math floor y random
    const productoRandom = Math.floor(Math.random() * listaProductos.length);

    //Devuelvo un json con el producto random
    res.json({ producto: listaProductos[productoRandom] });
  });
});

//Enviroment
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

server.on('error',(error)=> console.log(error));
