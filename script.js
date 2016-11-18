// Añadir los event listener
window.onload = function () {
    var carta2 = document.getElementById("carta2");
    carta2.addEventListener("click", carta, false);
    var plantarse2 = document.getElementById("plantarse2");
    plantarse2.addEventListener("click", plantarse, false);
    var reiniciar2 = document.getElementById("reiniciar2");
    reiniciar2.addEventListener("click", reiniciar, false);
    var continuar2 = document.getElementById("continuar2");
    continuar2.addEventListener("click", continuar, false);
}

// Definir todas las variables
    // Cartas en la baraja
var cartas = ['1o.jpg', '2o.jpg', '3o.jpg', '4o.jpg', '5o.jpg', '6o.jpg', '7o.jpg', 'so.jpg', 'co.jpg', 'ro.jpg', '1c.jpg', '2c.jpg', '3c.jpg', '4c.jpg', '5c.jpg', '6c.jpg', '7c.jpg', 'sc.jpg', 'cc.jpg', 'rc.jpg', '1e.jpg', '2e.jpg', '3e.jpg', '4e.jpg', '5e.jpg', '6e.jpg', '7e.jpg', 'se.jpg', 'ce.jpg', 're.jpg', '1b.jpg', '2b.jpg', '3b.jpg', '4b.jpg', '5b.jpg', '6b.jpg', '7b.jpg', 'sb.jpg', 'cb.jpg', 'rb.jpg'];
    // Cartas del jugador
var misc = [];
    // Cartas de la banca
var miscb = [];
    // Para comprobar si la siguente carta ya ha salido
var esta = 0;
var estab = 0;
    // Para sumar el valos de las cartas que han salido
var valor = 0;
var valorb = 0;
var val = 0;
var suma = 0;
    // Para que las cartas de la banca salgan una a una
var tiempo;
    // Credito
var credito = 300;
    // Apostado
var apuesta = 0;
    // Para controlar el boton continuar
var terminado = 0;

//Funcion para reiniciar la partida
function reiniciar () {
    if (credito <= 0){
        location.reload(); /*global location*/
    } else {
        alert("Todavía tienes crédito. Sigue jugando.");
    }
}

// Funcion para jugar otra vez sin sin reiniciar los creditos
function continuar () {
    if (terminado == 1){
        if (credito <= 0) {
            alert("Has gastado todo tu crédito. Reinicia la partida.");
        } else {
            var carta2 = document.getElementById("carta2");
            carta2.addEventListener("click", carta, false);
            var plantarse2 = document.getElementById("plantarse2");
            plantarse2.addEventListener("click", plantarse, false);
            misc = [];
            miscb = [];
            esta = 0;
            estab = 0;
            valor = 0;
            valorb = 0;
            val = 0;
            tiempo;
            suma = 0;
            terminado = 0;
            credito = credito;
            apuesta = 0;
            document.getElementById('apuesta').max = credito;
            document.getElementById('apostado').innerHTML = 'Apostado: 0';
            document.body.style.backgroundColor = "white";
            document.getElementById('resultado1').innerHTML = '';
            document.getElementById('resultado2').innerHTML = '0';
            document.getElementById('resultado3').innerHTML = '';
            document.getElementById('resultado11').innerHTML = '';
            document.getElementById('resultado12').innerHTML = '0';
            document.getElementById('resultado13').innerHTML = '';
            document.getElementById('resultadof').innerHTML = 'TU ...';
            document.getElementById('resultadotu').innerHTML = '<h2>TU: </h2>';
            document.getElementById('resultadobanca').innerHTML = '<h2>BANCA: </h2>';
        }
    } else {
        alert ("Todavía no has terminado la partida actual.");
    }
    
    
}

// Funcion para que el jugador saque otra carta
function carta () {
    if ((misc.length == 1) && (apuesta <= 0)) {
        alert("Haz una apuesta para continuar.");
    } else {
        if (misc.length == 0) {
            var siguiente = cartas[Math.floor(Math.random() * cartas.length)];
            misc = [siguiente];
            sumar(siguiente);
        } else {
            var siguiente = cartas[Math.floor(Math.random() * cartas.length)];
            for (var i=0;i<misc.length;i++){
                if (siguiente == misc[i]){
                    esta = 1;
                    break;
                }
            }
            if (esta == 0){
                misc.push(siguiente);
    
                sumar(siguiente);
            } else {
                esta = 0;
                carta();
            }
        }
    }
    
}

