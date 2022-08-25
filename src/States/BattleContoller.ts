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
            this.botLogic.GenerateBotMove(
                this.game.currentCharacter,
                this.game
            );
            this.ApplyMove(
                this.game.currentCharacter,
                this.game.currentCharacter.currentPosition
            );
        }
        //TODO: Figure this shit out!
        else {
            //this.server.Subscribe("playerMove", this.OnPlayerMoved(this.game.currentCharacter, this.game.currentCharacter.currentPosition));
        }
        this.server.sendMessage(player, MoveRquest, data);
        //
    }

    private OnPlayerMoved(move: Tile, player: Player): void {
        if (this.IsMoveValid(player, move)) {
            this.ApplyMove(player.character, move);
            this.game.NextCurrentCharacter();
        } else {
            //generate player move
            this.game.NextCurrentCharacter();
        }
    }

    private ApplyMove(ActiveCharacter: Character, NewCurrentTile: Tile): void {
        this.server.BroadcastMessage("applyMove", {
            ActiveCharacter: Character,
            NewCurrentTile: Tile,
        });
    }

    public NextState(): void {
        if (this.game.characters.length > 1) {
            this.game.NextCurrentCharacter();
            this.server.Transition(GameStates.BattleState);
        } else {
            this.server.Transition(GameStates.EndState);
        }
    }

    public Destroy(): void {
        //unsubscribe
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
}
