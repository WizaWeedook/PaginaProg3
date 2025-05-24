// Variables globales
var victoriasJugador = 0;
var victoriasEnemigo = 0;
var rondaActual = 1;
var maxRondas = 5;
var juegoTerminado = false;

function jugar(obj){
    if (juegoTerminado) return; // No permitir jugar si terminó
    if (rondaActual > maxRondas) return; // No permitir más de 5 rondas

    var objetos = ["Mago", "caballero", "dragon"];

    var jugada = [
        ["Empatas","Pierdes","Ganas"],
        ["Ganas","Empate","Pierdes"],
        ["Pierdes","Ganas","Empate"]
    ];
    
    var enemigo = Math.floor(Math.random() * 3);

    document.getElementById("jugador").innerHTML = objetos[obj];
    document.getElementById("enemigo").innerHTML = objetos[enemigo];
    document.getElementById("resultado").innerHTML = jugada[obj][enemigo];

    // Mostrar texto de la ronda actual SIEMPRE antes de cualquier posible cambio
    document.getElementById("ronda").innerHTML = `Ronda: ${rondaActual} / ${maxRondas}`;
    document.getElementById("estadoRonda").innerHTML = `¡Comienza la ronda ${rondaActual}!`;

    // Solo avanzar ronda si NO es empate
    if (jugada[obj][enemigo] === "Ganas") {
        victoriasJugador++;
        rondaActual++;
    } else if (jugada[obj][enemigo] === "Pierdes") {
        victoriasEnemigo++;
        rondaActual++;
    } // Si es empate, no se avanza la ronda

    document.getElementById("marcador").innerHTML = 
        `Jugador: ${victoriasJugador} - Enemigo: ${victoriasEnemigo}`;

    // Verificar si alguien ganó la partida antes de la última ronda
    if (victoriasJugador === 3 || victoriasEnemigo === 3) {
        juegoTerminado = true;
        if (victoriasJugador === 3) {
            document.getElementById("estadoRonda").innerHTML = "¡La partida ha terminado! Ganaste al mejor de 5.";
            document.getElementById("resultado").innerHTML = "¡Ganaste la partida!";
        } else {
            document.getElementById("estadoRonda").innerHTML = "¡La partida ha terminado! El enemigo ganó al mejor de 5.";
            document.getElementById("resultado").innerHTML = "¡Perdiste la partida!";
        }
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
        document.getElementById("reiniciar").style.display = "block";
        document.getElementById("menu-btn").style.display = "inline-block";
    }
}

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