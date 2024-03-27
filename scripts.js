const game = document.querySelector(".game")
let sideLength = 16;
const gameSize = 500;
let isRainbow = false
let isOpaque = true
game.style.width = `${gameSize}px`;
game.style.height = `${gameSize}px`;

const sliderContainer = document.querySelector("#slider-container");
const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#slider-value");

sliderValue.textContent = `${slider.value} x ${slider.value}   Resolution`;

function removeGridCells(){
    while(game.firstChild) {
        game.removeChild(game.firstChild);
    }
}
function randomRGB(){
    let x = Math.floor(Math.random() * 255);
    return x.toString() 
}
function randomColour() {
    return `rgb(${randomRGB()},${randomRGB()},${randomRGB()})`
}
function changeBackgroundColor() {
    this.dataset.opacity = Math.min(1, parseFloat(this.dataset.opacity) + 0.1);

    if (isRainbow == false) {
        this.style.backgroundColor = "black";}
    else {
        this.style.backgroundColor = randomColour()
    }

    if (isOpaque == false) {
        this.style.opacity = 1;}
    else {
        this.style.opacity = this.dataset.opacity;
    }
    
}
function createGrid(sideLength){
    const numOfGrids = (sideLength * sideLength);
    const widthAndHeight = `${(gameSize / sideLength)-2}px`
    for (let i = 0; i < (numOfGrids); i++) {
        const gridCell = document.createElement("div");

        gridCell.style.width = widthAndHeight
        gridCell.style.height = widthAndHeight
        gridCell.classList.add("cell")

        game.appendChild(gridCell);
        gridCell.dataset.opacity = 0
        gridCell.addEventListener("mouseover", changeBackgroundColor);
        
    }
}

slider.oninput = function () {
    let txt = `${this.value} X ${this.value} (Resolution)`
    sliderValue.innerHTML = txt;
    removeGridCells();
    sideLength = this.value;
    createGrid(this.value);
}

reset = document.querySelector(".reset");
reset.style.boxShadow = "3px 3px gray"
reset.addEventListener("click", function() {
    removeGridCells();
    createGrid(sideLength);})

rainbow = document.querySelector(".rainbow");
rainbow.style.boxShadow = "3px 3px gray"
rainbow.addEventListener("click", function() {
    if (isRainbow == false) {
        isRainbow = true
        rainbow.textContent = "Rainbow ON"
        rainbow.style.boxShadow = "none"
    }
    else {
        isRainbow = false
        rainbow.textContent = "Rainbow OFF"
        rainbow.style.boxShadow = "3px 3px gray"
    }
})

opaque = document.querySelector(".shade");
opaque.addEventListener("click", function() {
    // removeGridCells();
    // createGrid(sideLength);
    if (isOpaque == false) {
        isOpaque = true;
        opaque.textContent = "Shading ON";
        opaque.style.boxShadow = "none"

    }
    else {
        isOpaque = false;
        opaque.textContent = "Shading Off";
        opaque.style.boxShadow = "3px 3px gray"
    }});



createGrid(sideLength);
