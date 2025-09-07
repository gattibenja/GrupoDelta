const contenedor = document.querySelector('.contenedor-productos');

const productos = [ 
    {
    id: 1,
    nombre: "Mesa de Centro Aconcagua",
    imagenUrl: "../../imagenes/MesadeNocheAconcagua.png",
},
{
    id: 2,
    nombre: "Mesa de Centro Araucaria",
    imagenUrl: "../../imagenes/MesadecentroAraucaria.png",
},
{
    id: 3,
    nombre: "Sofá Patagonia",
    imagenUrl: "../../imagenes/SofáPatagonia.png",
}
];
function renderizarProductos(lista){
    lista.forEach(producto => {
        let subContenedor = document.createElement("div");
        subContenedor.classList.add("singleProduct");

        // Crear el enlace al detalle
        let link = document.createElement("a");
        link.href = `../detailProduct/detailUno.html?id=${producto.id}`;
        link.classList.add("link-detalle");

        let foto = document.createElement("img");
        foto.src = producto.imagenUrl;
        let title = document.createElement("h4");
        title.textContent = producto.nombre;
        title.classList.add("nombreProducto");

        // Agregar imagen y título al enlace
        link.appendChild(foto);
        link.appendChild(title);

        // Agregar el enlace al contenedor del producto
        subContenedor.appendChild(link);

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
