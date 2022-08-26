"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketCommunication = void 0;
var GameServer_1 = require("./src/GameServer");
var Player_1 = require("./src/Player");
var express_1 = __importDefault(require("express"));
var Game_1 = require("./src/Game");
var SocketCommunication = /** @class */ (function () {
    //I think i made this class too big and messy ;( help!!! i need somebody)
    function SocketCommunication() {
        this.players = new Array();
        this.GameServer = null;
        this.app = (0, express_1.default)();
        this.server = require("http").createServer(this.app);
        this.io = require("socket.io")(this.server);
        this.listen();
    }
    SocketCommunication.prototype.listen = function () {
        var _this = this;
        this.server.listen(3000, function () {
            console.log("listening on *:3000");
        });
        this.app.get("/", function (req, res) {
            res.send("<h1>Welcome to Mummy Maze!</h1>");
        });
        this.io.on("connection", function (socket) {
            if (socket.connected) {
                console.log("a user connected");
                //TODO: a user chosses mode and character()
                //io.on(singleplear, {eventa})
            }
            socket.on("singlePlayer", function () {
                console.log("singlePlayer");
                _this.players.push(new Player_1.Player(socket, socket.id));
                _this.GameServer = new GameServer_1.GameServer(_this.players, socket, (_this.gameData = new Game_1.Game(_this.GameServer, _this.players, GameServer_1.GameModes.SinglePlayer)));
                console.log(_this.players);
                console.log(_this.players[0]);
                console.log(_this.GameServer);
                console.log(_this.gameData);
                console.log("GameMaden");
            });
            //{ current mode= singleplayer players = this player adn so}
            socket.on("multiPlayer", function () {
                console.log("Multiplayer");
            });
            socket.on("startGame", function () {
                if (_this.players.length == 2) {
                    _this.GameServer = new GameServer_1.GameServer(_this.players, _this, _this.gameData);
                    _this.players = [];
                }
                console.log("The game is starting");
                _this.GameServer.Transition(GameServer_1.GameStates.StartState);
            });
            socket.on("disconnect", function () {
                console.log("disconnected");
                _this.broadcast("otherPlayerDisconnected");
            });
        });
    };
    SocketCommunication.prototype.broadcast = function (eventName, data) {
        this.io.sockets.emit(eventName, data);
    };
    SocketCommunication.prototype.sendToClient = function (socket, eventName) {
        socket.emit(eventName);
    };
    SocketCommunication.prototype.sendDataToClient = function (socket, eventName, data) {
        socket.emit(eventName, data);
    };
    SocketCommunication.prototype.Subscribe = function (socket, eventName, callback, contex) {
        socket.on(eventName, function () {
            callback.call(contex);
        });
    };
    SocketCommunication.prototype.Unsubscribe = function (socket, eventName, callback, contex) {
        socket.of(eventName, function () {
            callback.call(contex);
        });
    };
    return SocketCommunication;
}());
exports.SocketCommunication = SocketCommunication;
//TODO:  merhod adter creating new gam ->StartGame
//TODO: Subscribe/Unsubscribe
//TODO: event for mode
//TODO: class Player for players not characters(socket.id can be used)
// public methods- send msg, broadcast, subscibe,unsubscribe.
// if (this.gameData.curentMode == GameModes.SinglePlayer)
// {this.players.push(
//     new Player(
//         socket,
//         this.gameData.CreateCharacterForPlayer(false),
//         socket.id
//     )
// );}
// else if (this.gameData.curentMode == GameModes.Multiplayer)
// {
//     this.players.push(
//         new Player(
//             socket,
//             //this.gameData.CreateCharacterForPlayer(aPlayersChosenCharacter:Boolean);
//             socket.id
// }
