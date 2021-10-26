let order = [];
let clickedOrder = [];
let score = 0;
let duration = 1000;

const sounds = ['A3','B3','C3','D3'];

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');

//Cria ordem aleatória de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random()*4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        //let elementColor = createColorElement(order[i]);
        lightColor(order, i);//Number(i) + 1);
    }
}

//Acende a próxima cor
let lightColor = (order, number) => {
    let element = createColorElement(order[number]);

    step = number * duration;

    setTimeout(() => {
        element.classList.add('selected');
        playTone(sounds[order[number]],'sine',duration * .8/1000);
    }, step);
    setTimeout(() => {
        element.classList.remove('selected');
    }, step + duration * .8);
}

//Checa se os botões clicados estão corretos
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        //alert(`Pontuação:  ${score}\nVocê acertou! Iniciando próximo nível!`);
        setTimeout(() => nextLevel(), duration);
    }
}

//Captura clique
let click = (color) => {
    playTone(sounds[color],'sine',duration/1000);
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

//Retorna elemento em função da cor
let createColorElement = (color) => {
    if(color ==0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if(color == 2) {
        return yellow;
    } else if(color == 3) {
        return blue;
    }
}

//Proximo nivel
let nextLevel = () => {
    score++;
    duration = duration * .9;
    shuffleOrder();
}

//Game over
let gameOver = () => {
    alert(`Pontuaçao: ${score}!\nVocê perdeu o jogo!`);
}

//Inicio do jogo
let playGame = () => {
    //alert('Bem vindo ao Genius! Iniciando um novo jogo!');
    order = [];
    clickedOrder = [];
    score = 0;
    duration = 1000;
    nextLevel();
}

//Eventos de clique
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//playGame();