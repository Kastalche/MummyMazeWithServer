"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleController = void 0;
var Tile_1 = require("../Entities/Tile");
var GameServer_1 = require("../GameServer");
var Character_1 = require("../Entities/Character");
var BattleController = /** @class */ (function () {
    function BattleController(server) {
        this.server = server;
    }
    BattleController.prototype.Start = function () {
        if (this.game.currentCharacter.isBot) {
            this.botLogic.GenerateBotMove(this.game.currentCharacter);
            this.NextState();
        }
        else {
            this.server.Subscribe("playerMove", this.OnPlayerMoved(this.onPlayerSentTile));
            this.NextState();
        }
    };
    BattleController.prototype.onPlayerSentTile = function (msg) {
        var move = JSON.parse(JSON.stringify(msg));
        return move;
    };
    BattleController.prototype.OnPlayerMoved = function (move) {
        if (this.IsMoveValid(this.game.currentPlayer, move)) {
            this.ApplyMove(this.game.currentPlayer.character, move);
            this.game.NextCurrentCharacter();
        }
        else {
            this.OnPlayerMoved(move);
        }
    };
    BattleController.prototype.ApplyMove = function (ActiveCharacter, NewCurrentTile) {
        ActiveCharacter.currentPosition = NewCurrentTile;
        this.server.BroadcastMessage("ApplyMove", {
            activeCharacter: Character_1.Character,
            newCurrentTile: Tile_1.Tile,
        });
    };
    BattleController.prototype.NextState = function () {
        this.CheckForDeadExplorers();
        if (!this.game.CheckForBattleEnd) {
            this.game.NextCurrentCharacter();
            this.server.Transition(GameServer_1.GameStates.BattleState);
        }
        else {
            this.server.Transition(GameServer_1.GameStates.EndState);
        }
    };
    BattleController.prototype.Destroy = function () {
        this.server.Unsubscrube("PlayerMoved", this.OnPlayerMoved(this.game.currentCharacter.currentPosition));
    };
    BattleController.prototype.IsMoveValid = function (player, move) {
        if (player.character == this.game.currentCharacter &&
            this.game.IsAvailableFrom(move, this.game.currentCharacter.currentPosition)) {
            return true;
        }
        else {
            return false;
        }
    };
    BattleController.prototype.CheckForDeadExplorers = function () {
        for (var index = 0; index < this.game.characters.length; index++) {
            this.game.KillExplorer(this.game.characters[index]);
        }
    };
    return BattleController;
}());
exports.BattleController = BattleController;
