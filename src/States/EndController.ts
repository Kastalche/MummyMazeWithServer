import { IStateController } from "./IStateController";
import { GameServer } from "../GameServer";
import { SocketCommunication } from "../../SocketCommunication";
import { Character } from "../Entities/Character";
import { Game } from "../Game";
export class EndController implements IStateController {
    private server: GameServer;
    private socket: SocketCommunication;
    private game: Game;

    constructor(server: GameServer) {
        this.server = server;
    }

    Start(): void {
        if (this.game.CheckForBattleEnd) {
            this.server.BroadcastMessage("endGame", {
                winner: this.game.characters[0],
            });
        }
        //this.socket.EndGame()
    }

    Destroy(): void {
        //unsubscribe
    }
}
//TODO: timers or delay() for animation and where neeedet to sync
