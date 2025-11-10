// Archivo: game_script.js

const jugador = document.getElementById('jugador');
const arena = document.getElementById('arena');
let jugadorX = 100;
let jugadorY = 430; // Posición inicial
const velocidad = 15;
let vidaJugador = 100;
let vidaEnemigo = 100;

// 1. Manejo del movimiento del jugador (Teclas de flecha)
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            jugadorX = Math.max(0, jugadorX - velocidad);
            break;
        case 'ArrowRight':
            jugadorX = Math.min(arena.offsetWidth - jugador.offsetWidth, jugadorX + velocidad);
            break;
        case ' ': // Barra espaciadora para atacar
            lanzarProyectil();
            break;
    }
    jugador.style.left = jugadorX + 'px';
});

// 2. Lógica del ataque (Lanzar un proyectil)
function lanzarProyectil() {
    const proyectil = document.createElement('div');
    proyectil.classList.add('proyectil');
    proyectil.style.left = (jugadorX + jugador.offsetWidth / 2 - 7.5) + 'px'; // Centrar
    proyectil.style.top = (jugadorY - 15) + 'px';
    arena.appendChild(proyectil);

    // Animación del proyectil (moverse hacia la derecha)
    let proyectilIntervalo = setInterval(() => {
        let actualTop = proyectil.offsetTop;
        proyectil.style.top = (actualTop - 10) + 'px'; // Sube

        // Detección de colisión simple con el enemigo
        if (actualTop < 50) { // Si llega a la zona del enemigo (simulación)
             colisionEnemigo();
             clearInterval(proyectilIntervalo);
             proyectil.remove();
             return;
        }

        if (actualTop < 0) { // Si sale de la pantalla
            clearInterval(proyectilIntervalo);
            proyectil.remove();
        }
    }, 50);
}

// 3. Lógica de Colisión/Daño
function colisionEnemigo() {
    vidaEnemigo -= 10;
    document.getElementById('barra-vida-enemigo').textContent = 'Vida: ' + vidaEnemigo;

    if (vidaEnemigo <= 0) {
        document.getElementById('mensaje-juego').textContent = '¡VICTORIA CÍTRICA!';
        // Podrías detener el juego aquí
    }
}

// 4. Inicializar la posición del jugador
jugador.style.left = jugadorX + 'px';
jugador.style.top = jugadorY + 'px';