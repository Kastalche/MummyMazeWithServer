import { GameModes, GameServer } from "./GameServer";
import { Character } from "./Entities/Character";
import { Player } from "./Player";
import { CharacterMovement } from "./Entities/CharacterMovement";
import { GridManager } from "./Entities/GridManager";
export class Game {
    curentMode: GameModes;
    players: Array<Player>;
    currentCharacter: Character;

    private server: GameServer;
    public mode: GameModes;
    public characters: Array<Character>;

    public characterMovement: CharacterMovement;
    public gridManager: GridManager;

    constructor() {}

    public CharactersToStartPosition(): void {
        this.server.characters.forEach((character) => {
            character.GoToStartPosition();
        });
    }

    private AddCharacters(): void {
        switch (this.mode) {
            case GameModes.SinglePlayer:
                this.characters.push(
                    new Character(this.gridManager.tiles[3][5], true, true)
                );

                this.characters.push(
                    new Character(this.gridManager.tiles[1][2], false, false)
                );
                break;
            case GameModes.Multiplayer:
                this.characters.push(
                    new Character(this.gridManager.tiles[3][5], true, true)
                );
                this.characters.push(
                    new Character(this.gridManager.tiles[1][2], false, false)
                );
                this.characters.push(
                    new Character(this.gridManager.tiles[1][4], false, false)
                );
        }
    }
}
