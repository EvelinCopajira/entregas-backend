//CONFIG CON SOCKET-CONEXION
const socket = io.connect();

//EVENT LISTENER FORMULARIO - enviando productos
const button = document.getElementById("submit");
button?.addEventListener("click", () => {
  //variable para guardar los valores que se muestran como mensaje enviado desde el input del formulario
  const nuevoProducto = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById('thumbnail').value,
  };
  //el servidor recibe el evento
  socket.emit("nuevo-producto", nuevoProducto);
});

//FN para traer los datos de la planilla guardada en productos.hbs
async function obtenerPlantilla(productos) {
  const respuesta = await fetch("plantillas/productos.hbs");
    const plantilla = await respuesta.text();
    const plantillaHbs = Handlebars.compile(plantilla);
    const htmlCompleto = plantillaHbs({ productos });
    return htmlCompleto;
}

//Capturo/reibo el evento (productos)
socket.on("productos", async (productos) => {
  //Genero una variable html para mostrar los productos
  const html = await obtenerPlantilla(productos);
  //Busco el elemtno id 'productos' y le agrego el contenido de html
  document.getElementById("productos").innerHTML = html;
});


//EVENT LISTENER MENSAJE - enviando/emitiendo el msj
const buttonMensaje = document.getElementById("submit-msj");
buttonMensaje?.addEventListener("click", () => {
  //Informacion hora y fecha
  const date = new Date();
  const fecha = (`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
  //Variable para guardar los valores que se muestran como mensaje enviado desde el input del form
  const mensaje = {
    mail: document.getElementById("email").value,
    fecha: fecha,
    mensaje: document.getElementById("mensaje").value,
  };
  //El servidor recibe el evento
  socket.emit("nuevo-mensaje", mensaje);
});

//capturo/reibo el evento (mensaje) y lo inserto como texto en el html
socket.on("nuevo-chat", (mensajes) => {
  //genero un html a partir de los messages
  const html = mensajes
    .map((mensaje) => {
      return (`<div><strong>${mensaje.mail}</strong> [${mensaje.fecha}]: <em>${mensaje.mensaje}</em></div>`);
    })
    .join(" ");

  //busco el elemtno chat y le agrego el contenido de html
  document.getElementById("mensajes").innerHTML = html;
});

