const PRODUCTS_JSON_PATH = '../data/productos.json';
const STORAGE_KEY = 'hj_carrito_v1';
const listaCarrito = document.getElementById('lista-carrito');
const carritoVacio = document.getElementById('carrito-vacio');
const subtotalPrecio = document.getElementById('subtotal-precio');
const envioPrecio = document.getElementById('envio-precio');
const totalPrecio = document.getElementById('total-precio');
const btnVaciar = document.getElementById('btn-vaciar');
const btnFinalizar = document.getElementById('btn-finalizar');
const recomendadosCont = document.getElementById('recomendados');

let productos = [];
let carrito = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

function fetchProductos(){
    return fetch(PRODUCTS_JSON_PATH).then(r=>r.json()).then(data=>{productos = data; renderRecomendados(); renderCarrito();});
}

function guardar(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
}

function agregarAlCarrito(productId, cantidad = 1){
    const existe = carrito.find(i=>i.id === productId);
    if(existe){
        existe.cantidad += cantidad;
    } else {
        carrito.push({id: productId, cantidad});
    }
    guardar();
    renderCarrito();
}

function setCantidad(productId, cantidad){
    carrito = carrito.map(i=> i.id === productId ? {id: i.id, cantidad: Math.max(1, cantidad)} : i);
    guardar();
    renderCarrito();
}

function quitarItem(productId){
    carrito = carrito.filter(i=> i.id !== productId);
    guardar();
    renderCarrito();
}

function vaciarCarrito(){
    carrito = [];
    guardar();
    renderCarrito();
}

function calcularTotales(){
    let subtotal = 0;
    carrito.forEach(i=>{
        const p = productos.find(x=> x.id === i.id);
        if(p && p.precio) subtotal += p.precio * i.cantidad;
    });
    const subtotalFmt = subtotal.toLocaleString('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0});
    subtotalPrecio.textContent = subtotalFmt;
    envioPrecio.textContent = subtotal > 0 ? 'Se calcula al finalizar' : '---';
    totalPrecio.textContent = subtotalFmt;
}

function crearElementoItem(prod, cantidad){
    const li = document.createElement('li');
    li.className = 'item-carrito';
    const imgWrap = document.createElement('div');
    imgWrap.className = 'item-img';
    const img = document.createElement('img');
    img.src = prod.imagen || '../../Resources/imgIndex/Kit de imágenes/Kit de imágenes/logo.svg';
    img.alt = prod.nombre;
    imgWrap.appendChild(img);
    const detalle = document.createElement('div');
    detalle.className = 'item-detalle';
    const titulo = document.createElement('h3');
    titulo.textContent = prod.nombre;
    const desc = document.createElement('p');
    desc.textContent = prod.medidas ? prod.medidas : prod.descripcion.substring(0,80) + (prod.descripcion.length>80 ? '...' : '');
    const precio = document.createElement('div');
    precio.className = 'precio-item';
    const precioFmt = (prod.precio || 0).toLocaleString('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0});
    precio.textContent = precioFmt;
    detalle.appendChild(titulo);
    detalle.appendChild(desc);
    detalle.appendChild(precio);
    const acciones = document.createElement('div');
    acciones.className = 'item-acciones';
    const cantidadCtrl = document.createElement('div');
    cantidadCtrl.className = 'cantidad-control';
    const btnMenos = document.createElement('button');
    btnMenos.textContent = '-';
    btnMenos.addEventListener('click',()=> setCantidad(prod.id, cantidad - 1));
    const spanCant = document.createElement('span');
    spanCant.textContent = cantidad;
    const btnMas = document.createElement('button');
    btnMas.textContent = '+';
    btnMas.addEventListener('click',()=> setCantidad(prod.id, cantidad + 1));
    cantidadCtrl.appendChild(btnMenos);
    cantidadCtrl.appendChild(spanCant);
    cantidadCtrl.appendChild(btnMas);
    const btnQuitar = document.createElement('button');
    btnQuitar.className = 'btn-accion';
    btnQuitar.textContent = 'Quitar';
    btnQuitar.addEventListener('click',()=> quitarItem(prod.id));
    acciones.appendChild(cantidadCtrl);
    acciones.appendChild(btnQuitar);
    li.appendChild(imgWrap);
    li.appendChild(detalle);
    li.appendChild(acciones);
    return li;
}

function renderCarrito(){
    listaCarrito.innerHTML = '';
    if(carrito.length === 0){
        carritoVacio.style.display = 'block';
    } else {
        carritoVacio.style.display = 'none';
        carrito.forEach(i=>{
            const prod = productos.find(p=> p.id === i.id);
            if(prod){
                listaCarrito.appendChild(crearElementoItem(prod, i.cantidad));
            }
        });
    }
    calcularTotales();
}

function renderRecomendados(){
    recomendadosCont.innerHTML = '';
    const disponibles = productos.slice(0,8);
    disponibles.forEach(p=>{
        const card = document.createElement('article');
        card.className = 'producto-card';
        const img = document.createElement('img');
        img.src = p.imagen || '../../Resources/imgIndex/Kit de imágenes/Kit de imágenes/logo.svg';
        img.alt = p.nombre;
        const h3 = document.createElement('h3');
        h3.textContent = p.nombre;
        const pdesc = document.createElement('p');
        pdesc.textContent = p.descripcion.substring(0,85) + (p.descripcion.length>85 ? '...' : '');
        const precio = document.createElement('div');
        precio.className = 'precio';
        precio.textContent = (p.precio || 0).toLocaleString('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0});
        const btn = document.createElement('button');
        btn.className = 'btn-agregar';
        btn.textContent = 'Agregar';
        btn.addEventListener('click',()=> agregarAlCarrito(p.id,1));
        card.appendChild(img);
        card.appendChild(h3);
        card.appendChild(pdesc);
        card.appendChild(precio);
        card.appendChild(btn);
        recomendadosCont.appendChild(card);
    });
}

btnVaciar.addEventListener('click', vaciarCarrito);
btnFinalizar.addEventListener('click', ()=> {
    if(carrito.length === 0) return;
    const resumen = carrito.map(i=>{
        const p = productos.find(x=> x.id === i.id);
        return `${i.cantidad} x ${p ? p.nombre : 'Producto'}`
    }).join('\n');
    alert('Pedido procesado:\n' + resumen + '\nNos contactaremos para coordinar el envío.');
    vaciarCarrito();
});

fetchProductos();
