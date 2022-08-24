import { Tile } from "./Tile";

export class GridManager {
    tiles: Tile[][];
    private width: number = 6;
    private height: number = 6;

    public GenerateGrid(): void {
        this.tiles = [];

        for (var i: number = 0; i < this.width; i++) {
            this.tiles[i] = [];
            for (var j: number = 0; j < this.height; j++) {
                this.tiles[i][j] = new Tile(i, j);
            }
        }
    }

    public AddObstacles(x: number, y: number, obstacle: number): void {
        this.tiles[x][y].obstacles.push(obstacle);
    }

    public GenerateObstacles(): void {
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
    }
}
