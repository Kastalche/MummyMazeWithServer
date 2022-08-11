import { Tile } from "./Tile";
export class Character {
  id: number;
  startPosition: Tile;
  currentPosition: Tile;
  isMummy: boolean;
  isBot: boolean;

  constructor(startPosition: Tile, isMummy: boolean, isBot: boolean) {
    this.startPosition = startPosition;
    this.isBot = isBot;
    this.isMummy = isMummy;
  }

  GoToStartPosition(): void {
    this.currentPosition = this.startPosition;
  }
}
