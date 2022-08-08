import { Tile } from "./Tile";
export class GridManager {
  tiles: [Tile, Tile];
  width: 6;
  height: 6;
  GenerateGrid() {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        let spawnedTile = new Tile(x, y);
        //  tiles[x, y].Add(spawnedTile);
      }
    }
  }
}
