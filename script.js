// Archivo: script.js
 
// --- LÓGICA CENTRAL DE NAVEGACIÓN ---
 
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
        botonContinuar.style.backgroundColor = '#FF9F1C'; // Color Cítrico
        botonContinuar.innerHTML = '¡Defender Cítricos! 🍋';
    } else if (faccion === 'Tropicales') {
        document.body.classList.add('faccion-tropicales');
        botonTropicales.classList.add('seleccionado');
        botonContinuar.style.backgroundColor = '#D62828'; // Color Tropical
        botonContinuar.innerHTML = '¡Luchar por el Trópico! 🍍';
    }
    
    // Mostrar el botón de continuar
    botonContinuar.style.display = 'block'; 
}
 
// Función que se llama al presionar el botón de continuar: REDIRIGE AL JUEGO
function continuarJuego() {
    window.location.href = 'game.html'; 
}
 
// --- NUEVAS FUNCIONES PARA LOGIN, TIENDA Y PERSONALIZACIÓN ---
 
// --- LÓGICA DE PERSONALIZACIÓN ---
 
let estadoPersonalizacion = {
    fruta: '🍋',
    color: '#386641'
};
 
function actualizarPreview() {
    const selectorFruta = document.getElementById('selector-fruta');
    const colorArmadura = document.getElementById('color-armadura');
    const preview = document.getElementById('fruta-preview');
 
    estadoPersonalizacion.fruta = selectorFruta.value;
    estadoPersonalizacion.color = colorArmadura.value;
    
    // Actualizar el emoji y darle un borde con el color de la armadura
    preview.textContent = estadoPersonalizacion.fruta;
    preview.style.border = `4px solid ${estadoPersonalizacion.color}`;
    preview.style.borderRadius = '50%';
}
 
function guardarPersonalizacion() {
    console.log('Personalización guardada:', estadoPersonalizacion);
    alert(`¡Tu fruta ${estadoPersonalizacion.fruta} ha sido equipada con armadura ${estadoPersonalizacion.color}!`);
    mostrarPantalla('pantalla-inicio');
}
 
 
// --- LÓGICA DE TIENDA ---
 
let zumoActual = 1200; // Zumo inicial
 
function actualizarSaldo() {
    const saldoElement = document.getElementById('saldo-zumo');
    if (saldoElement) {
        saldoElement.textContent = `${zumoActual} 💧`;
    }
}
 
function comprarItem(costo) {
    if (zumoActual >= costo) {
        zumoActual -= costo;
        actualizarSaldo();
        alert(`¡Compra exitosa! Has gastado ${costo} 💧. Saldo restante: ${zumoActual} 💧.`);
    } else {
        alert('¡Zumo insuficiente! ¡A cosechar más victorias!');
    }
}
 
 
// --- LÓGICA DE LOGIN ---
 
const loginForm = document.getElementById('formulario-login');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;
        
        if (user.length > 3 && pass.length > 5) {
            alert(`¡Bienvenido, ${user}! Has iniciado sesión. Ahora puedes Jugar.`);
            mostrarPantalla('pantalla-inicio');
        } else {
            alert('Credenciales inválidas. ¡Intenta de nuevo, guerrero!');
        }
    });
}
 
// Inicializar mostrando solo la pantalla de inicio al cargar y actualizar saldos/previews
document.addEventListener('DOMContentLoaded', () => {
    mostrarPantalla('pantalla-inicio'); 
    actualizarSaldo();
    actualizarPreview();
});
