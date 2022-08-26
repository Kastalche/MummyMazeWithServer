"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var GameServer_1 = require("./GameServer");
var Character_1 = require("./Entities/Character");
var Game = /** @class */ (function () {
    function Game(server, players, mode) {
        this.currentCharacter = null;
        this.server = server;
        this.players = players;
        this.curentMode = mode;
    }
    Game.prototype.CharactersToStartPosition = function () {
        this.characters.forEach(function (character) {
            character.GoToStartPosition();
        });
    };
    Game.prototype.AddCharacters = function () {
        switch (this.curentMode) {
            case GameServer_1.GameModes.SinglePlayer:
                this.characters.push(new Character_1.Character(this.gridManager.tiles[3][5], true, true));
                this.characters.push(new Character_1.Character(this.gridManager.tiles[1][2], false, false));
                break;
            case GameServer_1.GameModes.Multiplayer:
                this.characters.push(new Character_1.Character(this.gridManager.tiles[3][5], true, true));
                this.characters.push(new Character_1.Character(this.gridManager.tiles[1][2], false, false));
                this.characters.push(new Character_1.Character(this.gridManager.tiles[1][4], false, false));
        }
    };
    Game.prototype.IsAvailableFrom = function (targetTile, yourTile) {
        if (targetTile.obstacles.length != 0) {
            if (targetTile.x != yourTile.x) {
                //if your x is diffrent
                if (targetTile.x - yourTile.x == -1) {
                    // u go left => right
                    if (targetTile.obstacles.includes(3))
                        return false;
                    else
                        return true;
                }
                else if (targetTile.x - yourTile.x == 1) {
                    // righ => left
                    if (targetTile.obstacles.includes(1))
                        return false;
                    else
                        return true;
                }
            }
            if (targetTile.y != yourTile.y) {
                if (targetTile.y - yourTile.y == 1) {
                    if (targetTile.obstacles.includes(4))
                        // up => down
                        return false;
                    else
                        return true;
                }
                else if (targetTile.y - yourTile.y == -1) {
                    if (targetTile.obstacles.includes(2))
                        //down => up
                        return false;
                    else
                        return true;
                }
            }
        }
        return true;
    };
    Game.prototype.NextCurrentCharacter = function () {
        if (this.currentCharacter == null) {
            this.currentCharacter = this.characters[0];
            this.currentCharacterIndex = 0;
        }
        else {
            if (this.currentCharacterIndex == this.characters.length) {
                this.currentCharacterIndex = 0;
                this.currentCharacter =
                    this.characters[this.currentCharacterIndex];
            }
            else {
                this.currentCharacterIndex++;
                this.currentCharacter =
                    this.characters[this.currentCharacterIndex];
            }
        }
    };
    Game.prototype.CreateCharacterForPlayer = function (player) {
        if (player.isMummy) {
            var characterToAdd = new Character_1.Character(this.gridManager.tiles[3][5], true, false);
            this.characters.push(characterToAdd);
            return characterToAdd;
        }
        else {
            var characterToAdd = new Character_1.Character(this.gridManager.tiles[1][2], false, false);
            this.characters.push(characterToAdd);
            return characterToAdd;
        }
    };
    Game.prototype.CheckForBattleEnd = function () {
        if (this.characters.length <= 1)
            return true;
        else
            return false;
    };
    return Game;
}());
exports.Game = Game;
