const ROWS = 2;
const COLS = 2;
const grid = document.querySelector('#grid');
const styles = ["game__cell--green", "game__cell--red", "game__cell--yellow", "game__cell--blue"]
var sequence = []
var userSequence = []
var actLevel = 1
var score = 0
var win = false
var isPlaying = false
var isSequence = false
var playerName = ''
const cells = [];
const openRank = document.querySelector('#view__rank');
const closeRank = document.querySelector('#rank__close');
const rankBox = document.querySelector('#rank__box');
const rank = document.getElementById('rank');
const tbodyElement = document.querySelector('tbody');

const actionbutton = document.querySelector('#actionbutton');

const nameBox = document.querySelector('#name__box');
const nameInput = document.getElementById('name__input');
const savedName = document.querySelector('#saved__name');

// Función para preparar la tabla
function prepareGrid() {
  
    for (let i = 0; i < ROWS * COLS; i++) {
      const cell = document.createElement('div');
      cell.classList.add(styles[i]);
      cells.push(cell);
      grid.appendChild(cell);
    }
}
/*
// Testing function
function clearLocalStorage() {
    localStorage.clear();
    alert('Datos borrados!');
    tbodyElement.innerHTML = '';
    getHighestScore(); 
}

clearLocalStorage()*/

prepareGrid()
loadRank()
getHighestScore()

const green = cells[0];
const red = cells[1];
const yellow = cells[2];
const blue = cells[3];




console.log(cells)

// Generar un número al azar
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Agregar un color a la secuencia actual
function addColor(){
    target = getRandomNumber(0, 3)
    console.log(cells[target])
    sequence.push(cells[target])
    return target
}

// Botones

function greenClickHandler() {
    if (isPlaying && !isSequence) {
        playSound("green_sound");
        green.className = "game__cell--green_active";
        setTimeout(() => {
            green.className = "game__cell--green";
        }, 100);
        userSequence.push(green);
        if (!validSequence()) {
            gameLost();
        }
    }
}

function blueClickHandler() {
    if (isPlaying && !isSequence) {
        playSound("blue_sound");
        blue.className = "game__cell--blue_active";
        setTimeout(() => {
            blue.className = "game__cell--blue";
        }, 100);
        userSequence.push(blue);
        if (!validSequence()) {
            gameLost();
        }
    }
}

function redClickHandler() {
    if (isPlaying && !isSequence) {
        playSound("red_sound");
        red.className = "game__cell--red_active";
        setTimeout(() => {
            red.className = "game__cell--red";
        }, 100);
        userSequence.push(red);
        if (!validSequence()) {
            gameLost();
        }
    }
}

function yellowClickHandler() {
    if (isPlaying && !isSequence) {
        playSound("yellow_sound");
        yellow.className = "game__cell--yellow_active";
        setTimeout(() => {
            yellow.className = "game__cell--yellow";
        }, 100);
        userSequence.push(yellow);
        if (!validSequence()) {
            gameLost();
        }
    }
}

openRank.addEventListener('click', () => {
    rankBox.classList.add('open');
    }
)

closeRank.addEventListener('click', () => {
    rankBox.classList.remove('open');
    }
)

function enableButtons() {
    green.addEventListener('click', greenClickHandler);
    blue.addEventListener('click', blueClickHandler);
    red.addEventListener('click', redClickHandler);
    yellow.addEventListener('click', yellowClickHandler);
}

function disableButtons() {
    green.removeEventListener('click', greenClickHandler);
    blue.removeEventListener('click', blueClickHandler);
    red.removeEventListener('click', redClickHandler);
    yellow.removeEventListener('click', yellowClickHandler);
}

function lightUpSequence (i){

    disableButtons()
    setTimeout(()=>{

        if (cells[0]== sequence[i]){
            playSound("green_sound")
            console.log("verde")
            green.className = "game__cell--green_active"
            setTimeout( () => {
                green.className = "game__cell--green"
            }, 450)
        }
        if (cells[1]== sequence[i]) {
            playSound("red_sound")
            console.log("rojo")
            red.className = "game__cell--red_active"
            setTimeout( () => {
                red.className = "game__cell--red"
            }, 450)
        } 
        if (cells[2]== sequence[i]) {
            playSound("yellow_sound")
            console.log("amarillo")
            yellow.className = "game__cell--yellow_active"
            setTimeout( () => {
                yellow.className = "game__cell--yellow"
            }, 450)
        }
        if (cells[3]== sequence[i]) {
            playSound("blue_sound")
            console.log("azul")
            blue.className = "game__cell--blue_active"
            setTimeout( () => {
                blue.className = "game__cell--blue"
            }, 450)
    }
    i++;
        

    if (i < sequence.length ){
        lightUpSequence(i)
    } else {
        enableButtons()
        return
    }

    }, 700)
}

