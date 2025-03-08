const carrito = document.querySelector("#carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaProductos = document.querySelector(".container.mb-6");
let articulosCarrito = [];

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    renderizarCarrito();
});

listaProductos.addEventListener("click", agregarProducto);
carrito.addEventListener("click", eliminarProducto);
vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

// Función para agregar un producto al carrito
function agregarProducto(e) {
    e.preventDefault();
    
    if (e.target.classList.contains("agregar-carrito")) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado);
    }
}

// Extraer información del producto
function leerDatosProducto(producto) {
    const infoProducto = {
        imagen: producto.querySelector("img").src,
        titulo: producto.querySelector("h4").textContent,
        precio: producto.querySelector(".precio p:nth-child(2)").textContent,
        id: producto.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    };

    // Verificar si el producto ya está en el carrito
    const existe = articulosCarrito.some((prod) => prod.id === infoProducto.id);

    if (existe) {
        // Incrementar la cantidad si ya existe
        articulosCarrito = articulosCarrito.map((prod) => {
            if (prod.id === infoProducto.id) {
                prod.cantidad++;
                return prod;
            } else {
                return prod;
            }
        });
    } else {
        // Agregar producto nuevo al carrito
        articulosCarrito.push(infoProducto);
    }

    renderizarCarrito();
}

// Mostrar los productos en el carrito
function renderizarCarrito() {
    limpiarCarrito();

    articulosCarrito.forEach((producto) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width="90">
            </td>
            <td>${producto.titulo}</td>
            <td>$${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>
                <a href="#" class="borrar" data-id="${producto.id}">X</a>
            </td>
        `;
        carrito.appendChild(row);
    });

    // Guardar carrito en LocalStorage
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

// Eliminar un producto del carrito
function eliminarProducto(e) {
    e.preventDefault();

    if (e.target.classList.contains("borrar")) {
        const productoId = e.target.getAttribute("data-id");

        // Filtrar el carrito para eliminar el producto
        articulosCarrito = articulosCarrito.filter((prod) => prod.id !== productoId);
        
        renderizarCarrito();
    }
}

// Vaciar todo el carrito
function vaciarCarrito() {
    articulosCarrito = [];
    renderizarCarrito();
}

// Limpiar el carrito en la interfaz
function limpiarCarrito() {
    while (carrito.firstChild) {
        carrito.removeChild(carrito.firstChild);
    }
}