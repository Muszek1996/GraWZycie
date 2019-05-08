export class Cell{

    constructor(x,y,val){
        this.x = x;
        this.y = y;
        this.val = val;
        this.setColor();
    }

    toString(){
        return this.val;
    }

    setColor(){
        if(this.val == 1){
            this.color = "#000000";
        }else{
            this.color = "#ffffff"
        }
    }

    click(){
        this.val = !this.val;
        this.setColor();
        this.drawCell();
        return this;
    }

    drawCell(size = window.gridSize, ctx = window.ctx) {
        // console.log(this);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x*size, this.y*size, size, size);
        return this;
    };

    nextTourValue(){
        if(this.val==1){
            if(this.getNeighbourCount()>3||this.getNeighbourCount()<2){
                return 0;
            }else{
               return 1;
            }

        }else{
            if(this.getNeighbourCount()==3){
                return 1;
            }else{
                return 0;
            }
        }
    }


    getNeighbourCount(){
        const mod = (x, n) => (x % n + n) % n; //modulo func for negative nbs;
        let cells = [[[]]];
        var neigbours = 0;

        if (window.periodity) {
            neigbours = 0;
            for (let i = -1; i <= 1; i++) {
                cells[i + 1] = [[]];
                for (let j = -1; j <= 1; j++) {
                    cells[i + 1][j + 1] = [];
                    cells[i + 1][j + 1][0] = mod((this.y + i), window.yCells);
                    cells[i + 1][j + 1][1] = mod((this.x + j), window.xCells);

                    if (window.board.cellsArray[cells[i + 1][j + 1][0]][cells[i + 1][j + 1][1]].val == 1 && (i != 0 || j != 0)) {
                        ++neigbours;
                    }
                }
            }
            // console.log(cells);
            // console.log("X:" + this.x + "Y:" + this.y + "Nbours:" + neigbours);
        }else{
            neigbours = 0;
            for (let i = -1; i <= 1; i++) {
                cells[i + 1] = [[]];
                for (let j = -1; j <= 1; j++) {
                    cells[i + 1][j + 1] = [];
                    cells[i + 1][j + 1][0] = this.y + i;
                    cells[i + 1][j + 1][1] = this.x + j;
                    if (cells[i + 1][j + 1][0]>-1&&cells[i + 1][j + 1][1]>-1&&cells[i + 1][j + 1][0]<window.yCells&&cells[i + 1][j + 1][1]<window.xCells&& window.board.cellsArray[cells[i + 1][j + 1][0]][cells[i + 1][j + 1][1]].val == 1 && (i != 0 || j != 0)) {
                        ++neigbours;
                    }
                }
            }
            // console.log(cells);
            // console.log("X:" + this.x + "Y:" + this.y + "!peroidityNbours:" + neigbours);
        }
      return neigbours;
    };

}


