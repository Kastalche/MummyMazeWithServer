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
            this.botLogic.GenerateBotMove(this.game.currentCharacter, this.game);
            this.ApplyMove(this.game.currentCharacter, this.game.currentCharacter.currentPosition);
        }
        //TODO: Figure this shit out!
        else {
            //this.server.Subscribe("playerMove", this.OnPlayerMoved(this.game.currentCharacter, this.game.currentCharacter.currentPosition));
        }
        //this.server.sendMessage(player, MoveRquest, data);
        //
    };
    BattleController.prototype.OnPlayerMoved = function (move, player) {
        if (this.IsMoveValid(player, move)) {
            this.ApplyMove(player.character, move);
            this.game.NextCurrentCharacter();
        }
        else {
            //generate player move
            this.game.NextCurrentCharacter();
        }
    };
    BattleController.prototype.ApplyMove = function (ActiveCharacter, NewCurrentTile) {
        this.server.BroadcastMessage("applyMove", {
            ActiveCharacter: Character_1.Character,
            NewCurrentTile: Tile_1.Tile,
        });
    };
    BattleController.prototype.NextState = function () {
        if (this.game.characters.length > 1) {
            this.game.NextCurrentCharacter();
            this.server.Transition(GameServer_1.GameStates.BattleState);
        }
        else {
            this.server.Transition(GameServer_1.GameStates.EndState);
        }
    };
    BattleController.prototype.Destroy = function () {
        //unsubscribe
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
    return BattleController;
}());
exports.BattleController = BattleController;
