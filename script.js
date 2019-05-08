let drawCell = function (leftTopCornerX, leftTopCornerY, size = 2, ctx = window.ctx) {
    ctx.fillStyle = "#000000";
    ctx.fillRect(leftTopCornerX, leftTopCornerY, size, size);
};

let drawEmpty = function (leftTopCornerX, leftTopCornerY, size = 2, ctx = window.ctx) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(leftTopCornerX, leftTopCornerY, size, size);
};

let mapArrToCanvas = function (pos) {
    return window.gridSize * pos;
};

var seed = 1353456;
function myRandom() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

let drawGrid = function (size, width = canvas.width, height = canvas.height) {
    for (let x = size; x < width; x += size) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
    }

    for (let y = size; y < height; y += size) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);

    }

    ctx.strokeStyle = 'grey';
    ctx.stroke();
};

let generateRandomCellArr = function (arr, probabilityOfOccupied) {


    for (i = 0; i < arr.length; i++) {
        for(j = 0;j<arr[i].length; j++){
            if (Math.random()< probabilityOfOccupied) {
                arr[i][j] = 1;
                drawCell(mapArrToCanvas(j), mapArrToCanvas(i), window.gridSize);
            } else {
                arr[i][j] = 0;
                drawEmpty(mapArrToCanvas(j), mapArrToCanvas(i), window.gridSize);
            }
        }
    }
};

let convertRuleToBinAndReverse = function (rule = 30) {
    let binaryRule = Number(rule).toString(2);
    let binaryRuleReversed = binaryRule.split("").reverse().join("");
    while (binaryRuleReversed.length < 8) binaryRuleReversed += "0";
    return binaryRuleReversed;
}

let getNewCellState = function (cellIndex, rule = 30) {
    let ruleBin = convertRuleToBinAndReverse(rule);


    let cellB = CellArr[currentTime][cellIndex];
    let cellA = CellArr[currentTime][cellIndex - 1],
        cellC = CellArr[currentTime][cellIndex + 1];

    if (window.periodity) {
        if (cellIndex == 0) cellA = CellArr[currentTime][CellArr[currentTime].length - 1];
        if (cellIndex == CellArr[currentTime].length - 1) cellC = CellArr[currentTime][CellArr[currentTime][0]];
    } else {
        if (cellIndex == 0) cellA = 0;
        if (cellIndex == CellArr[currentTime].length - 1) cellC = 0;
    }

    let neightboursVal = parseInt(String(cellA) + String(cellB) + String(cellC), 2);

    return ruleBin[neightboursVal];
};


let drawThisCellArr = function (arr) {
    for (i = 0; i < arr.length; i++) {
        for(j = 0;j<arr[i].length; j++){
            if (Math.random()< probabilityOfOccupied) {
                arr[i][j] = 1;
                drawCell(mapArrToCanvas(j), mapArrToCanvas(i), window.gridSize);
            } else {
                arr[i][j] = 0;
                drawEmpty(mapArrToCanvas(j), mapArrToCanvas(i), window.gridSize);
            }
        }
    }
};

let startCellAutomaton = function () {
    window.HCells = document.getElementById("HCells").valueAsNumber;
    window.WCells = document.getElementById("WCells").valueAsNumber;
    window.occupiedProbability = document.getElementById("occupiedProbability").valueAsNumber / 100;
    window.rule = document.getElementById("rule").options[document.getElementById("rule").selectedIndex].value;
    window.periodity = document.getElementById("peroid").checked;


    for (i = 0; i < HCells; i++){ //FILL WITH ZEROS ALL 2D SPACE;
        window.NextCellArr[i] = [];
        console.log( window.NextCellArr);
        for(j = 0;j< WCells;j++){
            if(ThisCellArr[i][j]==1){
                if(getNeighbourCount(i,j)>3||getNeighbourCount(i,j)<2){
                    window.NextCellArr[i][j] = 0;
                }else{
                    window.NextCellArr[i][j] = 1;
                }

            }else{
                if(getNeighbourCount(i,j)==3){
                    window.NextCellArr[i][j] = 1;
                }else{
                    window. window.NextCellArr[i][j] = 0;
                }
            }
        }
    }

    drawThisCellArr( window.NextCellArr);

    drawGrid()
};

