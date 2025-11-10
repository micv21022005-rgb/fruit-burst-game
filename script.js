// Archivo: script.js

// Función para cambiar de la pantalla de inicio a la pantalla de selección
function iniciarJuego() {
    const pantallaInicio = document.getElementById('pantalla-inicio');
    const seleccionFacciones = document.getElementById('seleccion-facciones');
    const mainHeader = document.getElementById('main-header'); // Obtener el header

    pantallaInicio.style.display = 'none';
    seleccionFacciones.style.display = 'flex'; 
    mainHeader.style.display = 'flex'; // ⬅️ Mostrar el header después de iniciar
}

// Función para manejar la selección de facción y cambiar el estilo
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
        botonContinuar.style.backgroundColor = '#ff9800'; 
        botonContinuar.innerHTML = '¡Defender Cítricos! 🍋';
    } else if (faccion === 'Tropicales') {
        document.body.classList.add('faccion-tropicales');
        botonTropicales.classList.add('seleccionado');
        botonContinuar.style.backgroundColor = '#e91e63';
        botonContinuar.innerHTML = '¡Luchar por el Trópico! 🍍';
    }
    
    // Mostrar el botón de continuar
    botonContinuar.style.display = 'block'; 
}

// Función que se llama al presionar el botón de continuar: REDIRIGE AL JUEGO
function continuarJuego() {
    window.location.href = 'game.html'; 
}