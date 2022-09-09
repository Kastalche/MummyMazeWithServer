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
        var _this = this;
        switch (this.curentMode) {
            case GameServer_1.GameModes.SinglePlayer:
                var lcharacter = new Character_1.Character(this.gridManager.tiles[1][2], false, false);
                this.players[0].character = lcharacter;
                this.characters.push(lcharacter);
                this.characters.push(new Character_1.Character(this.gridManager.tiles[3][5], true, true) //mummy
                );
                break;
            case GameServer_1.GameModes.Multiplayer:
                var isThereAMummyPlayer = false;
                this.players.forEach(function (player) {
                    var lcharacter = _this.CreateCharacterForPlayer(player);
                    player.character = lcharacter;
                    _this.characters.push(lcharacter);
                });
                this.players.forEach(function (player) {
                    if (player.isMummy == true) {
                        isThereAMummyPlayer = true;
                    }
                });
                if (isThereAMummyPlayer) {
                    this.characters.push(new Character_1.Character(this.gridManager.tiles[1][2], false, true));
                }
                else {
                    this.characters.push(new Character_1.Character(this.gridManager.tiles[3][5], true, true)); //mummy
                }
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
    Game.prototype.FindCurrentPlayer = function () {
        for (var index = 0; index < this.players.length; index++) {
            if (this.players[index].character == this.currentCharacter)
                return this.players[index];
        }
    };
    Game.prototype.FindMummyPosition = function () {
        for (var index = 0; index < this.characters.length; index++) {
            if (this.characters[index].isMummy == true)
                return this.characters[index].currentPosition;
        }
    };
    Game.prototype.KillExplorer = function (explorer) {
        if (explorer.currentPosition == this.FindMummyPosition()) {
            var index = this.characters.indexOf(explorer);
            if (index > -1) {
                this.characters.splice(index, 1);
            }
        }
    };
    Game.prototype.MummiesTurn = function () {
        var _this = this;
        this.characters.forEach(function (character) {
            if (character.isMummy == true) {
                if (character.isBot == true) {
                    _this.botLogic.GenerateBotMove(character);
                }
                else {
                    _this.server.SendToClient("RequestMove");
                    _this.server.Subscribe;
                }
            }
        });
    };
    return Game;
}());
exports.Game = Game;
