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
        console.log("vleznahme li tuka");
        this.game.gridManager.GenerateGrid();
        this.game.gridManager.GenerateObstacles();
        console.log("generated grid");

        this.game.AddCharacters();
        this.game.CharactersToStartPosition();
        this.game.NextCurrentCharacter();
        this.game.currentPlayer = this.game.players[0];
        console.log("startcontroller start");

        this.server.BroadcastMessage("BattleState");
        this.server.Transition(GameStates.BattleState);
    }

    public Destroy(): void {}
}
