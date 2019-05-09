"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = exports.Cell = function () {
    function Cell(x, y, val) {
        _classCallCheck(this, Cell);

        this.x = x;
        this.y = y;
        this.val = val;
        this.setColor();
    }

    _createClass(Cell, [{
        key: "toString",
        value: function toString() {
            return this.val;
        }
    }, {
        key: "setColor",
        value: function setColor() {
            if (this.val == 1) {
                this.color = "#000000";
            } else {
                this.color = "#ffffff";
            }
        }
    }, {
        key: "click",
        value: function click() {
            this.val = !this.val;
            this.setColor();
            this.drawCell();
            return this;
        }
    }, {
        key: "drawCell",
        value: function drawCell() {
            var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.gridSize;
            var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.ctx;

            // console.log(this);
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x * size, this.y * size, size, size);
            return this;
        }
    }, {
        key: "nextTourValue",
        value: function nextTourValue() {
            if (this.val == 1) {
                if (this.getNeighbourCount() > 3 || this.getNeighbourCount() < 2) {
                    return 0;
                } else {
                    return 1;
                }
            } else {
                if (this.getNeighbourCount() == 3) {
                    return 1;
                } else {
                    return 0;
                }
            }
        }
    }, {
        key: "getNeighbourCount",
        value: function getNeighbourCount() {
            var mod = function mod(x, n) {
                return (x % n + n) % n;
            }; //modulo func for negative nbs;
            var cells = [[[]]];
            var neigbours = 0;

            if (window.periodity) {
                neigbours = 0;
                for (var i = -1; i <= 1; i++) {
                    cells[i + 1] = [[]];
                    for (var j = -1; j <= 1; j++) {
                        cells[i + 1][j + 1] = [];
                        cells[i + 1][j + 1][0] = mod(this.y + i, window.yCells);
                        cells[i + 1][j + 1][1] = mod(this.x + j, window.xCells);

                        if (window.board.cellsArray[cells[i + 1][j + 1][0]][cells[i + 1][j + 1][1]].val == 1 && (i != 0 || j != 0)) {
                            ++neigbours;
                        }
                    }
                }
                // console.log(cells);
                // console.log("X:" + this.x + "Y:" + this.y + "Nbours:" + neigbours);
            } else {
                neigbours = 0;
                for (var _i = -1; _i <= 1; _i++) {
                    cells[_i + 1] = [[]];
                    for (var _j = -1; _j <= 1; _j++) {
                        cells[_i + 1][_j + 1] = [];
                        cells[_i + 1][_j + 1][0] = this.y + _i;
                        cells[_i + 1][_j + 1][1] = this.x + _j;
                        if (cells[_i + 1][_j + 1][0] > -1 && cells[_i + 1][_j + 1][1] > -1 && cells[_i + 1][_j + 1][0] < window.yCells && cells[_i + 1][_j + 1][1] < window.xCells && window.board.cellsArray[cells[_i + 1][_j + 1][0]][cells[_i + 1][_j + 1][1]].val == 1 && (_i != 0 || _j != 0)) {
                            ++neigbours;
                        }
                    }
                }
                // console.log(cells);
                // console.log("X:" + this.x + "Y:" + this.y + "!peroidityNbours:" + neigbours);
            }
            return neigbours;
        }
    }]);

    return Cell;
}();