// Funcion para sumar las cartas que han salido
function sumar(siguiente){
    suma = siguiente.split("");
    if ((suma[0]=="s") || (suma[0]=="c") || (suma[0]=="r")) {
        val = 5;
        val = parseInt(val);
        if (valor == 0) {
            valor = val;
        } else {
            valor = valor + val;
        }
    } else {
        val = parseInt(suma[0]);
        val = (val*10);
        if (valor == 0) {
            valor = val;
        } else {
            valor = valor + val;
        }
    }
    document.getElementById('resultado1').innerHTML += '<img class="carta" src="cartas/'+siguiente+'">';
    document.getElementById('resultado2').innerHTML += '+'+(val/10);
    document.getElementById('resultado3').innerHTML = (valor/10);
    if (valor>75){
        terminado = 1;
        document.getElementById('resultadof').innerHTML = 'TU PIERDES.';
        document.getElementById('resultadotu').innerHTML = '<h2>TU: ' + (valor/10) + '</h2>';
        document.getElementById('resultadobanca').innerHTML = '<h2>BANCA: ' + (valorb/10) + '</h2>';
        document.body.style.backgroundColor = "red";
        credito = parseInt(credito);
        apuesta = parseInt(apuesta);
        credito = (credito - apuesta);
        document.getElementById('credito').innerHTML = credito;
        var carta2 = document.getElementById("carta2");
        carta2.removeEventListener("click", carta, false);
        var plantarse2 = document.getElementById("plantarse2");
        plantarse2.removeEventListener("click", plantarse, false);
    }
}

// Funcion para plantarse con las cartas que ya tienes
function plantarse () {
    if (apuesta <= 0){
        alert("Haz una apuesta para continuar.");
    } else {
        var carta2 = document.getElementById("carta2");
        carta2.removeEventListener("click", carta, false);
        var plantarse2 = document.getElementById("plantarse2");
        plantarse2.removeEventListener("click", plantarse, false);
        if (valor > valorb) {
            var siguienteb = cartas[Math.floor(Math.random() * cartas.length)];
            for (var i=0;i<misc.length;i++){
                if (siguienteb == misc[i]){
                    estab = 1;
                    break;
                }
            }
            for (var i=0;i<miscb.length;i++){
                if (siguienteb == miscb[i]){
                    estab = 1;
                    break;
                }
            }
            if (estab == 0){
                miscb.push(siguienteb);
                sumarb(siguienteb);
            } else {
                estab = 0;
                plantarse();
            }
        } else if (valorb > 75){
            terminado = 1;
            document.getElementById('resultadof').innerHTML = 'TU GANAS.';
            document.getElementById('resultadotu').innerHTML = '<h2>TU: ' + (valor/10) + '</h2>';
            document.getElementById('resultadobanca').innerHTML = '<h2>BANCA: ' + (valorb/10) + '</h2>';
            document.body.style.backgroundColor = "green";
            credito = parseInt(credito);
            apuesta = parseInt(apuesta);
            credito = (credito + apuesta);
            document.getElementById('credito').innerHTML = credito;
        } else {
            terminado = 1;
            document.getElementById('resultadof').innerHTML = 'TU PIERDES.';
            document.getElementById('resultadotu').innerHTML = '<h2>TU: ' + (valor/10) + '</h2>';
            document.getElementById('resultadobanca').innerHTML = '<h2>BANCA: ' + (valorb/10) + '</h2>';
            document.body.style.backgroundColor = "red";
            credito = parseInt(credito);
            apuesta = parseInt(apuesta);
            credito = (credito - apuesta);
            document.getElementById('credito').innerHTML = credito;
        }
    }
}

// Funcion para sumar el valor de las cartas de la banca
function sumarb(siguienteb){
    suma = siguienteb.split("");
    if ((suma[0]=="s") || (suma[0]=="c") || (suma[0]=="r")) {
        val = 5;
        val = parseInt(val);
        if (valorb == 0) {
            valorb = val;
        } else {
            valorb = valorb + val;
        }
        
    } else {
        val = parseInt(suma[0]);
        val = (val*10);
        if (valorb == 0) {
            valorb = val;
        } else {
            valorb = valorb + val;
        }
    }
    document.getElementById('resultado11').innerHTML += '<img class="carta" src="cartas/'+siguienteb+'">';
    document.getElementById('resultado12').innerHTML += '+'+(val/10);
    document.getElementById('resultado13').innerHTML = (valorb/10);
    clearTimeout(tiempo);
    tiempo = setTimeout(plantarse, 1000);
}

// Funcion para apostarel credito del jugador
function apostar () {
    var apu = document.getElementById("apuesta");
    apu = parseInt(apu.value);
    apuesta = parseInt(apuesta);
    if (apuesta > apu){
        alert("No puedes apostar menos de lo apostado anteriormente.");
    } else {
    	if (apu == "") {
    	    apuesta = 0;
    	} else if (apu > credito) {
    	    alert("Tu apuesta es mayor que tu crédito.");
    	} else {
    	    document.getElementById('apostado').innerHTML = 'Apostado: ' + apu;
    	    apuesta = apu;
    	} 
    }
	
}