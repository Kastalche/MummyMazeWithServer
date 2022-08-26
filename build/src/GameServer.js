"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameServer = exports.GameStates = exports.GameModes = void 0;
var BattleContoller_1 = require("./States/BattleContoller");
var StartContoller_1 = require("./States/StartContoller");
var EndController_1 = require("./States/EndController");
var GameModes;
(function (GameModes) {
    GameModes[GameModes["SinglePlayer"] = 0] = "SinglePlayer";
    GameModes[GameModes["Multiplayer"] = 1] = "Multiplayer";
})(GameModes = exports.GameModes || (exports.GameModes = {}));
var GameStates;
(function (GameStates) {
    GameStates[GameStates["StartState"] = 0] = "StartState";
    GameStates[GameStates["BattleState"] = 1] = "BattleState";
    GameStates[GameStates["EndState"] = 2] = "EndState";
})(GameStates = exports.GameStates || (exports.GameStates = {}));
var GameServer = /** @class */ (function () {
    function GameServer(players, socket, gamedata) {
        this.players = players;
        this.socketCommunication = socket;
        this.gamedate = gamedata;
    }
    GameServer.prototype.Transition = function (newState) {
        this.state.Destroy();
        switch (newState) {
            case GameStates.StartState:
                this.state = new StartContoller_1.StartController(this);
                break;
            case GameStates.BattleState:
                this.state = new BattleContoller_1.BattleController(this);
                break;
            case GameStates.EndState:
                this.state = new EndController_1.EndController(this);
                break;
            default:
                break;
        }
        this.state.Start();
    };
    GameServer.prototype.BroadcastMessage = function (message, data) {
        this.socketCommunication.broadcast(message, data);
    };
    GameServer.prototype.SendMessage = function (socket, message, data) {
        this.socketCommunication.sendDataToClient(socket, message, data);
    };
    GameServer.prototype.Subscribe = function (eventName, event) {
        this.socketCommunication.Subscribe(null, "quit", this.state.Start, this.state);
    };
    return GameServer;
}());
exports.GameServer = GameServer;
