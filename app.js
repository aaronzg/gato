// ******* PANTALLA DE AJUSTES *********

const botonImg = document.querySelector('#ajustesBoton');
const ventanaAjustes = document.querySelector('.ajustes');


botonImg.addEventListener('click',() => {
   ventanaAjustes.classList.toggle('visible');
    if(botonImg.classList.contains('fa-pen-to-square')){
        botonImg.classList.replace('fa-pen-to-square','fa-xmark');
    }else{
        botonImg.classList.replace('fa-xmark','fa-pen-to-square')
    }
});



const audioContainer = document.querySelector('.audio');

let miAudio = document.createElement('audio');
miAudio.controls = false;

// Crear la fuente del audio
let source = document.createElement('source');
source.src = 'cancion.mp3';
source.type = 'audio/mpeg';

// Agregar la fuente al elemento de audio
miAudio.appendChild(source);
miAudio.controls = false;
// Establecer el tiempo de inicio en 18 segundos
miAudio.currentTime = 18;

audioContainer.appendChild(miAudio);

const audio2 = document.querySelector('#audio2');

audio2.controls = false;





// ********* CONFIGURACIONES **********
let backgroundColor = localStorage.getItem('background');
const body = document.body;
body.classList.add(backgroundColor);
const backgroundOptions = document.querySelector('.background');

const normalBackground = document.getElementById('normal');
const blackBackground = document.getElementById('black');
const whiteBackground = document.getElementById('white');


backgroundOptions.addEventListener('submit',(e) => {
    e.preventDefault();

   if(normalBackground.checked){
    if(body.classList.contains(blackBackground.value)){
        body.classList.replace(blackBackground.value,normalBackground.value);
        localStorage.setItem('background',normalBackground.value);
    }else if(body.classList.contains(whiteBackground.value)){
        body.classList.replace(whiteBackground.value,normalBackground.value);
        localStorage.setItem('background',normalBackground.value);
    }else{
        body.classList.add(normalBackground.value);
        localStorage.setItem('background',normalBackground.value);
    }
    miAudio.pause();


    audio2.pause();
   }else if(blackBackground.checked){
    
    if(body.classList.contains(normalBackground.value)){
        body.classList.replace(normalBackground.value,blackBackground.value);
        localStorage.setItem('background',blackBackground.value);
    }else if(body.classList.contains(whiteBackground.value)){
        body.classList.replace(whiteBackground.value,blackBackground.value);
        localStorage.setItem('background',blackBackground.value);
    }else{
        body.classList.add(blackBackground.value);
        localStorage.setItem('background',blackBackground.value);
    }
    audio2.pause();


    miAudio.play();

   }else{
    
    if(body.classList.contains(normalBackground.value)){
        body.classList.replace(normalBackground.value,whiteBackground.value);
        localStorage.setItem('background',whiteBackground.value);
    }else if(body.classList.contains(blackBackground.value)){
        body.classList.replace(blackBackground.value,whiteBackground.value);
        localStorage.setItem('background',whiteBackground.value);
    }else{
        body.classList.add(whiteBackground.value);
        localStorage.setItem('background',whiteBackground.value);
    }
    miAudio.pause();

    audio2.play();
   }
});


// ********** GAMEPLAY ***********

combinaciones = {
    h1:[1,2,3].map(val => val.toString()),
    h2:[4,5,6].map(val => val.toString()),
    h3:[7,8,9].map(val => val.toString()),
    v1:[1,4,7].map(val => val.toString()),
    v2:[2,5,8].map(val => val.toString()),
    v3:[3,6,9].map(val => val.toString()),
    d1:[1,5,9].map(val => val.toString()),
    d2:[3,5,7].map(val => val.toString()),
   e:[1,2,3,4,5,6,7,8,9].map(val => val.toString())
}

function buscarValores (arr,valores) {
    let comprobar = valores.every(v => arr.includes(v));

    return comprobar;
}

const turnos = ['X','O'];
const pantallaFinal = document.querySelector('.pantalla-final');
let turnoActual = turnos[0];

const tablero = document.querySelector('.tablero');

function alternarTurnos () {
    if(turnoActual == turnos[0]){
        turnoActual = turnos[1];
    }else{
        turnoActual = turnos[0];
    }
}



function endGame (turno) {
    if(buscarValores(posiciones[turno],combinaciones.h1) | buscarValores(posiciones[turno],combinaciones.h2) | buscarValores(posiciones[turno],combinaciones.h3) | buscarValores(posiciones[turno],combinaciones.v1) |  buscarValores(posiciones[turno],combinaciones.v2) |  buscarValores(posiciones[turno],combinaciones.v3) |  buscarValores(posiciones[turno],combinaciones.d1) | buscarValores(posiciones[turno],combinaciones.d2)){
        const ganador = turno;
        return turno;
    }else if(buscarValores(posiciones.posicionesG, combinaciones.e){
        return "empate";
    }else{
       return false;
    }
}

posiciones = {
    X:[],
    O:[],
    nuevaPosicion: function(turno,posicion){
        if(!this[turno].includes(posicion)){
            this[turno].push(posicion);
        }
    },
   posicionesG: [posiciones.X.map(e => e), posiciones.O.map(e => e)].flat();
}

const h1 = document.querySelector(".turno");


tablero.addEventListener('click', (e) => {
    const posicion = e.target.getAttribute('posicion');
    const casilla = e.target.firstElementChild;
    posiciones.nuevaPosicion(turnoActual,posicion);

    casilla.textContent = turnoActual;
    casilla.classList.add('s');
    if(endGame(turnoActual) == turnoActual){
        tablero.classList.add('inactivo')
        pantallaFinal.firstElementChild.textContent = `El ganador es: ${turnoActual}`
        pantallaFinal.classList.add('pantalla-visible')
    }else if(endGame(turnoActual) == 'empate'){
       tablero.classList.add('inactivo');
        pantallaFinal.firstElementChild.textContent = `Habeis empatado`;
        pantallaFinal.classList.add('pantalla-visible');
    }
    alternarTurnos();
   h1.textContent = 'El turno es para:' + turnoActual;
})


//********* pantalla final ******************

const reiniciar = pantallaFinal.children[1];

reiniciar.addEventListener('click', () => {
    window.location.reload();
})

