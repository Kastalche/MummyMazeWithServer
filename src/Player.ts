import { Character } from "./Entities/Character";
export class Player {
    public id: number;
    public isMummy: boolean;
    public socket;
    public character: Character;

    constructor(socket, id: number) {
        this.socket = socket;
        this.id = id;
    }
}
