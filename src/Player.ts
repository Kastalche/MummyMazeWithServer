import { Character } from "./Entities/Character";
export class Player {
    public id: number;
    public isMummy: boolean;
    public socket;
    public character: Character;

    constructor(socket, character: Character) {
        this.socket = socket;
        this.character = character;
    }
}
