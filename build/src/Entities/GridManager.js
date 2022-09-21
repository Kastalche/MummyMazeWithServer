"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridManager = void 0;
var Tile_1 = require("./Tile");
var GridManager = /** @class */ (function () {
    function GridManager() {
        this.width = 6;
        this.height = 6;
    }
    GridManager.prototype.GenerateGrid = function () {
        this.tiles = [];
        for (var i = 0; i < this.width; i++) {
            this.tiles[i] = [];
            for (var j = 0; j < this.height; j++) {
                this.tiles[i][j] = new Tile_1.Tile(i, j);
            }
        }
        return this.tiles;
    };
    GridManager.prototype.AddObstacles = function (x, y, obstacle) {
        this.tiles[x][y].obstacles.push(obstacle);
    };
    GridManager.prototype.GenerateObstacles = function () {
        this.AddObstacles;
        this.AddObstacles(1, 5, 4);
        this.AddObstacles(1, 4, 2);
        this.AddObstacles(1, 4, 4);
        this.AddObstacles(1, 3, 2);
        this.AddObstacles(1, 3, 3);
        this.AddObstacles(2, 3, 1);
        this.AddObstacles(3, 4, 3);
        this.AddObstacles(3, 3, 3);
        this.AddObstacles(3, 3, 4);
        this.AddObstacles(3, 2, 2);
        this.AddObstacles(4, 4, 1);
        this.AddObstacles(4, 3, 1);
        this.AddObstacles(4, 2, 3);
        this.AddObstacles(4, 2, 3);
        this.AddObstacles(5, 4, 4);
        this.AddObstacles(5, 3, 2);
        this.AddObstacles(5, 2, 1);
    };
    return GridManager;
}());
exports.GridManager = GridManager;