// Función para mostrar la secuencia actual
function showSequence(){
    var i = 0
    isSequence = true
    lightUpSequence(i)
    i = 0
    isSequence = false
}

// Función para ingresar al siguiente nivel/aumentar dificultad de la secuencia
function nextLevel(){
    console.log("next level")
    playSound("next_level")
    userSequence = []
    addColor()
    showSequence()
    
    const level = document.querySelector("#level")
    level.textContent = actLevel+=1
}

function updateScore(score) {
    const element = document.querySelector("#current__score")
    element.textContent = score
}

// Funcion para validar secuencia introducida por el usuario
function validSequence(){
    if (userSequence.length < sequence.length) {
        if (userSequence[userSequence.length-1] == sequence[userSequence.length-1]) {
            return true
        } else {
            return false
        }
    } else {
        if (userSequence[userSequence.length-1] == sequence[userSequence.length-1]){
            score+=1
            updateScore(score)
            setTimeout(() => {}, 5000)
            nextLevel()
            return true
        } else {
            return false
        }
    }
}

// Función para iniciar el juego
function startGame(){
    console.log("jugando")
    nameBox.classList.add('open');
    savedName.addEventListener('click', inputName);
}

function finishGame(){
    console.log("perdiste")
    userSequence = []
    sequence = []
    isPlaying = false
    isSequence = false
    disableButtons()
    addToRank(playerName, score)
    saveRank()
    score = 0
    updateScore(score)
    level.textContent = 0
    actLevel = 1
    getHighestScore()
}

document.querySelector('#play__button').addEventListener('click', () => {
    if (!isPlaying){
        startGame();
    }
});

document.querySelector('#reset__button').addEventListener('click', () => {
    if (isPlaying){
        score = 0
        updateScore(score)
        userSequence = []
        sequence = []
        isPlaying = false
        isSequence = false
        playerName = ''
        actLevel = 1
        updateScore(0)
        setName(playerName)
        setLevel(actLevel)
        alert("Juego Reiniciado!");
        playSound("reset_game")
        }
    }
);

// Local Storage

savedName.addEventListener('click', () => {
    nameBox.classList.remove('open');
});

function validName(name){
    return name == ""
}

// Se queda pegado en el input
function inputName(){
    const name = nameInput.value.trim();
    if (validName(name)) {
        alert("Debe introducir un nombre válido!");
    } else {
        isPlaying = true;
        playerName = name;
        setName(name);
        if (playerName != '' && playerName != null){
            console.log('skibidi');
            nameBox.classList.remove('open');
            isPlaying = true;
            setLevel(actLevel)
            addColor();
            showSequence();
        }
    }
    
}

function setLevel(newLevel){
    const setLevel = document.querySelector("#level")
    setLevel.textContent = newLevel
}

function setName (newName){
    playerName = newName
    const actPlayerName = document.querySelector("#act__player__name");
    actPlayerName.textContent = newName;
}
function addToRank(name, score){
    console.log('fak ldier')
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const scoreCell = document.createElement('td');
    nameCell.textContent = name;
    scoreCell.textContent = score;
    row.appendChild(nameCell);
    row.appendChild(scoreCell);
    tbodyElement.appendChild(row);
}

function saveRank(){
    let ranking = []
    tbodyElement.querySelectorAll('tr').forEach(function(row) {
        let rowData = [];
        row.querySelectorAll('td').forEach(function(cell) {
            rowData.push(cell.textContent);
        });
        ranking.push(rowData);
    });

    localStorage.setItem('rank', JSON.stringify(ranking));
}

function loadRank() {
    const rankList = JSON.parse(localStorage.getItem('rank'));
    if (rankList && Array.isArray(rankList)) {
        rankList.forEach(function(rowData) {
            if (Array.isArray(rowData)) {
                const row = document.createElement('tr');
                rowData.forEach(function(cellData) {
                    const cell = document.createElement('td');
                    cell.textContent = cellData;
                    row.appendChild(cell);
                });
                tbodyElement.appendChild(row);
            }
        });
    }
}

function gameLost(){
    playSound("game_lost")
    alert("Perdiste!");
    finishGame()
}

function playSound(name){
    var x = document.getElementById(name)
    x.play()
}

function getHighestScore(){

    let highestScore = 0;
    tbodyElement.querySelectorAll('tr').forEach(function(row) {
        const scoreCell = row.querySelectorAll('td')[1]; // Assuming the score is in the second cell
        const score = parseInt(scoreCell.textContent, 10);
        if (score > highestScore) {
            highestScore = score;
        }
    });
    
    const element = document.querySelector("#highest__score")
    element.textContent = highestScore
}
