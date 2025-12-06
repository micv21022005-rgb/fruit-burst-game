// Archivo: game_script.js
 
const arena = document.getElementById('arena');
const ARENA_WIDTH = arena.offsetWidth;
const ARENA_HEIGHT = arena.offsetHeight;
const MSJ_JUEGO = document.getElementById('mensaje-juego'); 
 
// --- CONSTANTES Y ESTADO DEL JUEGO ---
const VELOCIDAD = 8;
const PROYECTIL_VELOCIDAD = 12; 
const DAÑO = 10; 
const PROYECTILES_ACTIVAS = []; 
const COOLDOWN_MS = 300; 
 
// Configuración de Jugadores
const P1 = {
    id: 'jugador1',
    element: document.getElementById('jugador1'),
    x: 100,
    y: ARENA_HEIGHT - 100, 
    vida: 100,
    vidaBarra: document.getElementById('barra-p1'), 
    vidaTexto: document.getElementById('p1-vida-texto'), 
    controles: { left: 'a', right: 'd', up: 'w', down: 's', fire: 'q' },
    lastFireTime: 0 
};
 
const P2 = {
    id: 'jugador2',
    element: document.getElementById('jugador2'),
    x: ARENA_WIDTH - 170, 
    y: ARENA_HEIGHT - 100, 
    vida: 100,
    vidaBarra: document.getElementById('barra-p2'), 
    vidaTexto: document.getElementById('p2-vida-texto'),
    controles: { left: 'ArrowLeft', right: 'ArrowRight', up: 'ArrowUp', down: 'ArrowDown', fire: ' ' },
    lastFireTime: 0 
};
 
const players = [P1, P2];
let keysPressed = {};
let gameActive = true;
 
// --- INICIALIZACIÓN (MODIFICADA) ---
 
function initGame() {
    // 1. APLICAR PERSONALIZACIÓN GUARDADA
    const datosGuardados = localStorage.getItem('frutaSeleccionada');
    if (datosGuardados) {
        const personalizacion = JSON.parse(datosGuardados);
        
        // Aplicar a Jugador 1 
        P1.element.textContent = personalizacion.fruta;
        // P1.element.style.backgroundColor = personalizacion.color; // Opcional: cambiar el fondo de la fruta
        P1.element.style.borderColor = personalizacion.color; // Borde de armadura
    }
 
    // 2. Posicionar jugadores
    P1.element.style.left = P1.x + 'px';
    P1.element.style.top = P1.y + 'px';
    P2.element.style.left = P2.x + 'px';
    P2.element.style.top = P2.y + 'px';
 
    // 3. Iniciar el ciclo de juego
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
 
    requestAnimationFrame(gameLoop);
}
 
// --- MANEJO DE CONTROLES Y POSICIÓN ---
 
function handleKeyDown(e) {
    if (!gameActive) return;
    keysPressed[e.key] = true;
    e.preventDefault(); 
    
    // Control de Disparo con Cooldown
    players.forEach(player => {
        const now = Date.now();
        if (e.key === player.controles.fire && now - player.lastFireTime >= COOLDOWN_MS) {
            lanzarProyectil(player);
            player.lastFireTime = now;
            // Efecto visual al disparar
            player.element.style.transform = 'scale(0.9)'; 
            setTimeout(() => { player.element.style.transform = 'scale(1)'; }, 100);
        }
    });
}
 
function handleKeyUp(e) {
    keysPressed[e.key] = false;
}
 
function updatePositions() {
    players.forEach(player => {
        let moved = false;
        const playerSize = player.element.offsetWidth;
        const arenaTopBoundary = 70; 
 
        // Movimiento Horizontal y Vertical (con límites)
        if (keysPressed[player.controles.left]) {
            player.x = Math.max(0, player.x - VELOCIDAD);
            moved = true;
        } else if (keysPressed[player.controles.right]) {
            player.x = Math.min(ARENA_WIDTH - playerSize, player.x + VELOCIDAD);
            moved = true;
        }
        
        if (keysPressed[player.controles.up]) {
            player.y = Math.max(arenaTopBoundary, player.y - VELOCIDAD); 
            moved = true;
        } else if (keysPressed[player.controles.down]) {
            player.y = Math.min(ARENA_HEIGHT - playerSize, player.y + VELOCIDAD);
            moved = true;
        }
 
        if (moved) {
            player.element.style.left = player.x + 'px';
            player.element.style.top = player.y + 'px';
        }
    });
}
 
