import { Character } from "../Entities/Character";
import { GridManager } from "../Entities/GridManager";
import { Game } from "../Game";
import { GameModes, GameServer, GameStates } from "../GameServer";
import { IStateController } from "./IStateController";

export class StartController implements IStateController {
    private server: GameServer;
    public mode: GameModes;
    private game: Game;

    constructor(server: GameServer) {
        this.server = server;
    }

    public Start(): void {
        this.game.AddCharacters();
        this.game.CharactersToStartPosition();

        this.server.BroadcastMessage("StartBattle");
        this.server.Transition(GameStates.BattleState);
    }

    public Destroy(): void {}
}
