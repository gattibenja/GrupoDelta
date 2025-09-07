const contenedor = document.querySelector('.contenedor-productos');

const productos = [ 
    {
    id: 6,
    nombre: "Mesa de Centro Aconcagua",
    imagenUrl: "../../imagenes/MesadeNocheAconcagua.png",
},
{
    id: 5,
    nombre: "Mesa de Centro Araucaria",
    imagenUrl: "../../imagenes/MesadecentroAraucaria.png",
},
{
    id: 12,
    nombre: "Sofá Patagonia",
    imagenUrl: "../../imagenes/SofaPatagonia.png",
}
];


function renderizarProductos(lista){
    lista.forEach(producto => {
    let link = document.createElement('a');
    link.classList.add('linkDestacados');
    link.href = `../detailProduct/detailUno.html?id=${producto.id}`;
    let subContenedor = document.createElement("div");
    subContenedor.classList.add("singleProduct");
    let foto = document.createElement("img");
    foto.src = producto.imagenUrl;
    let title = document.createElement("h4");
    title.textContent = producto.nombre;
    title.classList.add("nombreProducto");

    
    subContenedor.appendChild(foto);
    subContenedor.appendChild(title);

    link.appendChild(subContenedor);

    contenedor.appendChild(link);
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