// --- LÓGICA DE PROYECTILES DIRIGIDOS ---
 
function lanzarProyectil(atacante) {
    const defensor = (atacante.id === P1.id) ? P2 : P1;
 
    const proyectil = document.createElement('div');
    proyectil.classList.add('proyectil', `proj-${atacante.id}`);
    
    // Centro del atacante
    const startX = atacante.x + atacante.element.offsetWidth / 2;
    const startY = atacante.y + atacante.element.offsetHeight / 2;
    
    // Centro del defensor
    const targetX = defensor.x + defensor.element.offsetWidth / 2;
    const targetY = defensor.y + defensor.element.offsetHeight / 2;
 
    // Calcular el ángulo hacia el defensor
    const angle = Math.atan2(targetY - startY, targetX - startX);
    
    // Almacenar la dirección y la posición inicial del proyectil
    const projData = {
        element: proyectil,
        x: startX - 10, 
        y: startY - 10,
        dx: PROYECTIL_VELOCIDAD * Math.cos(angle), 
        dy: PROYECTIL_VELOCIDAD * Math.sin(angle), 
        shooter: atacante,
        target: defensor
    };
    
    proyectil.style.left = projData.x + 'px';
    proyectil.style.top = projData.y + 'px';
    
    // Rotar visualmente el proyectil para que "apunte"
    proyectil.style.transform = `rotate(${angle * (180 / Math.PI) + 90}deg)`;
    
    arena.appendChild(proyectil);
    PROYECTILES_ACTIVAS.push(projData);
}
 
// --- CICLO DEL JUEGO Y COLISIÓN ---
 
function getRect(element) {
    return {
        left: element.offsetLeft,
        top: element.offsetTop,
        right: element.offsetLeft + element.offsetWidth,
        bottom: element.offsetTop + element.offsetHeight
    };
}
 
function checkCollision(rect1, rect2) {
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
    player.element.style.filter = 'drop-shadow(0 0 10px red)';
    setTimeout(() => { player.element.style.filter = 'drop-shadow(0 8px 15px rgba(0, 0, 0, 0.8))'; }, 100);
 
    if (player.vida <= 0) {
        endGame(player.id === P1.id ? P2 : P1); 
    }
}
 
function updateProjectiles() {
    const proyectilesSobrevivientes = [];
 
    PROYECTILES_ACTIVAS.forEach(projData => {
        // Mover proyectil
        projData.x += projData.dx;
        projData.y += projData.dy;
        
        projData.element.style.left = projData.x + 'px';
        projData.element.style.top = projData.y + 'px';
        
        const projRect = getRect(projData.element);
        const targetRect = getRect(projData.target.element);
 
        let hit = false;
        
        // 1. Detección de Colisión
        if (checkCollision(projRect, targetRect)) {
            updateHealth(projData.target, DAÑO);
            projData.element.remove(); 
            hit = true;
        } 
        
        // 2. Salida de la Arena 
        if (
            projData.x < -30 || 
            projData.x > ARENA_WIDTH + 30 || 
            projData.y < -30 || 
            projData.y > ARENA_HEIGHT + 30
        ) {
            if (!hit) projData.element.remove();
        } else if (!hit) {
            proyectilesSobrevivientes.push(projData);
        }
    });
 
    // Actualizar el array global
    PROYECTILES_ACTIVAS.length = 0;
    PROYECTILES_ACTIVAS.push(...proyectilesSobrevivientes);
}
 
function endGame(winner) {
    gameActive = false;
    
    const winnerName = (winner.id === P1.id) ? 'JUGADOR 1 (LIMÓN)' : 'JUGADOR 2 (PIÑA)';
    
    MSJ_JUEGO.textContent = `¡${winnerName} GANA LA PARTIDA!`;
    MSJ_JUEGO.style.display = 'block'; 
    
    // Limpiar proyectiles
    PROYECTILES_ACTIVAS.forEach(p => p.element.remove());
    PROYECTILES_ACTIVAS.length = 0;
}
 
 
function gameLoop() {
    if (gameActive) {
        updatePositions(); 
        updateProjectiles(); 
    }
 
    requestAnimationFrame(gameLoop);
}
 
document.addEventListener('DOMContentLoaded', initGame);
