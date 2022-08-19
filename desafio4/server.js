//Require sobre módulo express
const express = require("express");
//Creo la app
const app = express();
//Módulo Router
const { Router } = express;
//Rutas
const productos = Router();

//Middleware a nivel app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Importo clase Contenedor para usar sus métodos
const contenedor = require("./contenedor");

//Trabajo con los elementos dentro del contenedor y asociado al .txt
const contendor = new contenedor("./productos.txt");

//Endpoints
//GET PRODUCTOS
productos.get("/", async (req, res) => {
  try {
    //Reutilizo métodos del la class
    const mostrarProductos = await contendor.getAll();
    //Devuelvo un json
    res.json({ productos: mostrarProductos });
  } catch (error) {
    res.status(400).json(`No se pueden mostrar los productos: ${error}`);
  }
});

//GET PRODUCTOS BY ID
productos.get("/:id", async (req, res) => {
  try {
    let productoId = req.params.id;
    let productoBuscado = await contendor.getById(productoId);
    if (!productoBuscado) {
      return res.status(400).json({ error: `Producto no encontrado` });
    }
    res.json({ producto: productoBuscado });
  } catch (error) {
    res.status(400).json(`Proucto no encontrado: ${error}`);
  }
});

//POST PRODUCTOS
productos.post("/", async (req, res) => {
  try {
    const { title, price, thumbnail } = req.body;
    const productoNuevo = await contenedor.save({ title, price, thumbnail });
    res.json({ producto: productoNuevo });
  } catch (error) {
    res.status(400).json(`No se puede agregar el producto: ${error}`);
  }
});

//PUT - PENDIENTE
//DELETE PRODUCTOS BY ID
productos.delete("/:id", async (req, res) => {
  try {
    let productoId = req.params.id;
    const productoAEliminar = contendor.deleteById(productoId);
    res.json({ producto: productoAEliminar });
  } catch (error) {
    res.status(400).json(`No se puede eliiminar el producto: ${error}`);
  }
});

//Asigno una ruta al Router "productos"
app.use("/api/productos", productos);

//Enviroment
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

//Manejo de errores server.on
server.on("error", (error) => console.log(error));
