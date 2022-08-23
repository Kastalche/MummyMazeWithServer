import { Tile } from "./Tile";
export class Character {
  id: number;
  public startPosition: Tile;
  public currentPosition: Tile;
  public isMummy: boolean;
  public isBot: boolean;

  constructor(startPosition: Tile, isMummy: boolean, isBot: boolean) {
    this.startPosition = startPosition;
    this.isBot = isBot;
    this.isMummy = isMummy;
  }

  GoToStartPosition(): void {
    this.currentPosition = this.startPosition;
  }
}
