//Require de las dependencias
const express = require("express");
//Renombro al servidor para diferentciar el de http del io
const { Server: HttpServer } = require("http");
const { Server: IoServer } = require("socket.io");
//Inicializo la app express
const app = express();
//Incializo el servidor http - le paso la aplicación que sirve con este protocolo
const httpServer = new HttpServer(app);
//Inicializo servidor de sockets.io
const io = new IoServer(httpServer);

//Middleword para traer los archivos de la carpeta public - static (cliente servido desde localhost)
app.use(express.static("public"));

//Variable para guardar los productos
const productos = [
  {
    title: "Pantalon",
    price: 1150,
    thumbnail: "url",
  },
  {
    title: "Pantalon corto",
    price: 850,
    thumbnail: "url",
  },
  {
    title: "Remera",
    price: 250,
    thumbnail: "url",
  },
];

//Clientes que interactúan/se conectan y generan eventos
io.on("connection", (socket) => {
  console.log("nuevo cliente conectado");
  //emito los mensajes a todos los sockets conectados
  socket.emit("productos", productos);
  //capturo el evento que viene del main.js - socket.on. El servidor caputa el nuevo producto, contacta a todos los sockets conectados y les reenvía el nuevo listado
  socket.on("nuevo-producto", (producto) => {
    //agrego el msj al []
    productos.push(producto);
    //emito los mensajes a todos los sockets conectados
    io.sockets.emit("productos", productos);
  });
});

//Variable para guardar los mensajes
const mensajes = [];

//clientes que interactúan/se conectan y generan eventos - handshakes
io.on("connection", (socket) => {
  console.log("nuevo cliente conectado al chat");
  //me autoemito el evento
  socket.emit("nuevo-chat", mensajes);
  //capturo el evento que viene del main.js - socket.on. El servidor caputa el msj enviado, contacta a todos los sockets conectados y les reenvía ese mensaje
  socket.on("nuevo-mensaje", (mensaje) => {
    //agrego el msj al []
    mensajes.push(mensaje);
    //emito los mensajes a todos los sockets conectados
    io.sockets.emit("nuevo-chat", mensajes);
  });
});

//Handshake
const connectedServer = httpServer.listen(5000, () => {
  console.log("servidor http con web sockets listo");
});

connectedServer.on("error", (error) => console.log);
