document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Valores
  const nombreInput = document.getElementById("nombre");
  const emailInput = document.getElementById("email");
  const mensajeInput = document.getElementById("mensaje");
  const mensajeExito = document.getElementById("mensajeExito");

  const nombre = nombreInput.value.trim();
  const email = emailInput.value.trim();
  const mensaje = mensajeInput.value.trim();

  // Limpiar errores previos
  document.getElementById("errorNombre").textContent = "";
  document.getElementById("errorEmail").textContent = "";
  document.getElementById("errorMensaje").textContent = "";

  nombreInput.classList.remove("input-error", "input-success");
  emailInput.classList.remove("input-error", "input-success");
  mensajeInput.classList.remove("input-error", "input-success");

  let valido = true;

  // Validar nombre
  if (nombre === "") {
    document.getElementById("errorNombre").textContent = "Este campo es obligatorio";
    nombreInput.classList.add("input-error");
    valido = false;
  } else {
    nombreInput.classList.add("input-success");
  }

  // Validar email
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const dominiosPermitidos = ["gmail.com", "hotmail.com", "yahoo.com"];
  const despuesDeArroba = email.split('@')[1];

  if (email === "") {
    document.getElementById("errorEmail").textContent = "Este campo es obligatorio";
    emailInput.classList.add("input-error");
    valido = false;
  } else if (!regexEmail.test(email) || !dominiosPermitidos.includes(despuesDeArroba)) {
    document.getElementById("errorEmail").textContent = "Ingresa un email válido";
    emailInput.classList.add("input-error");
    valido = false;
  } else {
    emailInput.classList.add("input-success");
  }

  // Validar mensaje
  if (mensaje === "") {
    document.getElementById("errorMensaje").textContent = "Este campo es obligatorio";
    mensajeInput.classList.add("input-error");
    valido = false;
  } else {
    mensajeInput.classList.add("input-success");
  }

  // Si todo es válido
  if (valido) {
    mensajeExito.classList.remove("oculto");
    document.getElementById("contactForm").reset();

    // Quitar bordes verdes al resetear
    nombreInput.classList.remove("input-success");
    emailInput.classList.remove("input-success");
    mensajeInput.classList.remove("input-success");
  }
});

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const carritoCount = document.getElementById("carritoCount");
    if (carritoCount) {
        carritoCount.textContent = carrito.length;
    }
}

actualizarContadorCarrito();