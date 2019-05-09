"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Board = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Cell = require("./Cell.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
    function Board(xCells, yCells) {
        var cellSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.gridSize;

        _classCallCheck(this, Board);

        this.xCells = xCells;
        this.yCells = yCells;
        this.cellSize = cellSize;
        this.cellsArray = Array(yCells).fill(0).map(function (line, yIndex) {
            return Array(xCells).fill(0).map(function (cell, xIndex) {
                return new _Cell.Cell(xIndex, yIndex, 0, "#FFFFFF");
            });
        });

        // console.log(this.cellsArray);
    }

    _createClass(Board, [{
        key: "drawGrid",
        value: function drawGrid() {
            var _this = this;

            var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.canvas.width;
            var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.canvas.height;

            this.cellsArray.forEach(function (line, yCells) {
                var y = yCells * _this.cellSize;
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
            });

            this.cellsArray[0].forEach(function (column, xCells) {
                var x = xCells * _this.cellSize;
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
            });
            ctx.strokeStyle = 'grey';
            ctx.stroke();
        }
    }]);

    return Board;
}();