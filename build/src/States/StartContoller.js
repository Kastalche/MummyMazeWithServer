"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartController = void 0;
var GameServer_1 = require("../GameServer");
var StartController = /** @class */ (function () {
    function StartController(server, game) {
        this.server = server;
        this.game = game;
    }
    StartController.prototype.Start = function () {
        console.log("vleznahme li tuka");
        this.game.gridManager.GenerateGrid();
        this.game.gridManager.GenerateObstacles();
        console.log("generated grid");
        this.game.AddCharacters();
        this.game.CharactersToStartPosition();
        this.game.NextCurrentCharacter();
        this.game.currentPlayer = this.game.players[0];
        console.log("startcontroller start");
        this.server.BroadcastMessage("BattleState");
        this.server.Transition(GameServer_1.GameStates.BattleState);
    };
    StartController.prototype.Destroy = function () { };
    return StartController;
}());
exports.StartController = StartController;
