import { IStateController } from "./IStateController";
import { GameServer, GameStates } from "./GameServer";

export class StartController implements IStateController {
  public server: GameServer;

  constructor(server: GameServer) {
    this.server = server;
  }

  Start(): void {
    this.CharactersToStartPosition();
    this.server.Transition(GameStates.BattleState);
  }

  Destroy(): void {}

  CharactersToStartPosition(): void {
    this.server.characters.forEach((character) => {
      character.GoToStartPosition();
    });
  }
}
