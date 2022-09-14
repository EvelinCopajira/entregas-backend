//Require sobre módulo express
const express = require("express");
//Creo la app
const app = express();

//boolean para verificar si soy usuario o administrador
global.administrador = true;
console.log(`App executing in ${administrador ? "admin" : "user"} mode`);

//Middleware a nivel app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Require desde routes para usar el router de productos y carrito
const { productos } = require("./controllers/controllerProductos");

//Asigno una ruta al Router "productos" y "carrito"
app.use("/api/productos", productos);

//Enviroment
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor on escuchando en el puerto ${PORT}`);
});

//Manejo de errores server.on
server.on("error", (error) => console.log(error));