const mod = (x, n) => (x % n + n) % n; //modulo func for negative nbs;

let getNeighbourCount = function(cellX,cellY){
    let cells = [[[]]];


    if (window.periodity) {
        let neigbours = 0;
        for (i = -1; i <= 1; i++) {
            cells[i + 1] = [[]];
            for (j = -1; j <= 1; j++) {
                cells[i + 1][j + 1] = [];
                cells[i + 1][j + 1][0] = mod((cellX + i), 55);
                cells[i + 1][j + 1][1] = mod((cellX + j), 55);
                console.log((cellX + i) % 55);
                if (ThisCellArr[cells[i + 1][j + 1][0]][cells[i + 1][j + 1][1]] == 1 && (i != 0 || j != 0)) {
                    ++neigbours;
                }
            }
        }
        console.log("X:" + cellX + "Y:" + cellY + "Nbours:" + neigbours);
    }else{
        let neigbours = 0;
        for (i = -1; i <= 1; i++) {
            cells[i + 1] = [[]];
            for (j = -1; j <= 1; j++) {
                cells[i + 1][j + 1] = [];
                cells[i + 1][j + 1][0] = mod((cellX + i), 55);
                cells[i + 1][j + 1][1] = mod((cellX + j), 55);
                console.log((cellX + i) % 55);
                if (ThisCellArr[cells[i + 1][j + 1][0]][cells[i + 1][j + 1][1]] == 1 && (i != 0 || j != 0)) {
                    ++neigbours;
                }
            }
        }
        console.log("X:" + cellX + "Y:" + cellY + "Nbours:" + neigbours);
    }

};

let init = function () {
    window.canvas = document.getElementById("workingCanvas");
    window.ctx = canvas.getContext("2d");
    window.ThisCellArr = [[]];
    window.NextCellArr = [[]];
    window.HCells = document.getElementById("HCells").valueAsNumber;
    window.WCells = document.getElementById("WCells").valueAsNumber;

    window.canvas.width = window.innerWidth - 40;
    window.currentTime = 0;
    window.occupiedProbability = document.getElementById("occupiedProbability").valueAsNumber / 100;
    window.rule = document.getElementById("rule").options[document.getElementById("rule").selectedIndex].value;
    window.periodity = document.getElementById("peroid").checked;


    for (i = 0; i < HCells; i++){ //FILL WITH ZEROS ALL 2D SPACE;
        ThisCellArr[i]= [];
        for(j = 0;j< WCells;j++){
            ThisCellArr[i][j] = 0;
        }
    }
    console.log(ThisCellArr);

    window.gridSize = (canvas.width) / ThisCellArr[0].length;
    window.canvas.height = HCells * window.gridSize;



    generateRandomCellArr(window.ThisCellArr, window.occupiedProbability);



    drawGrid(window.gridSize);
};

document.addEventListener("DOMContentLoaded", function () {
    window.debugVars = init();
    document.getElementById("workingCanvas").addEventListener('click', function (event) {

            let xClickedCell = Math.floor(getCursorPosition(canvas, event)[0] / window.gridSize);
            let yClickedCell = Math.floor(getCursorPosition(canvas, event)[1] / window.gridSize);

            if (ThisCellArr[xClickedCell][yClickedCell] == 1) ThisCellArr[xClickedCell][yClickedCell] = 0;
            else ThisCellArr[xClickedCell][yClickedCell] = 1;


            if (ThisCellArr[xClickedCell][yClickedCell] == 1)
                drawCell(mapArrToCanvas(xClickedCell), mapArrToCanvas(yClickedCell), window.gridSize);
            else {
                drawEmpty(mapArrToCanvas(xClickedCell), mapArrToCanvas(yClickedCell), window.gridSize);
            }

        getNeighbourCount(0,0);

    }, false);
});

function getCursorPosition(canvas, event) {
    var x, y;

    let canoffset = canvas.getBoundingClientRect();
    x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(canoffset.left);
    y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor((canoffset.top)) + 1;

    return [x, y];
}
