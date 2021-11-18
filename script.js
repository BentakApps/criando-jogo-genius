let order = [];
let clickedOrder = [];
let score = 0;
let duration = 1000;
let isGameOver = true;

const sounds = ['D3','E3','F3','G3'];

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');
const scoreElement = document.querySelector('#score');

//Cria ordem aleatória de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random()*4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        lightColor(order, i);
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
    if(clickedOrder.length == order.length && !isGameOver) {
        nextLevel();
    }
}

//Captura clique
let click = (color) => {
    playTone(sounds[color],'sine',duration/1000);
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    checkOrder();
    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
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
    scoreElement.innerHTML = `Score: ${score}`;
    scoreElement.classList.add('blink');
    setTimeout(()=>scoreElement.classList.remove('blink'), 1000);
    duration = duration * .9;
    setTimeout(() => shuffleOrder(), duration);
}

//Game over
let gameOver = () => {
    scoreElement.innerHTML = `GAME OVER\nScore: ${score}\nSTART`;
    isGameOver = true;
    "START";
}

//Inicio do jogo
let playGame = () => {
    if(isGameOver){
        isGameOver = false;
        order = [];
        clickedOrder = [];
        score = 0;
        scoreElement.innerHTML = `Score: ${score}`;
        duration = 1000;
        shuffleOrder();
    }
}

//Eventos de clique
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);
