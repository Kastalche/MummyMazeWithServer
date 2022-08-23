import { BattleController } from "./States/BattleContoller";
import { Character } from "./Entities/Character";
import { CharacterMovement } from "./Entities/CharacterMovement";
import { GridManager } from "./Entities/GridManager";
import { IStateController } from "./States/IStateController";
import { StartController } from "./States/StartContoller";
import { EndController } from "./States/EndController";
import { SocketCommunication } from "../SocketCommunication";
import { Socket } from "dgram";

export enum GameModes {
    SinglePlayer,
    Multiplayer,
}
export enum GameStates {
    StartState,
    BattleState,
    EndState,
}

export class GameServer {
    public socketCommunication: SocketCommunication;

    public mode: GameModes;
    public state: IStateController;

    public characters: Array<Character>;
    public characterMovement: CharacterMovement;
    public gridManager: GridManager;

    constructor(
        characters: Array<Character>,
        mode: GameModes,
        socket: SocketCommunication
    ) {
        this.characters = characters;
        this.mode = mode;
        this.socketCommunication = socket;
    }

    public Transition(newState: GameStates): void {
        this.state.Destroy();

        switch (newState) {
            case GameStates.StartState:
                this.state = new StartController(this);
                break;

            case GameStates.BattleState:
                this.state = new BattleController(this);
                break;

            case GameStates.EndState:
                this.state = new EndController(this);
                break;

            default:
                break;
        }

        this.state.Start();
    }
}
