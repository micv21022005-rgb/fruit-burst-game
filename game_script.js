// Archivo: game_script.js

const arena = document.getElementById('arena');
const jugador1 = document.getElementById('jugador1');
const jugador2 = document.getElementById('jugador2');
const mensajeJuego = document.getElementById('mensaje-juego');

// --- CONSTANTES Y ESTADO DEL JUEGO ---
const VELOCIDAD = 10;
const PROYECTIL_VELOCIDAD = 15;
const ARENA_WIDTH = arena.offsetWidth;
const ARENA_HEIGHT = arena.offsetHeight;

const P1 = {
    id: 'jugador1', element: jugador1, x: 100, y: ARENA_HEIGHT - 60, 
    vida: 100, vidaBarra: document.getElementById('barra-p1'), 
    vidaTexto: document.getElementById('p1-vida-texto'), 
    controles: { left: 'a', right: 'd', up: 'w', down: 's', fire: 'q' }
};

const P2 = {
    id: 'jugador2', element: jugador2, x: ARENA_WIDTH - 160, y: ARENA_HEIGHT - 60, 
    vida: 100, vidaBarra: document.getElementById('barra-p2'), 
    vidaTexto: document.getElementById('p2-vida-texto'), 
    controles: { left: 'ArrowLeft', right: 'ArrowRight', up: 'ArrowUp', down: 'ArrowDown', fire: ' ' }
};

let gameInterval;
let gameActive = true;


// --- INICIALIZACIÓN ---

function initGame() {
    // Posicionar jugadores
    P1.element.style.left = P1.x + 'px';
    P1.element.style.top = P1.y + 'px';
    P2.element.style.left = P2.x + 'px';
    P2.element.style.top = P2.y + 'px';

    // Iniciar el ciclo de juego
    document.addEventListener('keydown', handleKeyPress);
    gameInterval = setInterval(gameLoop, 50);
}

// --- MANEJO DE CONTROLES ---

function movePlayer(player, direction) {
    if (!gameActive) return;
    
    let newX = player.x;
    let newY = player.y;

    switch (direction) {
        case 'left':
            newX = Math.max(0, player.x - VELOCIDAD);
            break;
        case 'right':
            newX = Math.min(ARENA_WIDTH - player.element.offsetWidth, player.x + VELOCIDAD);
            break;
        case 'up':
            newY = Math.max(0, player.y - VELOCIDAD);
            break;
        case 'down':
            newY = Math.min(ARENA_HEIGHT - player.element.offsetHeight, player.y + VELOCIDAD);
            break;
    }
    
    player.x = newX;
    player.y = newY;
    player.element.style.left = player.x + 'px';
    player.element.style.top = player.y + 'px';
}

function handleKeyPress(e) {
    const key = e.key;

    // Movimiento P1
    if (key === P1.controles.left) movePlayer(P1, 'left');
    else if (key === P1.controles.right) movePlayer(P1, 'right');
    else if (key === P1.controles.up) movePlayer(P1, 'up');
    else if (key === P1.controles.down) movePlayer(P1, 'down');
    // Disparo P1 (Q)
    else if (key === P1.controles.fire) lanzarProyectil(P1, P2);

    // Movimiento P2
    else if (key === P2.controles.left) movePlayer(P2, 'left');
    else if (key === P2.controles.right) movePlayer(P2, 'right');
    else if (key === P2.controles.up) movePlayer(P2, 'up');
    else if (key === P2.controles.down) movePlayer(P2, 'down');
    // Disparo P2 (Espacio)
    else if (key === P2.controles.fire) {
        e.preventDefault(); // Evita scroll
        lanzarProyectil(P2, P1);
    }
}

// --- LÓGICA DE PROYECTILES ---

function lanzarProyectil(atacante, objetivo) {
    if (!gameActive) return;
    
    const proyectil = document.createElement('div');
    proyectil.classList.add('proyectil', `proyectil-${atacante.id}`);
    
    // Posicionar el proyectil sobre el atacante
    proyectil.style.left = (atacante.x + atacante.element.offsetWidth / 2 - 7.5) + 'px';
    proyectil.style.top = (atacante.y + atacante.element.offsetHeight / 2 - 7.5) + 'px';
    arena.appendChild(proyectil);
}

// --- CICLO DEL JUEGO Y COLISIÓN ---

function checkCollision(p1, p2) {
    const rect1 = p1.getBoundingClientRect();
    const rect2 = p2.getBoundingClientRect();

    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}

function updateHealth(player, damage) {
    player.vida = Math.max(0, player.vida - damage);
    const porcentajeVida = player.vida;
    
    // Actualizar barra y texto
    player.vidaBarra.style.width = porcentajeVida + '%';
    player.vidaTexto.textContent = `${porcentajeVida} HP`;

    // Efecto visual de daño
    player.element.style.opacity = '0.5';
    setTimeout(() => { player.element.style.opacity = '1'; }, 100);

    if (player.vida <= 0) {
        endGame(player.id === P1.id ? P2 : P1); // El que no murió, gana
    }
}

function gameLoop() {
    if (!gameActive) return;

    const proyectiles = document.querySelectorAll('.proyectil');
    
    proyectiles.forEach(proj => {
        let currentTop = proj.offsetTop;
        const isP1Shot = proj.classList.contains(`proyectil-${P1.id}`);
        
        // Mover proyectil: P1 dispara hacia P2 (arriba), P2 dispara hacia P1 (arriba)
        proj.style.top = (currentTop - PROYECTIL_VELOCIDAD) + 'px';
        
        // Detección de colisión: P1 proyectil vs P2, y P2 proyectil vs P1
        let target = isP1Shot ? P2.element : P1.element;
        let targetData = isP1Shot ? P2 : P1;

        if (checkCollision(proj, target)) {
            updateHealth(targetData, 10);
            proj.remove(); // Eliminar proyectil al impactar
        } else if (currentTop < 0) {
            proj.remove(); // Eliminar proyectil si sale de la arena
        }
    });
}

function endGame(winner) {
    gameActive = false;
    clearInterval(gameInterval);
    document.removeEventListener('keydown', handleKeyPress);
    
    let winnerText = (winner.id === P1.id) ? '¡VICTORIA DEL JUGADOR 1 (CÍTRICOS)!' : '¡VICTORIA DEL JUGADOR 2 (TROPICALES)!';
    
    mensajeJuego.textContent = winnerText;
}

// Iniciar el juego al cargar la página
initGame();