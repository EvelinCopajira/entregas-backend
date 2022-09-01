//Require sobre módulo express
const express = require("express");
//Creo la app
const app = express();
//Require desde routes para usar el router de productos
const { productos } = require("./src/routes/routes");

//Static
app.use(express.static("public"));

//Seteo motores de plantillas
//EJS
//Indico el directorio donde se almacenan las plantillas
app.set("views", "./src/views");
//Indico el motor de plantillas a usar
app.set("view engine", "ejs");

//Asigno una ruta al Router "productos"
app.use("/productos", productos);

app.get("/", (req, res) => {
  res.render("index");
});

//Enviroment
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

//Manejo de errores server.on
server.on("error", (error) => console.log(error));
