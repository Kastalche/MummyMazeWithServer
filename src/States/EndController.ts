import { IStateController } from "./IStateController";
import { GameServer } from "../GameServer";
export class EndController implements IStateController {
    private server: GameServer;

    constructor(server: GameServer) {
        this.server = server;
    }

    Start(): void {
        //calculate game end(winner ect)
        //socket.broadcast(game end data)
        //socket.EndGame
    }

    Destroy(): void {}
}
//TODO: timers or delay() for animation and where neeedet to sync
