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

//Importo clase contenedorProductos para usar sus métodos
const contenedor = require("./contenedor");

//Trabajo con los elementos del contenedor
const contenedorProductos = new contenedor();

//Endpoints
//GET PRODUCTOS
productos.get("/", async (req, res) => {
  try {
    //Reutilizo métodos del la class
    const mostrarProductos = await contenedorProductos.getAll();
    //Devuelvo un json
    res.json({ mostrarProductos });
  } catch (error) {
    res.status(500).json(`No se pueden mostrar los productos: ${error}`);
  }
});

//GET PRODUCTOS BY ID
productos.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const productoBuscado = await contenedorProductos.getById(id);
    if (!productoBuscado) {
      return res.status(404).json({ error: `Producto no encontrado` });
    }
    //Devuelvo un json
    res.json({ productoBuscado: productoBuscado });
  } catch (error) {
    res.status(500).json(`Proucto no encontrado: ${error}`);
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
    //Devuelvo un json
    res.json({ productoNuevo });
  } catch (error) {
    res.status(500).json(`No se puede agregar el producto: ${error}`);
  }
});

//PUT PRODUCTOS BY ID
productos.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const { title, price, thumbnail } = req.body;

    //Guardo en una variable los elementos que quiero modificar según el id que le pase
    const productoModificado = await contenedorProductos.modifyById(id, {
      title,
      price,
      thumbnail,
    });

    //Valido si el id eiste
    if (!productoModificado) {
      return res.status(404).json({ error: `Producto no encontrado` });
    }
    //Devuelvo un json
    res.json({ productoModificado });
  } catch (error) {
    res.status(500).json(`No se puede modificar el producto: ${error}`);
  }
});

//DELETE PRODUCTOS BY ID
productos.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;

    //Guardo en una variable el producto que quiero modificar según el id que le pase
    const productoEliminado = await contenedorProductos.deleteById(id);

    //Devuelvo un json vacío porque el producto ya fue eliminado
    res.json({});
    //res.status(204); - CONSULTAR SI SE USA ESTE ERROR
  } catch (error) {
    res.status(500).json(`No se puede eliiminar el producto: ${error}`);
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
