import { Tile } from "../Entities/Tile";
import { Game } from "../Game";
import { IStateController } from "./IStateController";
import { BotLogic } from "../Entities/BotLogic";
import { GameServer, GameStates } from "../GameServer";
import { Player } from "../Player";
import { Character } from "../Entities/Character";
export class BattleController implements IStateController {
    private game: Game;
    private server: GameServer;
    private botLogic: BotLogic;

    constructor(server: GameServer) {
        this.server = server;
    }

    public Start(): void {
        if (this.game.currentCharacter.isBot) {
            this.botLogic.GenerateBotMove(this.game.currentCharacter);
            this.NextState();
        } else {
            this.server.Subscribe("playerMove", this.OnPlayerMoved(data));
            this.NextState();
        }
    }

    public onPlayerSentTile(msg: JSON): Tile {
        let move: Tile = JSON.parse(JSON.stringify(msg));
        return move;
    }

    private OnPlayerMoved(move: Tile): void {
        if (this.IsMoveValid(this.game.currentPlayer, move)) {
            this.ApplyMove(this.game.currentPlayer.character, move);
            this.game.NextCurrentCharacter();
        } else {
            this.OnPlayerMoved(move);
        }
    }

    private ApplyMove(ActiveCharacter: Character, NewCurrentTile: Tile): void {
        ActiveCharacter.currentPosition = NewCurrentTile;
        this.server.BroadcastMessage("ApplyMove", {
            activeCharacter: Character,
            newCurrentTile: Tile,
        });
    }

    public NextState(): void {
        this.CheckForDeadExplorers();
        if (!this.game.CheckForBattleEnd) {
            this.game.NextCurrentCharacter();
            this.server.Transition(GameStates.BattleState);
        } else {
            this.server.Transition(GameStates.EndState);
        }
    }

    public IsMoveValid(player: Player, move: Tile): boolean {
        if (
            player.character == this.game.currentCharacter &&
            this.game.IsAvailableFrom(
                move,
                this.game.currentCharacter.currentPosition
            )
        ) {
            return true;
        } else {
            return false;
        }
    }

    public CheckForDeadExplorers(): void {
        for (let index = 0; index < this.game.characters.length; index++) {
            this.game.KillExplorer(this.game.characters[index]);
        }
    }

    public Destroy(): void {
        this.server.Unsubscrube(
            "PlayerMoved",
            this.OnPlayerMoved(this.game.currentCharacter.currentPosition)
        );
    }
}
