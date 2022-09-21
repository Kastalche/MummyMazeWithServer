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
                //this.broadcast("PlayerId", socket.id);
                //this.socketList.push(socket);
                //TODO: a user chosses character()
            }
            socket.on("singlePlayer", function () {
                console.log("singlePlayer");
                _this.players.push(new Player_1.Player(socket, socket.id));
                _this.GameServer = new GameServer_1.GameServer(_this.players, socket, (_this.gameData = new Game_1.Game(_this.GameServer, _this.players, GameServer_1.GameModes.SinglePlayer)));
                console.log("GameMaden");
                _this.GameServer.Start();
                console.log("GameMaden");
            });
            socket.on("multiPlayer", function () {
                console.log("Multiplayer");
                _this.players.push(new Player_1.Player(socket, socket.id));
                if (_this.players.length == 2) {
                    _this.GameServer = new GameServer_1.GameServer(_this.players, socket, (_this.gameData = new Game_1.Game(_this.GameServer, _this.players, GameServer_1.GameModes.Multiplayer)));
                    _this.GameServer.Start();
                }
            });
            socket.on("disconnect", function () {
                console.log("disconnected");
                //this.broadcast("otherPlayerDisconnected");
            });
        });
    };
    SocketCommunication.prototype.broadcast = function (eventName, data) {
        this.io.sockets.emit(eventName, data);
    };
    SocketCommunication.prototype.sendMessage = function (socket, eventName, data) {
        socket.emit(eventName, data);
    };
    SocketCommunication.prototype.Subscribe = function (socket, eventName, callback, contex) {
        socket.on(eventName, function (arg) {
            callback.call(contex, arg);
        });
    };
    //check if this subscribe is correct
    SocketCommunication.prototype.Unsubscribe = function (socket, eventName, callback, contex) {
        socket.of(eventName, function () {
            callback.call(contex);
        });
    };
    return SocketCommunication;
}());
exports.SocketCommunication = SocketCommunication;
