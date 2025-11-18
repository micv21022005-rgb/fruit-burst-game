// Archivo: game_script.js

const arena = document.getElementById('arena');
const ARENA_WIDTH = arena.offsetWidth;
const ARENA_HEIGHT = arena.offsetHeight;

// --- CONSTANTES Y ESTADO DEL JUEGO ---
const VELOCIDAD = 8;
const PROYECTIL_VELOCIDAD = 10;
const DAÑO = 10; 

const P1 = {
    id: 'jugador1', element: document.getElementById('jugador1'), x: 100, y: ARENA_HEIGHT - 80, 
    vida: 100, vidaBarra: document.getElementById('barra-p1'), 
    vidaTexto: document.getElementById('p1-vida-texto'), 
    controles: { left: 'a', right: 'd', up: 'w', down: 's', fire: 'F' },
    isFiring: false 
};

const P2 = {
    id: 'jugador2', element: document.getElementById('jugador2'), x: ARENA_WIDTH - 160, y: ARENA_HEIGHT - 80, 
    vida: 100, vidaBarra: document.getElementById('barra-p2'), 
    vidaTexto: document.getElementById('p2-vida-texto'), 
    controles: { left: 'ArrowLeft', right: 'ArrowRight', up: 'ArrowUp', down: 'ArrowDown', fire: ' ' },
    isFiring: false
};

const players = [P1, P2];
let keysPressed = {};
let gameActive = true;

// --- INICIALIZACIÓN ---

function initGame() {
    // Posicionar jugadores
    P1.element.style.left = P1.x + 'px';
    P1.element.style.top = P1.y + 'px';
    P2.element.style.left = P2.x + 'px';
    P2.element.style.top = P2.y + 'px';

    // Iniciar el ciclo de juego
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    requestAnimationFrame(gameLoop);
}

// --- MANEJO DE CONTROLES ---

function handleKeyDown(e) {
    if (!gameActive) return;
    keysPressed[e.key] = true;
    e.preventDefault(); 
    
    // Disparo inmediato (Q o Espacio)
    players.forEach(player => {
        if (e.key === player.controles.fire && !player.isFiring) {
            lanzarProyectil(player);
            player.isFiring = true;
            setTimeout(() => player.isFiring = false, 300); // Cooldown de 300ms
        }
    });
}

function handleKeyUp(e) {
    keysPressed[e.key] = false;
}

function updatePositions() {
    players.forEach(player => {
        let moved = false;
        
        // Movimiento Horizontal
        if (keysPressed[player.controles.left]) {
            player.x = Math.max(0, player.x - VELOCIDAD);
            moved = true;
        } else if (keysPressed[player.controles.right]) {
            player.x = Math.min(ARENA_WIDTH - player.element.offsetWidth, player.x + VELOCIDAD);
            moved = true;
        }
        
        // Movimiento Vertical
        if (keysPressed[player.controles.up]) {
            player.y = Math.max(70, player.y - VELOCIDAD); 
            moved = true;
        } else if (keysPressed[player.controles.down]) {
            player.y = Math.min(ARENA_HEIGHT - player.element.offsetHeight, player.y + VELOCIDAD);
            moved = true;
        }

        if (moved) {
            player.element.style.left = player.x + 'px';
            player.element.style.top = player.y + 'px';
        }
    });
}

// --- LÓGICA DE PROYECTILES ---

function lanzarProyectil(atacante) {
    const proyectil = document.createElement('div');
    proyectil.classList.add('proyectil', `proj-${atacante.id}`);
    
    // Posicionar el proyectil sobre el atacante
    proyectil.style.left = (atacante.x + atacante.element.offsetWidth / 2 - 10) + 'px'; 
    proyectil.style.top = (atacante.y + atacante.element.offsetHeight / 2 - 10) + 'px';
    arena.appendChild(proyectil);
}

// --- CICLO DEL JUEGO Y COLISIÓN ---

function checkCollision(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

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
    player.element.style.filter = 'brightness(2)';
    setTimeout(() => { player.element.style.filter = 'brightness(1)'; }, 100);

    if (player.vida <= 0) {
        endGame(player.id === P1.id ? P2 : P1); 
    }
}

function updateProjectiles() {
    const proyectiles = document.querySelectorAll('.proyectil');
    
    proyectiles.forEach(proj => {
        let currentTop = proj.offsetTop;
        const isP1Shot = proj.classList.contains(`proj-${P1.id}`);
        
        // Mover proyectil: siempre hacia arriba 
        proj.style.top = (currentTop - PROYECTIL_VELOCIDAD) + 'px';
        
        // Definir objetivo
        let targetData = isP1Shot ? P2 : P1;
        let targetElement = targetData.element;

        if (checkCollision(proj, targetElement)) {
            updateHealth(targetData, DAÑO);
            proj.remove(); 
        } else if (currentTop < -20) { // Si sale de la arena
            proj.remove();
        }
    });
}

function endGame(winner) {
    gameActive = false;
    
    const winnerName = (winner.id === P1.id) ? 'JUGADOR 1 (WASD)' : 'JUGADOR 2 (FLECHAS)';
    
    document.getElementById('mensaje-juego').textContent = `¡${winnerName} GANA LA PARTIDA!`;
}


function gameLoop() {
    if (gameActive) {
        updatePositions(); 
        updateProjectiles(); 
    }

    // Continuar el loop
    requestAnimationFrame(gameLoop);
}

// Iniciar el juego al cargar la página
initGame();


