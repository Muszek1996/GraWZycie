import {Cell} from "./Cell.js"

export class Board{

    constructor(xCells,yCells,cellSize = window.gridSize){
        this.xCells = xCells;
        this.yCells = yCells;
        this.cellSize = cellSize;
        this.cellsArray = Array(yCells).fill(0).map((line,yIndex) => Array(xCells).fill(0).map((cell,xIndex)=>new Cell(xIndex,yIndex,0,"#FFFFFF")));

        // console.log(this.cellsArray);
    }

    drawGrid(width = window.canvas.width, height = window.canvas.height) {
        this.cellsArray.forEach((line,yCells)=>{
            let y = yCells*this.cellSize;
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
        });

        this.cellsArray[0].forEach((column,xCells)=>{
            let x = xCells*this.cellSize;
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
        });
        ctx.strokeStyle = 'grey';
        ctx.stroke();
    };
}

