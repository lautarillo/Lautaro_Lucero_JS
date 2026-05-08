let productos = [];
let carrito = [];

// traer productos desde JSON
fetch("./data/productos.json")
  .then(res => res.json())
  .then(data => {
    productos = data;
    mostrarProductos();
  });

// mostrar productos en el DOM
function mostrarProductos() {
  const contenedor = document.getElementById("productos");

  contenedor.innerHTML = "";

  productos.forEach(prod => {

    const div = document.createElement("div");

    div.classList.add("cards");

    div.style.backgroundImage = `url('${prod.imagen}')`;

    div.innerHTML = `
    
      <div class="mini-card">
        ${prod.frase}
      </div>

      <div class="info-card">
        <h3>${prod.nombre}</h3>
        <p>$${prod.precio}</p>
        <button data-id="${prod.id}">
          Agregar al carrito
        </button>
      </div>

    `;

    contenedor.appendChild(div);

  });
}

// evento agregar al carrito
document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.dataset.id) {
    const id = Number(e.target.dataset.id);
    const producto = productos.find(p => p.id === id);

    carrito.push(producto);
    actualizarCarrito();
  }
});

// actualizar carrito en pantalla
function actualizarCarrito() {

  const lista = document.getElementById("carrito");
  const totalSpan = document.getElementById("total");
  const botonComprar = document.getElementById("comprar");

  lista.innerHTML = "";

  carrito.forEach((prod, index) => {

    const li = document.createElement("li");

    li.classList.add("item-carrito");

    li.innerHTML = `
      <span>${prod.nombre} - $${prod.precio}</span>

      <button class="btn-eliminar" onclick="eliminar(${index})">
        X
      </button>
    `;

    lista.appendChild(li);

  });

  const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);

  totalSpan.textContent = total;

  // mostrar u ocultar boton de comprar
  if (carrito.length > 0) {
    botonComprar.style.display = "flex";
  } else {
    botonComprar.style.display = "none";
  }

}

// eliminar producto
function eliminar(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// boton comprar
document.getElementById("comprar").addEventListener("click", () => {
  if (carrito.length === 0) return;

  Swal.fire({
    title: "Compra realizada",
    text: "Gracias por tu compra",
    icon: "success"
  });

  carrito = [];
  actualizarCarrito();
});