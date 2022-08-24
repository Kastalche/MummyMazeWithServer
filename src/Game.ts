import { GameModes, GameServer } from "./GameServer";
import { Character } from "./Entities/Character";
import { Player } from "./Player";
import { CharacterMovement } from "./Entities/CharacterMovement";
import { GridManager } from "./Entities/GridManager";
export class Game {
    private server: GameServer;
    private players: Array<Player>;
    public characters: Array<Character>;

    public curentMode: GameModes;
    public currentCharacter: Character;

    public gridManager: GridManager;

    constructor() {}

    public CharactersToStartPosition(): void {
        this.characters.forEach((character) => {
            character.GoToStartPosition();
        });
    }

    public AddCharacters(): void {
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

    public NextCurrentCharacter() {}

    //TODO: ADD is available from because its not used only for bots.
}
