const carrito = document.querySelector('.carritoCompra');
const contenedorCarrito = document.querySelector('.contenedorCarrito');
carrito.addEventListener('click', () => {window.location.href = "carrito.html"});

let itemsCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

function actualizarResumen() {
    const resumenExistente = document.querySelector('.resumen-carrito');
    if (resumenExistente) resumenExistente.remove();

    const resumen = document.createElement('div');
    resumen.classList.add('resumen-carrito');

    const cantidadTotal = itemsCarrito.reduce((acc, prod) => acc + (prod.cantidad || 1), 0);
    const precioTotal = itemsCarrito.reduce((acc, prod) => acc + ((prod.precio || 0) * (prod.cantidad || 1)), 0);

    resumen.innerHTML = `
        <p><strong>Cantidad de productos:</strong> ${cantidadTotal}</p>
        <p><strong>Precio total:</strong> $${precioTotal.toLocaleString()}</p>
    `;
    contenedorCarrito.parentNode.insertBefore(resumen, contenedorCarrito);
}

function renderCarrito() {
    contenedorCarrito.innerHTML = "";
    actualizarResumen();

    if (itemsCarrito.length === 0){
        contenedorCarrito.innerHTML = "<p>No hay productos en el carrito.</p>";
    } else {
        itemsCarrito.forEach((producto, index) => {
            let item = document.createElement('div');
            item.classList.add("SingleProduct");

            let img = document.createElement('img');
            img.src = producto.imagen;

            let info = document.createElement('div');
            info.classList.add('info-producto');

            let nombre = document.createElement('h4');
            nombre.textContent = producto.nombre;

            let precio = document.createElement('p');
            precio.textContent = `Precio: $${(producto.precio || 0).toLocaleString()}`;

            // Controles de cantidad
            let cantidadControles = document.createElement('div');
            cantidadControles.style.display = "flex";
            cantidadControles.style.alignItems = "center";
            cantidadControles.style.gap = "0.5rem";

            let btnMenos = document.createElement('button');
            btnMenos.textContent = "−";
            btnMenos.classList.add('cantidadBtn');
            btnMenos.addEventListener('click', () => {
                if ((producto.cantidad || 1) > 1) {
                    producto.cantidad = (producto.cantidad || 1) - 1;
                    localStorage.setItem("carrito", JSON.stringify(itemsCarrito));
                    renderCarrito();
                }
            });

            let cantidad = document.createElement('span');
            cantidad.textContent = producto.cantidad || 1;
            cantidad.style.minWidth = "24px";
            cantidad.style.textAlign = "center";

            let btnMas = document.createElement('button');
            btnMas.textContent = "+";
            btnMas.classList.add('cantidadBtn');
            btnMas.addEventListener('click', () => {
                producto.cantidad = (producto.cantidad || 1) + 1;
                localStorage.setItem("carrito", JSON.stringify(itemsCarrito));
                renderCarrito();
            });

            cantidadControles.appendChild(btnMenos);
            cantidadControles.appendChild(cantidad);
            cantidadControles.appendChild(btnMas);

            info.appendChild(nombre);
            info.appendChild(precio);
            info.appendChild(cantidadControles);

            let deleteBtn = document.createElement('button');
            deleteBtn.classList.add('deleteBtn');
            deleteBtn.textContent = "Eliminar";
            deleteBtn.addEventListener('click', () => {
                if (confirm("¿Seguro que quieres eliminar este producto del carrito?")) {
                    itemsCarrito.splice(index, 1);
                    localStorage.setItem("carrito", JSON.stringify(itemsCarrito));
                    renderCarrito();
                }
            });

            item.appendChild(img);
            item.appendChild(info);
            item.appendChild(deleteBtn);
            contenedorCarrito.appendChild(item);
        });
    }
}

renderCarrito();


function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const carritoCount = document.getElementById("carritoCount");
    if (carritoCount) {
        carritoCount.textContent = carrito.length;
    }
}
actualizarContadorCarrito();