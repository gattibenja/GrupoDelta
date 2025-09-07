var listaCarrito = document.getElementById("lista-carrito");
var carritoVacio = document.getElementById("carrito-vacio");
var subtotalPrecio = document.getElementById("subtotal-precio");
var totalPrecio = document.getElementById("total-precio");
var btnVaciar = document.getElementById("btn-vaciar");
var btnFinalizar = document.getElementById("btn-finalizar");
var recomendadosContainer = document.getElementById("recomendados");

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function renderCarrito() {
  var carrito = obtenerCarrito();
  if (!listaCarrito) return;
  listaCarrito.innerHTML = "";
  if (carrito.length === 0) {
    if (carritoVacio) carritoVacio.style.display = "block";
    if (subtotalPrecio) subtotalPrecio.textContent = "$0";
    if (totalPrecio) totalPrecio.textContent = "$0";
    return;
  }

  if (carritoVacio) carritoVacio.style.display = "none";
  var subtotal = 0;
  carrito.forEach(function(producto, index) {
    subtotal += producto.precio * producto.cantidad;
    var li = document.createElement("li");
    li.classList.add("item-carrito");
    li.innerHTML =
      '<div class="item-info">' +
        '<img src="' + producto.imagen + '" alt="' + producto.nombre + '" width="60">' +
        '<div>' +
          '<h3>' + producto.nombre + '</h3>' +
          '<p>$' + producto.precio.toLocaleString("es-AR") + ' x ' + producto.cantidad + '</p>' +
        '</div>' +
      '</div>' +
      '<button class="btn-eliminar" data-index="' + index + '">Eliminar</button>';
    listaCarrito.appendChild(li);
  });

  if (subtotalPrecio) subtotalPrecio.textContent = "$" + subtotal.toLocaleString("es-AR");
  if (totalPrecio) totalPrecio.textContent = "$" + subtotal.toLocaleString("es-AR");

  var btnsEliminar = document.querySelectorAll(".btn-eliminar");
  btnsEliminar.forEach(function(btn) {
    btn.addEventListener("click", function(e) {
      eliminarProducto(e.target.dataset.index);
    });
  });
}

function eliminarProducto(index) {
  var carrito = obtenerCarrito();
  carrito.splice(index, 1);
  guardarCarrito(carrito);
  renderCarrito();
}

if (btnVaciar) {
  btnVaciar.addEventListener("click", function() {
    localStorage.removeItem("carrito");
    renderCarrito();
  });
}

if (btnFinalizar) {
  btnFinalizar.addEventListener("click", function() {
    var carrito = obtenerCarrito();
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    alert("¡Gracias por tu compra!");
    localStorage.removeItem("carrito");
    renderCarrito();
  });
}

function renderProductos() {
  fetch("productos.json")
    .then(function(res) { return res.json(); })
    .then(function(productos) {
      var contenedor = document.getElementById("productos-container");
      productos.forEach(function(producto) {
        var article = document.createElement("article");
        article.classList.add("producto");

        article.innerHTML =
          '<img src="' + producto.imagen + '" alt="' + producto.nombre + '">' +
          '<h2>' + producto.nombre + '</h2>' +
          '<p class="descripcion">' + producto.descripcion + '</p>' +
          '<p class="precio">$' + (producto.precio ? producto.precio.toLocaleString("es-AR") : "") + '</p>' +
          '<div class="botones-producto">' +
            '<button class="btn-agregar">Agregar al carrito</button>' +
            '<button class="btn-info">Ver más información</button>' +
          '</div>';

        article.querySelector(".btn-agregar").addEventListener("click", function() {
          agregarAlCarrito(producto);
        });

        article.querySelector(".btn-info").addEventListener("click", function() {
          window.location.href = "detailUno.html?id=" + producto.id;
        });

        contenedor.appendChild(article);
      });
    })
    .catch(function(err) { console.error("Error cargando productos:", err); });
}

function renderRecomendados(productos) {
  if (!recomendadosContainer) return;
  recomendadosContainer.innerHTML = "";
  var sugeridos = productos.slice(0, 3);

  sugeridos.forEach(function(prod) {
    var div = document.createElement("div");
    div.classList.add("producto");

    div.innerHTML =
      '<img src="' + (prod.imagen || "../recursos/Kitdeimagenes/placeholder.png") + '" alt="' + prod.nombre + '">' +
      '<h3>' + prod.nombre + '</h3>' +
      '<p>$' + (prod.precio ? prod.precio.toLocaleString("es-AR") : "Consultar") + '</p>';

    var btnAgregar = document.createElement("button");
    btnAgregar.classList.add("btn-agregar");
    btnAgregar.textContent = "Agregar";
    btnAgregar.addEventListener("click", function() {
      agregarAlCarrito(prod);
    });
    div.appendChild(btnAgregar);

    var btnInfo = document.createElement("button");
    btnInfo.classList.add("btn-info");
    btnInfo.textContent = "Ver más información";
    btnInfo.addEventListener("click", function() {
      window.location.href = "detailUno.html?id=" + prod.id;
    });
    div.appendChild(btnInfo);

    recomendadosContainer.appendChild(div);
  });
}

function agregarAlCarrito(producto) {
  var carrito = obtenerCarrito();
  var index = -1;
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id === producto.id) {
      index = i;
      break;
    }
  }
  if (index >= 0) {
    carrito[index].cantidad++;
  } else {
    producto.cantidad = 1;
    carrito.push(producto);
  }
  guardarCarrito(carrito);
  renderCarrito();
  alert("Producto agregado al carrito: " + producto.nombre);
}

document.addEventListener("DOMContentLoaded", function() {
  renderCarrito();
  renderProductos();
});
