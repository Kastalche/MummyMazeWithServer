import { Character } from "./Character";
import { CharacterMovement } from "./CharacterMovement";
import { GridManager } from "./GridManager";

export class GameManager {
  public characters: Array<Character>;
  public characterMovement: CharacterMovement;
  public gridManager: GridManager;

  public AddCharacters(): void {
    this.characters.push(
      new Character(this.gridManager.tiles[3][5], true, true)
    );

    this.characters.push(
      new Character(this.gridManager.tiles[1][2], false, false)
    );
  }
}
