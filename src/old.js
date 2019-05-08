import Cell from "./Cell";

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

    arr.forEach((line,yIndex)=>{
        line.forEach((cell,xIndex)=>{

        })
    });

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

let start = function(){
    let WCells = document.getElementById("WCells").valueAsNumber;
    let HCells = document.getElementById("HCells").valueAsNumber;
    let occupiedProbability = document.getElementById("occupiedProbability").valueAsNumber / 100;
    let periodity = document.getElementById("peroid").checked;




}



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

        }
    }

    drawThisCellArr( window.NextCellArr);

    drawGrid()
};





let init = function () {
    window.canvas = document.getElementById("workingCanvas");
    window.ctx = canvas.getContext("2d");
    window.ThisCellArr = [[]];
    window.NextCellArr = [[]];
    window.HCells = document.getElementById("HCells").valueAsNumber;
    window.WCells = document.getElementById("WCells").valueAsNumber;

    window.canvas.width = window.innerWidth - 40;
    window.canvas.height = HCells * window.gridSize;
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


