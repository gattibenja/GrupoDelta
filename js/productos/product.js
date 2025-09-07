document.addEventListener('DOMContentLoaded', () => {
    // Obtener el ID del producto desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productoId = parseInt(urlParams.get('id'));

    // Cargar el JSON
    fetch('../productos.json')
        .then(response => response.json())
        .then(data => {
            // Buscar el producto con el ID correspondiente
            const producto = data.find(item => item.id === productoId);

            // Verificar si el producto existe
            if (producto) {
                // Rellenar los campos fijos
                document.getElementById('producto-titulo').textContent = producto.nombre || 'Sin nombre';
                document.getElementById('producto-descripcion').textContent = producto.descripcion || 'Sin descripción';
                document.getElementById('producto-precio').textContent = producto.precio ? `$ ${producto.precio.toLocaleString('es-AR')}` : 'Sin precio';
                document.getElementById('producto-imagen').src = producto.imagen || '';
                document.getElementById('producto-imagen').alt = producto.nombre || 'Producto';

                // Generar la lista de detalles dinámicamente
                const detalleLista = document.getElementById('producto-detalles');
                detalleLista.innerHTML = ''; // Limpiar la lista

                // Campos posibles a mostrar (excluyendo los fijos: nombre, descripcion, precio, imagen)
                const camposPosibles = ['medidas', 'materiales', 'acabado', 'peso', 'capacidad', 'modulares', 'caracteristicas', 'tapizado', 'confort', 'rotacion', 'garantia', 'almacenamiento','colchon', 'certificacion', 'regulacion', 'cables', 'apilables', 'incluye', 'extension', 'relleno', 'sostenibilidad'];

                // Iterar sobre los campos posibles y añadir solo los que existen
                camposPosibles.forEach(campo => {
                    if (producto[campo]) {
                        const li = document.createElement('li');
                        // Capitalizar la primera letra del campo para la etiqueta
                        const etiqueta = campo.charAt(0).toUpperCase() + campo.slice(1).replace('_', ' ');
                        li.innerHTML = `<strong>${etiqueta}:</strong> ${producto[campo]}`;
                        detalleLista.appendChild(li);
                    }
                });
            } else {
                // Mostrar mensaje si no se encuentra el producto
                document.getElementById('producto-titulo').textContent = 'Producto no encontrado';
            }
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
});