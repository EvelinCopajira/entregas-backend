//Require sobre módulo express
const express = require("express");
//Creo la app
const app = express();
//Require desde routes para usar el router de productos
const { productos } = require("./src/routes/routes");

//Middleware a nivel app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Static
app.use(express.static("public"));

//Seteo motores de plantillas
//PUG
//Indico el directorio donde se almacenan las plantillas
app.set("views", "./src/views");
//Indico el motor de plantillas a usar
app.set("view engine", "pug");

//Asigno una ruta al Router "productos"
app.use("/productos", productos);

app.get("/", (req, res) => {
  res.render("formulario.pug");
});

//Enviroment
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

//Manejo de errores server.on
server.on("error", (error) => console.log(error));
