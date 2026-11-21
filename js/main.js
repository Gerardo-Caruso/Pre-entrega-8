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

//Inicializamos carrito con localStorage. En lugar de arrancar con un array vacio chequea si hay algo guardado.
const carrito = JSON.parse(localStorage.getItem("carrito")) ?? []; //JSON.parse() convierte el texto de vuelta a objeto/array para poder usarlo en el codigo

function imprimirProductosEnHTML(listaProductos) {
  const contenedorProductos = document.getElementById("productos");
  contenedorProductos.innerHTML = ""; //vacia container antes para que no se dupliquen productos

  for (const producto of listaProductos) {
    const { id, nombre, descripcion, precio, imagen } = producto;

    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${imagen}" alt="${nombre}" class="card-img-top">
      <h3>${nombre}</h3>
      <p>${descripcion}</p>
      <p class="precio">$${precio}</p>
      <button class="card-boton" id="boton-agregar-${id}">Agregar al carrito</button>
    `;

    contenedorProductos.append(card);

    // Buscamos el botón usando el mismo ID que definimos arriba
    const cardButton = document.getElementById(`boton-agregar-${id}`); //agregamos el evento para el boton de la tarjeta
    cardButton.addEventListener("click", () => {
      carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito)); //JSON.stringify() convierte objeto/array a texto para poder guardarlo en storage
      imprimirCarrito(carrito);
    });
  }
}

//Imprimimos carrito

function imprimirCarrito(array) {
  const contenedorCarrito = document.getElementById("carrito")
  contenedorCarrito.innerHTML = "";

  array.length === 0 ? (contenedorCarrito.innerHTML = "<p>No hay nada en el carrito.</p>")

  : array.forEach(({ nombre, precio }) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <p>${nombre}</p>
          <p>$${precio}</p>
        `;
        contenedorCarrito.append(div);
      });

}

//agregamos evento submit

const formularioAgregarProducto = document.getElementById("form-agregar-producto");
formularioAgregarProducto.addEventListener("submit", (event) => { //siempre recibe por parametro un elemento aunque este vacio () pero hay que nombrarlo para trabajar con el
  event.preventDefault(); // previene refresque de la pantalla que es un comportamiento por defecto

  const nombre = document.getElementById("input-nombre").value; //agregamos .value para obtener lo ingresado en los input
  const precio = parseFloat(document.getElementById("input-precio").value);
  const imagen = document.getElementById("input-imagen").value;
  const descripcion = document.getElementById("input-descripcion").value;

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
imprimirCarrito(carrito);




