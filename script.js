// =====================================================
// PAMELA SORIA CASTRO - Comercio Internacional
// Fan de Rauw Alejandro, Michael Jackson, motos BMW
// S1000RR y Kawasaki Ninja ZX6R, y autos Porsche/Ferrari
// =====================================================

// =====================================================
// ACTIVIDAD: CAMBIAR TEXTO E IMAGEN
// =====================================================

// Se busca el botón utilizando su id
const button = document.getElementById("botonActividad");

// Se busca el texto que se quiere modificar
const texto = document.getElementById("textoActividad");

// Se busca la imagen que se quiere modificar
const imagen = document.getElementById("imagenActividad");

// addEventListener permite detectar el evento
button.addEventListener("click", function() {

    // Cambia el contenido del párrafo
    texto.textContent =
        "¡Hola! Has hecho clic en el botón. Ahora el texto ha cambiado.";

    // Cambia la imagen
    imagen.src = "testimonio2.jpg";
});


// =====================================================
// ACTIVIDAD: SELECCIÓN DE PRODUCTO
// =====================================================

// Busca la tarjeta de Finanzas
const productoFinanzas =
    document.getElementById("productoFinanzas");

// Busca el botón Seleccionar
const botonSeleccionar =
    document.getElementById("botonSeleccionar");

// Busca el botón Quitar selección
const botonQuitar =
    document.getElementById("botonQuitar");

// Busca el lugar donde aparecerá el mensaje
const mensajeProducto =
    document.getElementById("mensajeProducto");


// Detecta el clic en Seleccionar
botonSeleccionar.addEventListener("click", function() {

    // Agrega un borde verde y una sombra
    productoFinanzas.classList.add(
        "border",
        "border-success",
        "shadow"
    );

    // Muestra el mensaje
    mensajeProducto.style.display = "block";

    mensajeProducto.textContent =
        "Producto seleccionado";
});


// Detecta el clic en Quitar selección
botonQuitar.addEventListener("click", function() {

    // Quita el borde verde y la sombra
    productoFinanzas.classList.remove(
        "border",
        "border-success",
        "shadow"
    );

    // Oculta el mensaje
    mensajeProducto.style.display = "none";
});


// =====================================================
// CARRITO DE COMPRAS
// =====================================================

let carrito = [];


// =====================================================
// FUNCIÓN PARA AGREGAR PRODUCTOS
// =====================================================

function agregarProducto(nombre, precio) {

    /*
    Buscamos si el producto
    ya existe dentro del carrito.
    */

    const productoExistente =
        carrito.find(producto => producto.nombre === nombre);

    /*
    Si ya existe el producto,
    aumentamos su cantidad.
    */

    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        /*
        Si todavía no existe,
        lo agregamos al carrito.
        */

        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    actualizarCarrito();
}


// =====================================================
// FUNCIÓN PARA MODIFICAR CANTIDAD
// =====================================================

function modificarCantidad(indice, cambio) {

    /*
    1  = agregar una unidad
    -1 = quitar una unidad
    */

    carrito[indice].cantidad += cambio;

    /*
    Si la cantidad llega a cero,
    eliminamos el producto.
    */

    if (carrito[indice].cantidad <= 0) {

        carrito.splice(indice, 1);
    }

    actualizarCarrito();
}


// =====================================================
// FUNCIÓN PARA ELIMINAR
// =====================================================

function eliminarProducto(indice) {

    carrito.splice(indice, 1);

    actualizarCarrito();
}


// =====================================================
// FUNCIÓN PARA ACTUALIZAR EL CARRITO
// =====================================================

function actualizarCarrito() {

    // Buscamos los elementos del HTML
    const lista =
        document.getElementById("listaCarrito");

    const contador =
        document.getElementById("contadorCarrito");

    const total =
        document.getElementById("totalCarrito");

    // Limpiamos la lista
    lista.innerHTML = "";

    let cantidadTotal = 0;
    let precioTotal = 0;

    /*
    Recorremos todos los productos
    guardados en el carrito.
    */

    carrito.forEach(function(producto, indice) {

        cantidadTotal += producto.cantidad;

        precioTotal +=
            producto.precio * producto.cantidad;

        /*
        Mostramos cada producto
        dentro del carrito.
        */

        lista.innerHTML += `

            <div class="border-bottom py-2">

                <strong>
                    ${producto.nombre}
                </strong>

                <br>

                $${producto.precio}
                x ${producto.cantidad}

                <br><br>

                <button
                    class="btn btn-sm btn-success"
                    onclick="modificarCantidad(${indice}, 1)"
                >
                    +
                </button>

                <button
                    class="btn btn-sm btn-warning"
                    onclick="modificarCantidad(${indice}, -1)"
                >
                    -
                </button>

                <button
                    class="btn btn-sm btn-danger"
                    onclick="eliminarProducto(${indice})"
                >
                    Eliminar
                </button>

            </div>

        `;
    });

    // Actualizamos el contador
    contador.textContent = cantidadTotal;

    // Actualizamos el total
    total.textContent = precioTotal;

    /*
    Si no existen productos,
    mostramos este mensaje.
    */

    if (carrito.length === 0) {

        lista.innerHTML =
            '<p class="text-muted">El carrito está vacío</p>';
    }
}