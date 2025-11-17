// Archivo: script.js

// --- LÓGICA CENTRAL DE NAVEGACIÓN ---

// Muestra la pantalla con el ID proporcionado y oculta todas las demás
function mostrarPantalla(idPantallaAMostrar) {
    // 1. Ocultar todas las pantallas principales
    const todasLasPantallas = document.querySelectorAll('.contenedor-principal');
    todasLasPantallas.forEach(pantalla => {
        pantalla.classList.add('pantalla-oculta');
        pantalla.classList.remove('pantalla-activa');
    });

    // 2. Mostrar la pantalla solicitada
    const pantallaActiva = document.getElementById(idPantallaAMostrar);
    if (pantallaActiva) {
        pantallaActiva.classList.add('pantalla-activa');
        pantallaActiva.classList.remove('pantalla-oculta');
    }
    
    // 3. Resetear estilos de facción al volver al inicio
    if (idPantallaAMostrar === 'pantalla-inicio') {
        document.body.classList.remove('faccion-citricos', 'faccion-tropicales');
    }
}


// --- LÓGICA DE SELECCIÓN DE FACCIÓN ---

function seleccionarFaccion(faccion) {
    const botonCitricos = document.querySelector('.faccion-citricos');
    const botonTropicales = document.querySelector('.faccion-tropicales');
    const botonContinuar = document.getElementById('boton-continuar');

    document.body.classList.remove('faccion-citricos', 'faccion-tropicales');
    botonCitricos.classList.remove('seleccionado');
    botonTropicales.classList.remove('seleccionado');
    
    // Aplicar la clase de estilo al body
    if (faccion === 'Citricos') {
        document.body.classList.add('faccion-citricos');
        botonCitricos.classList.add('seleccionado');
        botonContinuar.style.backgroundColor = '#4CAF50'; 
        botonContinuar.innerHTML = '¡Defender Cítricos! 🍋';
    } else if (faccion === 'Tropicales') {
        document.body.classList.add('faccion-tropicales');
        botonTropicales.classList.add('seleccionado');
        botonContinuar.style.backgroundColor = '#4CAF50';
        botonContinuar.innerHTML = '¡Luchar por el Trópico! 🍍';
    }
    
    // Mostrar el botón de continuar
    botonContinuar.style.display = 'block'; 
}

// Función que se llama al presionar el botón de continuar: REDIRIGE AL JUEGO
function continuarJuego() {
    window.location.href = 'game.html'; 
}

// Inicializar mostrando solo la pantalla de inicio al cargar
document.addEventListener('DOMContentLoaded', () => {
    // Asegura que al cargar la página se inicie en la pantalla de inicio
    mostrarPantalla('pantalla-inicio'); 
});
