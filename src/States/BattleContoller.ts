import { Tile } from "../Entities/Tile";
import { IStateController } from "./IStateController";
export class BattleController implements IStateController {
    public Start(): void {
        // if(game.currentPlayer.isBot)
        //{
        this.ApplyMove(botlogic.giveMeMove(game));
        //}
        //else
        //{socket.subscribe("playerMove", OnPlayerMoved)}
        //socket.sendMessage(player, MoveRquest, data)
        //
    }

    private OnPlayerMoved(move: Tile): void {
        //TODO:validate!
        this.ApplyMove(move);
    }

    private ApplyMove(move: Tile): void {
        //socket.broadcast(notification);
    }

    NextState(): void {
        //if(game prodyljava)
        //game.nextCurrentPlayer
        //transition to battle state
        //else
        //transtion end state
    }
    Destroy(): void {
        //unsubscribe
    }
}
