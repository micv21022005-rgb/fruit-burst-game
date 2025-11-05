// Archivo: script.js

// Función que se llama cuando el usuario hace clic en el botón "¡A la Carga Tropical!"
function iniciarJuego() {
    const pantallaInicio = document.getElementById('pantalla-inicio');
    const seleccionFacciones = document.getElementById('seleccion-facciones');

    pantallaInicio.style.display = 'none';
    seleccionFacciones.style.display = 'block'; 

    // Aquí reseteamos cualquier clase de facción que pudiera haberse aplicado antes.
    document.body.classList.remove('faccion-citricos', 'faccion-tropicales');
}

// Función que se llama cuando el usuario elige una facción
function seleccionarFaccion(faccion) {
    // Primero, limpiamos cualquier clase de facción anterior del body
    document.body.classList.remove('faccion-citricos', 'faccion-tropicales');

    // Añadimos la clase de la facción seleccionada al body
    if (faccion === 'Citricos') {
        document.body.classList.add('faccion-citricos');
    } else if (faccion === 'Tropicales') {
        document.body.classList.add('faccion-tropicales');
    }

    // Aquí es donde iría la lógica para cargar el juego real después de la elección.
    // Por ahora, solo muestra una alerta para confirmar la elección y muestra la nueva paleta.
    alert(`¡Has elegido la facción de los ${faccion}! 
    Tu isla se tiñe con sus colores... ¡La batalla por el paraíso comienza!`);
    
    document.body.classList.remove('faccion-citricos', 'faccion-tropicales');
}
