// Archivo: script.js
 
// --- LÓGICA CENTRAL DE NAVEGACIÓN ---
 
function mostrarPantalla(idPantallaAMostrar) {
    const todasLasPantallas = document.querySelectorAll('.contenedor-principal');
    todasLasPantallas.forEach(pantalla => {
        pantalla.classList.add('pantalla-oculta');
        pantalla.classList.remove('pantalla-activa');
    });
 
    const pantallaActiva = document.getElementById(idPantallaAMostrar);
    if (pantallaActiva) {
        pantallaActiva.classList.add('pantalla-activa');
        pantallaActiva.classList.remove('pantalla-oculta');
    }
    
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
     
    if (faccion === 'Citricos') {
        document.body.classList.add('faccion-citricos');
        botonCitricos.classList.add('seleccionado');
        botonContinuar.style.backgroundColor = '#FF9F1C'; 
        botonContinuar.innerHTML = '¡Defender Cítricos! 🍋';
    } else if (faccion === 'Tropicales') {
        document.body.classList.add('faccion-tropicales');
        botonTropicales.classList.add('seleccionado');
        botonContinuar.style.backgroundColor = '#E91E63'; // Color Rosado/Magenta
        botonContinuar.innerHTML = '¡Luchar por el Trópico! 🍍';
    }
    
    botonContinuar.style.display = 'block'; 
}
 
function continuarJuego() {
    // Almacenar la facción seleccionada si es necesario (opcional)
    const faccionSeleccionada = document.querySelector('.faccion-btn.seleccionado');
    if (faccionSeleccionada) {
        localStorage.setItem('faccionJugador', faccionSeleccionada.textContent.includes('Cítricos') ? 'Citricos' : 'Tropicales');
    }
    window.location.href = 'game.html'; 
}
 
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
    
    preview.textContent = estadoPersonalizacion.fruta;
    preview.style.border = `4px solid ${estadoPersonalizacion.color}`;
    preview.style.borderRadius = '50%';
}
 
function guardarPersonalizacion() {
    // CAMBIO CLAVE: GUARDAR EN LOCAL STORAGE
    localStorage.setItem('frutaSeleccionada', JSON.stringify(estadoPersonalizacion));
    
    console.log('Personalización guardada:', estadoPersonalizacion);
    alert(`¡Tu fruta ${estadoPersonalizacion.fruta} ha sido equipada con armadura ${estadoPersonalizacion.color}!`);
    mostrarPantalla('pantalla-inicio');
}
 
 
// --- LÓGICA DE TIENDA ---
 
let zumoActual = 1200; 
 
function actualizarSaldo() {
    const saldoElement = document.getElementById('saldo-zumo');
    if (saldoElement) {
        saldoElement.textContent = `${zumoActual} 💧`;
    }
}
 
function comprarItem(costo, nombreItem) {
    if (zumoActual >= costo) {
        zumoActual -= costo;
        actualizarSaldo();
        alert(`¡Compra exitosa! Has comprado ${nombreItem} por ${costo} 💧. Saldo restante: ${zumoActual} 💧.`);
        // Aquí iría la lógica para registrar la compra en el localStorage
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
 
document.addEventListener('DOMContentLoaded', () => {
    mostrarPantalla('pantalla-inicio'); 
    actualizarSaldo();
    actualizarPreview();
    // Cargar personalización previa si existe
    const storedData = localStorage.getItem('frutaSeleccionada');
    if (storedData) {
        estadoPersonalizacion = JSON.parse(storedData);
        // Actualizar los selectores en la UI si es necesario
        // document.getElementById('selector-fruta').value = estadoPersonalizacion.fruta;
        // document.getElementById('color-armadura').value = estadoPersonalizacion.color;
    }
});
