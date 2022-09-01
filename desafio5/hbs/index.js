//Require sobre módulo express
const express = require("express");
//Creo la app
const app = express();
//Require desde routes para usar el router de productos
const { productos } = require("./src/routes/routes");

//Seteo motores de plantillas
//HANDLEBARS
const { engine } = require("express-handlebars");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Middleware a nivel app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Static
app.use(express.static("public"));

//Asigno una ruta al Router "productos"
app.use("/productos", productos);

app.get("/", (req, res) => {
  res.render("formulario");
});

//Enviroment
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

//Manejo de errores server.on
server.on("error", (error) => console.log(error));
