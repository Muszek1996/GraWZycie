"use strict";

var _Cell = require("./Cell");

var _Cell2 = _interopRequireDefault(_Cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var drawCell = function drawCell(leftTopCornerX, leftTopCornerY) {
    var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
    var ctx = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : window.ctx;

    ctx.fillStyle = "#000000";
    ctx.fillRect(leftTopCornerX, leftTopCornerY, size, size);
};

var drawEmpty = function drawEmpty(leftTopCornerX, leftTopCornerY) {
    var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
    var ctx = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : window.ctx;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(leftTopCornerX, leftTopCornerY, size, size);
};

var mapArrToCanvas = function mapArrToCanvas(pos) {
    return window.gridSize * pos;
};

var drawGrid = function drawGrid(size) {
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : canvas.width;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : canvas.height;

    for (var x = size; x < width; x += size) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
    }

    for (var y = size; y < height; y += size) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
    }

    ctx.strokeStyle = 'grey';
    ctx.stroke();
};

var generateRandomCellArr = function generateRandomCellArr(arr, probabilityOfOccupied) {

    arr.forEach(function (line, yIndex) {
        line.forEach(function (cell, xIndex) {});
    });

    for (i = 0; i < arr.length; i++) {
        for (j = 0; j < arr[i].length; j++) {
            if (Math.random() < probabilityOfOccupied) {
                arr[i][j] = 1;
                drawCell(mapArrToCanvas(j), mapArrToCanvas(i), window.gridSize);
            } else {
                arr[i][j] = 0;
                drawEmpty(mapArrToCanvas(j), mapArrToCanvas(i), window.gridSize);
            }
        }
    }
};

var convertRuleToBinAndReverse = function convertRuleToBinAndReverse() {
    var rule = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;

    var binaryRule = Number(rule).toString(2);
    var binaryRuleReversed = binaryRule.split("").reverse().join("");
    while (binaryRuleReversed.length < 8) {
        binaryRuleReversed += "0";
    }return binaryRuleReversed;
};

var getNewCellState = function getNewCellState(cellIndex) {
    var rule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;

    var ruleBin = convertRuleToBinAndReverse(rule);

    var cellB = CellArr[currentTime][cellIndex];
    var cellA = CellArr[currentTime][cellIndex - 1],
        cellC = CellArr[currentTime][cellIndex + 1];

    if (window.periodity) {
        if (cellIndex == 0) cellA = CellArr[currentTime][CellArr[currentTime].length - 1];
        if (cellIndex == CellArr[currentTime].length - 1) cellC = CellArr[currentTime][CellArr[currentTime][0]];
    } else {
        if (cellIndex == 0) cellA = 0;
        if (cellIndex == CellArr[currentTime].length - 1) cellC = 0;
    }

    var neightboursVal = parseInt(String(cellA) + String(cellB) + String(cellC), 2);

    return ruleBin[neightboursVal];
};

var drawThisCellArr = function drawThisCellArr(arr) {
    for (i = 0; i < arr.length; i++) {
        for (j = 0; j < arr[i].length; j++) {
            if (Math.random() < probabilityOfOccupied) {
                arr[i][j] = 1;
                drawCell(mapArrToCanvas(j), mapArrToCanvas(i), window.gridSize);
            } else {
                arr[i][j] = 0;
                drawEmpty(mapArrToCanvas(j), mapArrToCanvas(i), window.gridSize);
            }
        }
    }
};

var start = function start() {
    var WCells = document.getElementById("WCells").valueAsNumber;
    var HCells = document.getElementById("HCells").valueAsNumber;
    var occupiedProbability = document.getElementById("occupiedProbability").valueAsNumber / 100;
    var periodity = document.getElementById("peroid").checked;
};

var startCellAutomaton = function startCellAutomaton() {
    window.HCells = document.getElementById("HCells").valueAsNumber;
    window.WCells = document.getElementById("WCells").valueAsNumber;
    window.occupiedProbability = document.getElementById("occupiedProbability").valueAsNumber / 100;
    window.rule = document.getElementById("rule").options[document.getElementById("rule").selectedIndex].value;
    window.periodity = document.getElementById("peroid").checked;

    for (i = 0; i < HCells; i++) {
        //FILL WITH ZEROS ALL 2D SPACE;
        window.NextCellArr[i] = [];
        console.log(window.NextCellArr);
        for (j = 0; j < WCells; j++) {}
    }

    drawThisCellArr(window.NextCellArr);

    drawGrid();
};

var init = function init() {
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

    for (i = 0; i < HCells; i++) {
        //FILL WITH ZEROS ALL 2D SPACE;
        ThisCellArr[i] = [];
        for (j = 0; j < WCells; j++) {
            ThisCellArr[i][j] = 0;
        }
    }
    console.log(ThisCellArr);

    window.gridSize = canvas.width / ThisCellArr[0].length;
    window.canvas.height = HCells * window.gridSize;

    generateRandomCellArr(window.ThisCellArr, window.occupiedProbability);

    drawGrid(window.gridSize);
};