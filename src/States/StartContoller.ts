import { Character } from "../Entities/Character";
import { GridManager } from "../Entities/GridManager";
import { Game } from "../Game";
import { GameModes, GameServer, GameStates } from "../GameServer";
import { IStateController } from "./IStateController";

export class StartController implements IStateController {
    private server: GameServer;
    public mode: GameModes;
    private game: Game;

    constructor(server: GameServer, game: Game) {
        this.server = server;
        this.game = game;
    }

    public Start(): void {
        this.game.AddCharacters();
        console.log("startcontroller start");
        this.game.CharactersToStartPosition();
        this.game.NextCurrentCharacter();

        this.game.currentPlayer = this.game.players[0];

        this.server.BroadcastMessage("BattleState");
        this.server.Transition(GameStates.BattleState);
    }

    public Destroy(): void {}
}
