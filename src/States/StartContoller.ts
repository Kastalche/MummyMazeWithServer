import { Character } from "../Entities/Character";
import { CharacterMovement } from "../Entities/CharacterMovement";
import { GridManager } from "../Entities/GridManager";
import { Game } from "../Game";
import { GameModes, GameServer, GameStates } from "../GameServer";
import { IStateController } from "./IStateController";

export class StartController implements IStateController {
    private server: GameServer;
    public mode: GameModes;
    public characters: Array<Character>;

    public characterMovement: CharacterMovement;
    public gridManager: GridManager;
    private game: Game;

    constructor(server: GameServer) {
        this.server = server;
    }

    public Start(): void {
        this.game.AddCharacters();
        this.game.CharactersToStartPosition();

        this.server.socketCommunication.broadcast("StartBattle");
        this.server.Transition(GameStates.BattleState);
    }

    public Destroy(): void {}
}
