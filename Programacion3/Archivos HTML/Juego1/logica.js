// Variables globales para llevar el control del juego
var victoriasJugador = 0; // Contador de victorias del jugador
var victoriasEnemigo = 0; // Contador de victorias del enemigo
var rondaActual = 1; // Número de la ronda actual
var maxRondas = 5; // Número máximo de rondas
var juegoTerminado = false; // Indica si el juego ha terminado

// Función principal que se ejecuta cuando el jugador elige una opción
function jugar(obj){
    if (juegoTerminado) return; // No permitir jugar si el juego terminó
    if (rondaActual > maxRondas) return; // No permitir más de 5 rondas

    var objetos = ["Mago", "caballero", "dragon"]; // Opciones posibles

    // Matriz que define los resultados posibles según las elecciones
    // jugada[jugador][enemigo] => resultado
    var jugada = [
        ["Empatas","Pierdes","Ganas"], // Si el jugador elige Mago
        ["Ganas","Empate","Pierdes"], // Si el jugador elige Caballero
        ["Pierdes","Ganas","Empate"]  // Si el jugador elige Dragón
    ];
    
    var enemigo = Math.floor(Math.random() * 3); // Elección aleatoria del enemigo

    // Mostrar la elección del jugador y del enemigo en pantalla
    document.getElementById("jugador").innerHTML = objetos[obj];
    document.getElementById("enemigo").innerHTML = objetos[enemigo];
    document.getElementById("resultado").innerHTML = jugada[obj][enemigo]; // Mostrar resultado

    // Mostrar el número de ronda actual
    document.getElementById("ronda").innerHTML = `Ronda: ${rondaActual} / ${maxRondas}`;
    document.getElementById("estadoRonda").innerHTML = `¡Comienza la ronda ${rondaActual}!`;

    // Solo avanzar ronda si NO es empate
    if (jugada[obj][enemigo] === "Ganas") {
        victoriasJugador++; // Suma victoria al jugador
        rondaActual++; // Avanza ronda
    } else if (jugada[obj][enemigo] === "Pierdes") {
        victoriasEnemigo++; // Suma victoria al enemigo
        rondaActual++; // Avanza ronda
    } // Si es empate, no se avanza la ronda

    // Actualizar el marcador en pantalla
    document.getElementById("marcador").innerHTML = 
        `Jugador: ${victoriasJugador} - Enemigo: ${victoriasEnemigo}`;

    // Verificar si alguien ganó la partida antes de la última ronda
    if (victoriasJugador === 3 || victoriasEnemigo === 3) {
        juegoTerminado = true; // Termina el juego
        if (victoriasJugador === 3) {
            document.getElementById("estadoRonda").innerHTML = "¡La partida ha terminado! Ganaste al mejor de 5.";
            document.getElementById("resultado").innerHTML = "¡Ganaste la partida!";
        } else {
            document.getElementById("estadoRonda").innerHTML = "¡La partida ha terminado! El enemigo ganó al mejor de 5.";
            document.getElementById("resultado").innerHTML = "¡Perdiste la partida!";
        }
        // Mostrar botones de reinicio y menú
        document.getElementById("reiniciar").style.display = "block";
        document.getElementById("menu-btn").style.display = "inline-block";
        return;
    }

    // Si se llega a la última ronda, terminar el juego y mostrar el resultado final
    if (rondaActual > maxRondas) {
        juegoTerminado = true;
        if (victoriasJugador > victoriasEnemigo) {
            document.getElementById("estadoRonda").innerHTML = "¡La partida ha terminado! Ganaste al mejor de 5.";
            document.getElementById("resultado").innerHTML = "¡Ganaste la partida!";
        } else if (victoriasJugador < victoriasEnemigo) {
            document.getElementById("estadoRonda").innerHTML = "¡La partida ha terminado! El enemigo ganó al mejor de 5.";
            document.getElementById("resultado").innerHTML = "¡Perdiste la partida!";
        } else {
            document.getElementById("estadoRonda").innerHTML = "¡La partida ha terminado! Hubo un empate.";
            document.getElementById("resultado").innerHTML = "¡Empate en la partida!";
        }
        // Mostrar botones de reinicio y menú
        document.getElementById("reiniciar").style.display = "block";
        document.getElementById("menu-btn").style.display = "inline-block";
    }
}

// Función para reiniciar el juego y volver a los valores iniciales
function reiniciarJuego() {
    victoriasJugador = 0;
    victoriasEnemigo = 0;
    rondaActual = 1;
    juegoTerminado = false;
    document.getElementById("marcador").innerHTML = "Jugador: 0 - Enemigo: 0";
    document.getElementById("jugador").innerHTML = "";
    document.getElementById("enemigo").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("ronda").innerHTML = `Ronda: 1 / ${maxRondas}`;
    document.getElementById("reiniciar").style.display = "none";
}