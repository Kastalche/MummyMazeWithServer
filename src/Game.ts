import { GameModes, GameServer } from "./GameServer";
import { Character } from "./Entities/Character";
import { Player } from "./Player";
import { GridManager } from "./Entities/GridManager";
import { Tile } from "./Entities/Tile";
import { stripVTControlCharacters } from "util";
import { BotLogic } from "./Entities/BotLogic";
import { Socket } from "dgram";

export class Game {
    private server: GameServer;
    public players: Array<Player>;
    public characters: Array<Character>;

    public curentMode: GameModes;
    public currentCharacter: Character = null;
    public currentCharacterIndex: number;
    public currentPlayer: Player;

    public gridManager: GridManager;
    public botLogic: BotLogic;

    constructor(server: GameServer, players: Array<Player>, mode: GameModes) {
        this.server = server;
        this.players = players;
        this.curentMode = mode;
    }

    public CharactersToStartPosition(): void {
        this.characters.forEach((character) => {
            character.GoToStartPosition();
        });
    }

    public AddCharacters(): void {
        switch (this.curentMode) {
            case GameModes.SinglePlayer:
                var plCharacter = new Character(
                    this.gridManager.tiles[1][2],
                    false,
                    false
                );
                this.players[0].character = plCharacter;

                this.characters.push(plCharacter);

                this.characters.push(
                    new Character(this.gridManager.tiles[3][5], true, true) //mummy
                );
                break;

            case GameModes.Multiplayer:
                var isThereAMummyPlayer = false;
                this.players.forEach((player) => {
                    var plCharacter = this.CreateCharacterForPlayer(player);
                    player.character = plCharacter;
                    this.characters.push(plCharacter);
                });
                this.players.forEach((player) => {
                    if (player.isMummy == true) {
                        isThereAMummyPlayer = true;
                    }
                });

                if (isThereAMummyPlayer) {
                    this.characters.push(
                        new Character(this.gridManager.tiles[1][2], false, true)
                    );
                } else {
                    this.characters.push(
                        new Character(this.gridManager.tiles[3][5], true, true)
                    ); //mummy
                }
        }
    }

    public IsAvailableFrom(targetTile: Tile, yourTile: Tile): boolean {
        if (targetTile.obstacles.length != 0) {
            if (targetTile.x != yourTile.x) {
                //if your x is diffrent
                if (targetTile.x - yourTile.x == -1) {
                    // u go left => right
                    if (targetTile.obstacles.includes(3)) return false;
                    else return true;
                } else if (targetTile.x - yourTile.x == 1) {
                    // righ => left
                    if (targetTile.obstacles.includes(1)) return false;
                    else return true;
                }
            }

            if (targetTile.y != yourTile.y) {
                if (targetTile.y - yourTile.y == 1) {
                    if (targetTile.obstacles.includes(4))
                        // up => down
                        return false;
                    else return true;
                } else if (targetTile.y - yourTile.y == -1) {
                    if (targetTile.obstacles.includes(2))
                        //down => up
                        return false;
                    else return true;
                }
            }
        }
        return true;
    }

    public NextCurrentCharacter() {
        if (this.currentCharacter == null) {
            this.currentCharacter = this.characters[0];
            this.currentCharacterIndex = 0;
        } else {
            if (this.currentCharacterIndex == this.characters.length) {
                this.currentCharacterIndex = 0;
                this.currentCharacter =
                    this.characters[this.currentCharacterIndex];
            } else {
                this.currentCharacterIndex++;
                this.currentCharacter =
                    this.characters[this.currentCharacterIndex];
            }
        }
    }

    public CreateCharacterForPlayer(player: Player): Character {
        if (player.isMummy) {
            var characterToAdd = new Character(
                this.gridManager.tiles[3][5],
                true,
                false
            );
            this.characters.push(characterToAdd);
            return characterToAdd;
        } else {
            var characterToAdd = new Character(
                this.gridManager.tiles[1][2],
                false,
                false
            );
            this.characters.push(characterToAdd);
            return characterToAdd;
        }
    }

    public CheckForBattleEnd(): boolean {
        if (this.characters.length <= 1) return true;
        else return false;
    }

    public FindCurrentPlayer(): Player {
        for (let index = 0; index < this.players.length; index++) {
            if (this.players[index].character == this.currentCharacter)
                return this.players[index];
        }
    }

    public FindAPlayerByCharacter(character: Character): Player {
        for (let index = 0; index < this.players.length; index++)
            if (this.players[index].character == character)
                return this.players[index];
    }

    public FindMummyPosition(): Tile {
        for (let index = 0; index < this.characters.length; index++) {
            if (this.characters[index].isMummy == true)
                return this.characters[index].currentPosition;
        }
    }

    public KillExplorer(explorer: Character): void {
        if (explorer.currentPosition == this.FindMummyPosition()) {
            var index = this.characters.indexOf(explorer);
            if (index > -1) {
                this.characters.splice(index, 1);
                var deadPlayer = this.FindAPlayerByCharacter(explorer);
                this.server.BroadcastMessage("deadPlayer", deadPlayer);
            }
        }
    }

    public MummiesTurn(): void {
        //TODO: implement currrent player, character logic
        this.characters.forEach((character) => {
            if (character.isMummy == true) {
                if (character.isBot == true) {
                    this.botLogic.GenerateBotMove(character);
                } else {
                    this.server.SendMessage(this, "RequestMove");
                    //this.server.Subscribe("SendMove")
                }
            }
        });
    }
}
