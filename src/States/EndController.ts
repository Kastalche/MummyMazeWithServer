import { IStateController } from "./IStateController";
import { GameServer } from "../GameServer";
import { SocketCommunication } from "../../SocketCommunication";
import { Character } from "../Entities/Character";
export class EndController implements IStateController {
    private server: GameServer;
    private socket: SocketCommunication;

    constructor(server: GameServer) {
        this.server = server;
    }

    Start(): void {
        //calculate game end(winner ect)
        this.socket.broadcast("endGame", { winner: Character });

        //this.socket.EndGame()
    }

    Destroy(): void {}
}
//TODO: timers or delay() for animation and where neeedet to sync
