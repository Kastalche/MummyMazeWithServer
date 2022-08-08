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
}
