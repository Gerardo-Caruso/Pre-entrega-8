const productos = [
  {
    id: 1,
    nombre: "Laptop",
    descripcion: "Laptop portátil de alto rendimiento",
    precio: 1200,
    imagen: "./img/laptop.jpg",
  },
  {
    id: 2,
    nombre: "Teléfono",
    descripcion: "Smartphone con cámara de alta calidad",
    precio: 800,
    imagen: "./img/telefono.jpg",
  },
  {
    id: 3,
    nombre: "Auriculares",
    descripcion: "Auriculares inalámbricos con cancelación de ruido",
    precio: 150,
    imagen: "./img/auriculares.jpg",
  },
  {
    id: 4,
    nombre: "Teclado",
    descripcion: "Teclado mecánico retroiluminado",
    precio: 100,
    imagen: "./img/teclado.jpg",
  },
  {
    id: 5,
    nombre: "Mouse",
    descripcion: "Mouse óptico ergonómico",
    precio: 50,
    imagen: "./img/mouse.jpg",
  },
  {
    id: 6,
    nombre: "Monitor",
    descripcion: "Monitor Full HD de 24 pulgadas",
    precio: 300,
    imagen: "./img/monitor.jpg",
  },
  {
    id: 7,
    nombre: "Cámara",
    descripcion: "Cámara digital profesional",
    precio: 900,
    imagen: "./img/camara.jpg",
  },
  {
    id: 8,
    nombre: "Parlante",
    descripcion: "Parlante Bluetooth portátil",
    precio: 120,
    imagen: "./img/parlante.jpg",
  },
  {
    id: 9,
    nombre: "Reloj",
    descripcion: "Smartwatch con monitor de actividad",
    precio: 250,
    imagen: "./img/reloj.jpg",
  },
  {
    id: 10,
    nombre: "Tablet",
    descripcion: "Tablet ligera para estudio y entretenimiento",
    precio: 400,
    imagen: "./img/tablet.jpg",
  },
];

const carrito = [];

function imprimirProductosEnHTML(productos) {

const contenedorProductos = document.getElementById("productos");
contenedorProductos.innerHTML = "" //vacia container antes para que no se dupliquen productos

//recorremos array con FOR para crear una card por cada elemento
for (const producto of productos) {
    const card = document.createElement("article"); //creo la etiqueta article
    //agregamos contenido a la card con metodo innerHTML usando template strings
    card.className = "card";
    
    card.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img-top">
    <h3>${producto.nombre}</h3>
    <p>${producto.descripcion}</p>
    <p class="precio">$${producto.precio}</p>
    <button class="card-boton" id="${producto.id}${producto.nombre}">Agregar al carrito</button>
`;


    contenedorProductos.append(card);  //para agregar la card creada en el contenedor, necesito el metodo append() o appendchild()
    
    const cardButton = document.getElementById(`${producto.id}${producto.nombre}`) //agregamos el evento para el boton de la tarjeta
    cardButton.addEventListener("click", () => {
      carrito.push(producto); //cada click para agregar al carrito y luego lo actualiza
      imprimirCarrito(carrito);
    } )
  }
}

function imprimirCarrito(array) {
  const contenedorCarrito = document.getElementById("carrito")
  contenedorCarrito.innerHTML = "";

  for (const elemento of array) {
    const div = document.createElement("div")
    div.innerHTML = `<p>${elemento.nombre}</p>
    <p>${elemento.precio}</p>`;

    contenedorCarrito.append(div);
  }

}

//agregamos evento submit

const formularioAgregarProducto = document.getElementById("form-agregar-producto");
formularioAgregarProducto.addEventListener("submit", (event) => { //siempre recibe por parametro un elemento aunque este vacio () pero hay que nombrarlo para trabajar con el
  event.preventDefault(); // previene refresque de la pantalla que es un comportamiento por defecto

  const nombre = document.getElementById("input-nombre").value; //agregamos .value para obtener lo ingresado en los input
  console.log(nombre);

  const precio = parseFloat(document.getElementById("input-precio").value);
  console.log(precio); 

  const imagen = document.getElementById("input-imagen").value;
  console.log(imagen); 

  const descripcion = document.getElementById("input-descripcion").value;
  console.log(descripcion); 

  //agregamos el nuevo producto

  const productoNuevo = {
    id: productos.length + 1,
    nombre: nombre,
    descripcion: descripcion,
    precio: precio,
    imagen: imagen || "./img/default.jpg", //utilizo operador OR, si el administrador no sube una imagen del producto, entonces carga default.jpg que es la imagen por defecto
  };

  productos.push(productoNuevo);

  //volvemos a mostrar tarjetas con tarjeta agregada en el DOM

  imprimirProductosEnHTML(productos);

  formularioAgregarProducto.reset();

});

const formularioBusqueda = document.getElementById("form-busqueda");
formularioBusqueda.onsubmit = (event) => {
  event.preventDefault()

  const busqueda = document.getElementById("input-busqueda").value //lo que ingreso el usuario en el input de busqueda

  const productosFiltrados = productos.filter((producto) => producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
);

  imprimirProductosEnHTML(productosFiltrados)
};

imprimirProductosEnHTML(productos);




