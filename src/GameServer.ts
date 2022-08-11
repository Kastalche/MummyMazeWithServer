import { BattleController } from "./BattleContoller";
import { Character } from "./Character";
import { CharacterMovement } from "./CharacterMovement";
import { GridManager } from "./GridManager";
import { IStateController } from "./IStateController";
import { StartController } from "./StartContoller";
import { EndController } from "./EndController";

enum GameModes {
  SinglePlayer,
  Multiplayer,
}
enum GameStates {
  StartState,
  BattleState,
  EndState,
}

export class GameServer {
  public characters: Array<Character>;
  public characterMovement: CharacterMovement;
  public gridManager: GridManager;

  public mode: GameModes;
  public state: IStateController;

  constructor(characters: Array<Character>, mode: GameModes) {
    this.characters = characters;
    this.mode = mode;
  }

  public AddCharacters(): void {
    switch (this.mode) {
      case GameModes.SinglePlayer:
        this.characters.push(
          new Character(this.gridManager.tiles[3][5], true, true)
        );

        this.characters.push(
          new Character(this.gridManager.tiles[1][2], false, false)
        );
        break;
      case GameModes.Multiplayer:
        this.characters.push(
          new Character(this.gridManager.tiles[3][5], true, true)
        );
        this.characters.push(
          new Character(this.gridManager.tiles[1][2], false, false)
        );
        this.characters.push(
          new Character(this.gridManager.tiles[1][4], false, false)
        );
    }
  }

  public Transition(newState: GameStates): void {
    this.state.Destroy();
    switch (newState) {
      case GameStates.StartState:
        this.state = new StartController(this);
        break;

      case GameStates.BattleState:
        this.state = new BattleController();
        break;

      case GameStates.EndState:
        this.state = new EndController();
        break;

      default:
        break;
    }
    this.state.Start();
  }
}
