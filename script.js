// Archivo: script.js

// Función para cambiar de la pantalla de inicio a la pantalla de selección
function iniciarJuego() {
    const pantallaInicio = document.getElementById('pantalla-inicio');
    const seleccionFacciones = document.getElementById('seleccion-facciones');

    pantallaInicio.style.display = 'none';
    seleccionFacciones.style.display = 'flex'; 
}

// Función para manejar la selección de facción y cambiar el estilo
function seleccionarFaccion(faccion) {
    const botonCitricos = document.querySelector('.faccion-citricos');
    const botonTropicales = document.querySelector('.faccion-tropicales');
    const botonContinuar = document.getElementById('boton-continuar');

    // 1. Limpiar cualquier selección previa
    document.body.classList.remove('faccion-citricos', 'faccion-tropicales');
    botonCitricos.classList.remove('seleccionado');
    botonTropicales.classList.remove('seleccionado');
    
    // 2. Aplicar la clase de estilo al body y al botón seleccionado
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
    
    // 3. Mostrar el botón de continuar
    botonContinuar.style.display = 'block'; 
}

// Función que se llama al presionar el botón de continuar: REDIRIGE AL JUEGO
function continuarJuego() {
    window.location.href = 'game.html'; 
}