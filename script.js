// Función que se ejecuta al hacer clic en "Lanzar Ataque"
function iniciarJuego() {
    // 1. Obtener los elementos por su ID
    const pantallaInicio = document.getElementById('pantalla-inicio');
    const seleccionFacciones = document.getElementById('seleccion-facciones');

    // 2. Ocultar la pantalla de inicio (el botón)
    pantallaInicio.style.display = 'none';

    // 3. Mostrar la pantalla de selección de facciones
    seleccionFacciones.style.display = 'block'; 
    // Usamos 'block' o 'flex' (si quieres centrarlo con flexbox)
}

// Función que se ejecuta al elegir una facción
function seleccionarFaccion(faccion) {
    // Aquí es donde iría la lógica real para iniciar el juego con la facción elegida.
    
    // Por ahora, mostraremos un mensaje simple:
    alert(`¡Has elegido la facción de los ${faccion}! 
    Preparando tu unidad de ataque... ¡El juego comenzará!`);
    
    // Si tuvieras un juego real, aquí cargarías el nivel 1.
}
