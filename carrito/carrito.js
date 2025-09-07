const carrito = document.querySelector('.carritoCompra');
const contenedorCarrito = document.querySelector('contenedorCarrito');
carrito.addEventListener('click', () => {window.location.href = "carrito.html"});

let itemsCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

if (itemsCarrito.lenght === 0){
    contenedorCarrito.innerHTML = "<p>No hay productos en el carrito.</p>";
}else{

    carrito.array.forEach(producto => {
            let item = document.createElement('div');
            item.classList.add("SingleProduct"); //VER SI VOY A USAR LOS ESTILOS IGUALES QUE LOS DE LOS PRODUCTOS DEL INDEX

            let img = document.createElement('img');
            img.src = producto.imagen; // CHEQUEAR LA URL CORRECTA DESDE DONDE CONSUMAMOS

            let nombre = document.createElement('h4');
            nombre.textContent = producto.nombre;

            let precio = document.createElement('p');
            precio.textContent = producto.descripcion;

            let deleteBtn = document. createElement();
            deleteBtn.classList.add('deleteBtn');

            item.appendChild(img);
            item.appendChild(nombre);
            item.appendChild(precio);
            item.appendChild(deleteBtn);
            contenedorCarrito(item);
    });
}



