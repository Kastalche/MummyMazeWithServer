import { Character } from "./Entities/Character";
export class Player {
    public id: string;
    public isMummy: boolean;
    public socket;
    public character: Character;

    constructor(socket, id: string) {
        this.socket = socket;
        this.id = socket.id;
    }
}
