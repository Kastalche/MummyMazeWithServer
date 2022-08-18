import { IStateController } from "./IStateController";
import { GameServer } from "./GameServer";

export class StartController implements IStateController {
  public gameManager: GameServer;

  constructor(gm: GameServer) {
    // gm=GameManager
  }

  Start(): void {}
  Destroy(): void {}

  CharactersToStartPosition(): void {
    this.gameManager.characters.forEach((character) => {
      character.GoToStartPosition();
    });
  }
}
