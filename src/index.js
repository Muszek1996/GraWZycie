import {Cell} from "./Cell"
import {Board} from "./Board"

window.start = function () {
    window.xCells = document.getElementById("xCells").valueAsNumber;
    window.yCells = document.getElementById("yCells").valueAsNumber;
    window.gridSize = (window.innerWidth-35)/xCells;
    window.canvas = document.getElementById("workingCanvas");
    window.ctx = canvas.getContext("2d");
    window.canvas.width = xCells *  window.gridSize;
    window.canvas.height = yCells *  window.gridSize;
    window.setPeroidity();
    window.speed = 1000/document.getElementById("speedMultiplier").valueAsNumber ;

    window.board = new Board(window.xCells,window.yCells, window.gridSize);

    board.drawGrid();
};

window.setPeroidity = function(){
    window.periodity = document.getElementById("peroid").checked;
};
var game;

window.run = function(){
    if(!game){
        game = setInterval(()=>{
            window.board.cellsArray = window.board.cellsArray.map((line, yIndex) => line.map((cell, xIndex) => new Cell(xIndex, yIndex, cell.nextTourValue())));
            window.board.cellsArray.forEach(line=>line.forEach(cell=>cell.drawCell()));
            board.drawGrid()
        },1000/document.getElementById("speedMultiplier").valueAsNumber);
        document.getElementById("startBtn").textContent = "STOP";
    }else{
        clearInterval(game);
        game = null;
        document.getElementById("startBtn").textContent = "Start";
    }


};

window.initState = function(i,j){
    let type = document.getElementById("InitState").options[document.getElementById("InitState").selectedIndex].value;

    if(i!=null&&j!=null)
    switch(type){
        case "niezmienny":{
            window.board.cellsArray[i][j+1].click();
            window.board.cellsArray[i][j+2].click();
            window.board.cellsArray[i+1][j].click();
            window.board.cellsArray[i+1][j+3].click();
            window.board.cellsArray[i+2][j+1].click();
            window.board.cellsArray[i+2][j+2].click();
        }
        break;
        case "oscy":{
            window.board.cellsArray[i][j+1].click();
            window.board.cellsArray[i][j+2].click();
            window.board.cellsArray[i][j+3].click();
        }
        break;
        case "glider":{
            window.board.cellsArray[i][j+1].click();
            window.board.cellsArray[i][j+2].click();
            window.board.cellsArray[i+1][j].click();
            window.board.cellsArray[i+1][j+1].click();
            window.board.cellsArray[i+2][j+2].click();
        }
        break;
        case "rand":{
            for(let k = i;k<i+10;k++){
                for(let l = j;l<j+10;l++) {
                    if(Math.floor(Math.random()*2))
                    window.board.cellsArray[k][l].click();
                }
            }
        }
        break;
        case "cell":{
            window.board.cellsArray[i][j].click();
        }
    }

}


document.addEventListener("DOMContentLoaded", function () {
    start();
    document.getElementById("workingCanvas").addEventListener('click', function (event) {

        let xClickIndex = Math.floor(getCursorPosition(window.canvas, event)[0] / window.gridSize);
        let yClickIndex = Math.floor(getCursorPosition(window.canvas, event)[1] / window.gridSize);
        // console.log(`x:${xClickIndex} y:${yClickIndex}`);
        // console.log(window.board.cellsArray);


        //window.board.cellsArray[yClickIndex][xClickIndex].click().getNeighbourCount();
        initState(yClickIndex,xClickIndex);
    }, false);
});

function getCursorPosition(canvas, event) {
    var x, y;

    let canoffset = canvas.getBoundingClientRect();
    x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(canoffset.left);
    y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor((canoffset.top)) + 1;

    return [x, y];
}

