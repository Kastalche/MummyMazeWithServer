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
        //everything except players and mode should be assined here by methods from game ;)
        this.game.AddCharacters();
        this.game.CharactersToStartPosition();
        this.game.currentCharacter=this.game.characters[0];

        this.server.BroadcastMessage("BattleState");
        this.server.Transition(GameStates.BattleState);
    }

    public Destroy(): void {}
}
