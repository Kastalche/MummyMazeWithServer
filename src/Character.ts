import { Tile } from "./Tile";
export class Character {
  id: number;
  startPosition: Tile;
  currentPosition: Tile;
  isMummy: boolean;
  isBot: boolean;
  GoToStartPosition(): void {
    this.currentPosition = this.startPosition;
  }
}
