import { BattleController } from "./States/BattleContoller";
import { Character } from "./Entities/Character";
import { CharacterMovement } from "./Entities/CharacterMovement";
import { GridManager } from "./Entities/GridManager";
import { IStateController } from "./States/IStateController";
import { StartController } from "./States/StartContoller";
import { EndController } from "./States/EndController";
import { SocketCommunication } from "../SocketCommunication";
import { Socket } from "dgram";
import { Game } from "./Game";
import { Player } from "./Player";

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
    Start() {
        throw new Error("Method not implemented.");
    }
    public socketCommunication: SocketCommunication;
    public gamedate: Game;
    public players: Array<Player>;
    public state: IStateController;

    constructor(
        players: Array<Player>,
        socket: SocketCommunication,
        gamedata: Game
    ) {
        this.players = players;
        this.socketCommunication = socket;
        this.gamedate = gamedata;
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
