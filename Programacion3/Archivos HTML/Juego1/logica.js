function jugar(obj){
    console.log(obj);

    var objetos = ["piedra", "papel", "tijeras"];
    console.log(objetos)

    var jugada = [
        ["Empatas","Pierdes","Ganas"],
        ["Ganas","Empate","Pierdes"],
        ["Pierdes","Ganas","Empate"]
    ];
    
    var enemigo = Math.floor(Math.random() * 3);
    console.log(objetos[obj]);
    console.log(jugador[enemigo]);
    console.log(jugada[obj][enemigo]);
    document.getElementById("jugador").innerHTML = objetos[obj];
    document.getElementById("enemigo").innerHTML = objetos[enemigo];
    document.getElementById("resultado").innerHTML = jugada[obj][enemigo];

}