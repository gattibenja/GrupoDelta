const contenedor = document.querySelector('.contenedor-productos');

const productos = [ 
    {
    id: 1,
    nombre: "Mesa de Centro Aconcagua",
    imagenUrl: "../../Resources/imgIndex/Kit de imágenes/Kit de imágenes/Mesa de Noche Aconcagua.png",
},
{
    id: 2,
    nombre: "Mesa de Centro Araucaria",
    imagenUrl: "../../Resources/imgIndex/Kit de imágenes/Kit de imágenes/Mesa de Centro Araucaria.png", 
},
{
    id: 3,
    nombre: "Sofá Patagonia",
    imagenUrl: "../../Resources/imgIndex/Kit de imágenes/Kit de imágenes/Sofá Patagonia.png",
}
];

function renderizarProductos(lista){
    lista.forEach(producto => {
    let subContenedor = document.createElement("div");
    subContenedor.classList.add("singleProduct");
    let foto = document.createElement("img");
    foto.src = producto.imagenUrl;
    let title = document.createElement("h4");
    title.textContent = producto.nombre;
    title.classList.add("nombreProducto");

    subContenedor.appendChild(foto);
    subContenedor.appendChild(title);

    contenedor.appendChild(subContenedor);
});
}

function obtenerProductos(){
    return new Promise((resolve) => {
        setTimeout(() =>{
            resolve(productos);
        }, 1000);
    });
}


async function iniciar(){
    const data = await obtenerProductos();
    renderizarProductos(data);
}

iniciar();
