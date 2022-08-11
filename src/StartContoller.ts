import { IStateController } from "./IStateController";
import { GameManager } from "./GameManager";
export class StartController implements IStateController {
  Start() {}
  Destroy(): void {}
  CharactersToStartPosition(): void {
    GameManager.characters.forEach((element) => {
      element.GoToStartPosition();
    });
  }
}
