"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartController = void 0;
var GameServer_1 = require("../GameServer");
var StartController = /** @class */ (function () {
    function StartController(server) {
        this.server = server;
    }
    StartController.prototype.Start = function () {
        this.game.AddCharacters();
        this.game.CharactersToStartPosition();
        this.server.BroadcastMessage("StartBattle");
        this.server.Transition(GameServer_1.GameStates.BattleState);
    };
    StartController.prototype.Destroy = function () { };
    return StartController;
}());
exports.StartController = StartController;
