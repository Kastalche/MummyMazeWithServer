"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotLogic = void 0;
var GameServer_1 = require("../GameServer");
var BotLogic = /** @class */ (function () {
    function BotLogic() {
    }
    BotLogic.prototype.GenerateBotMove = function (bot) {
        if (bot.isMummy) {
            if (this.BotNotOnTargetX(bot)) {
                this.BotMoveHorizontally(bot);
            }
            else {
                this.BotMoveVertically(bot);
            }
            if (this.BotNotOnTargetY(bot)) {
                this.BotMoveVertically(bot);
            }
            else {
                this.BotMoveHorizontally(bot);
            }
        }
        else {
            if (this.BotNotOnTargetX(bot)) {
                this.BotMoveHorizontally(bot);
            }
            else {
                this.BotMoveVertically(bot);
            }
        }
    };
    BotLogic.prototype.GoTo = function (character, tile) {
        character.currentPosition = tile;
    };
    BotLogic.prototype.CompareExplores = function (mummy) {
        switch (this.gamedata.curentMode) {
            case GameServer_1.GameModes.SinglePlayer:
                return this.gamedata.characters[1];
            case GameServer_1.GameModes.Multiplayer:
                var player1 = this.gamedata.characters[1];
                var player2 = this.gamedata.characters[2];
                if (Math.abs(mummy.currentPosition.x - player1.currentPosition.x) >
                    Math.abs(mummy.currentPosition.x - player2.currentPosition.x))
                    return player2;
                else if (player1.startPosition.x == player2.startPosition.x)
                    return player1;
                else
                    return player1;
            default:
                return this.gamedata.characters[1];
        }
    };
    BotLogic.prototype.FindExplorerTile = function (mummy) {
        if (mummy.isMummy) {
            var targetPlayer = this.CompareExplores(mummy);
            var target = targetPlayer.currentPosition;
            return this.gridManager.tiles[target.x][target.y];
            //if this row works I will buy myself a balkanche
        }
        else
            return this.gridManager.tiles[0][5];
    };
    BotLogic.prototype.BotMoveHorizontally = function (bot) {
        var botPos = bot.currentPosition;
        if (bot.isMummy) {
            var targetPos = this.FindExplorerTile(bot);
        }
        else {
            targetPos = this.gridManager.tiles[5][0];
        }
        if (botPos.x < targetPos.x) {
            //right
            if (this.gamedata.IsAvailableFrom(this.gridManager.tiles[botPos.x + 1][botPos.y], this.gridManager.tiles[botPos.x][botPos.y])) {
                this.GoTo(bot, this.gridManager.tiles[botPos.x + 1][botPos.y]);
            }
        } //left
        else {
            if (this.gamedata.IsAvailableFrom(this.gridManager.tiles[botPos.x - 1][botPos.y], this.gridManager.tiles[botPos.x][botPos.y])) {
                this.GoTo(bot, this.gridManager.tiles[botPos.x - 1][botPos.y]);
            }
        }
    };
    BotLogic.prototype.BotMoveVertically = function (bot) {
        var botPos = bot.currentPosition;
        if (bot.isMummy) {
            var targetPos = this.FindExplorerTile(bot);
        }
        else {
            targetPos = this.gridManager.tiles[5][0];
        }
        if (botPos.y < targetPos.y) {
            //right
            if (this.gamedata.IsAvailableFrom(this.gridManager.tiles[botPos.x][botPos.y + 1], this.gridManager.tiles[botPos.x][botPos.y])) {
                this.GoTo(bot, this.gridManager.tiles[botPos.x][botPos.y + 1]);
            }
        } //left
        else {
            if (this.gamedata.IsAvailableFrom(this.gridManager.tiles[botPos.x][botPos.y - 1], this.gridManager.tiles[botPos.x][botPos.y])) {
                this.GoTo(bot, this.gridManager.tiles[botPos.x][botPos.y - 1]);
            }
        }
    };
    BotLogic.prototype.BotNotOnTargetX = function (bot) {
        var botPos = bot.currentPosition;
        if (bot.isMummy) {
            var targetPos = this.FindExplorerTile(bot);
        }
        else {
            targetPos = this.gridManager.tiles[5][2];
        }
        if (botPos.x != targetPos.x)
            return true;
        else
            return false;
    };
    BotLogic.prototype.BotNotOnTargetY = function (bot) {
        var botPos = bot.currentPosition;
        if (bot.isMummy) {
            var targetPos = this.FindExplorerTile(bot);
        }
        else {
            targetPos = this.gridManager.tiles[5][2];
        }
        if (botPos.y != targetPos.y)
            return true;
        else
            return false;
    };
    return BotLogic;
}());
exports.BotLogic = BotLogic;
