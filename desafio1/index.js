//Declaro clase
class Usuario {
  constructor(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [];
    this.mascotas = [];
  }
  //Métodos
  //Retorna el nombre completo del usuario
  getFullName = () => {
    return `${this.nombre} ${this.apellido}`;
  };
  //Recibe la mascota y la agrega al array
  addMascota = (mascota) => {
    this.mascotas.push(mascota);
  };
  //Retorna la cantidad de mascotas que tiene cada usuario
  countMascotas = () => {
    return `${this.mascotas.length} mascotas`;
  };

  //Recibe un string 'nombre' y un string 'autor' y debe agregar un objeto: { nombre: String, autor: String } al array de libros.
  addBook = (nombre, autor) => {
    this.libros.push({ nombre: nombre, autor: autor });
  };
  //Retorna un array con sólo los nombres del array de libros del usuario
  getBookNames = () => {
    let bookName = this.libros.map((libro) => libro.nombre);
    return bookName;
  };
}

//Crear objeto "usuario" con valores arbitrarios e invocar todos los métodos
//Creo usuarios nuevos
let usuario1 = new Usuario("María", "Ruiz");
let usuario2 = new Usuario("Pablo", "Perez");

//Le agrego mascotas a cada usuario
usuario1.addMascota("gato");
usuario1.addMascota("perro");
usuario2.addMascota("conejo");

//Agrego libro
usuario1.addBook("Harry Potter 1", "JK Rowling");
usuario1.addBook("Dormir al sol", "Adolfo Bioy Casares");
usuario2.addBook("Historias de divan", "Gabriel Rolón");

console.log(`Nombre y Apellido del usuario:`, usuario1.getFullName());
console.log(`Tiene:`, usuario1.countMascotas());
console.log(`Libros favoritos:`, usuario1.getBookNames());

console.log(`Nombre y Apellido del usuario:`, usuario2.getFullName());
console.log(`Tiene:`, usuario2.countMascotas());
console.log(`Libros favoritos:`, usuario2.getBookNames());
