//Require sobre módulo express
const express = require("express");
//Creo la app
const app = express();

//Middleware a nivel app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Static
app.use(express.static("public"));

//Require desde routes para usar el router de productos y carrito
const { productos } = require("./routes/productRoutes");
const { carrito } = require("./routes/carritoRoutes");

//Asigno una ruta al Router "productos" y "carrito"
app.use("/api/productos", productos);
app.use("/api/carrito", carrito);

//Enviroment
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor on escuchando en el puerto ${PORT}`);
});

//Manejo de errores server.on
server.on("error", (error) => console.log(error));
