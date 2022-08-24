import { GameServer, GameModes, GameStates } from "./src/GameServer";
import { Character } from "./src/Entities/Character";
import { Player } from "./src/Player";
import express from "express";
import { Game } from "./src/Game";
export class SocketCommunication {
    private players: Player[] = new Array();
    private game: GameServer = null;
    private gameData: Game;

    private app;
    private server;
    private io;

    constructor() {
        this.app = express();
        this.server = require("http").createServer(this.app);
        this.io = require("socket.io")(this.server);
        this.listen();
    }

    private listen(): void {
        this.server.listen(3000, () => {
            console.log("listening on *:3000");
        });

        this.app.get("/", (req, res) => {
            res.send("<h1>Welcome to Mummy Maze!</h1>");
        });

        this.io.on("connection", (socket) => {
            if (socket.connected) {
                console.log("a user connected");
                this.players.push(new Player(socket, character));
            }

            socket.on("startGame", () => {
                if (this.players.length == 2) {
                    this.game = new GameServer(
                        this.players,
                        this,
                        this.gameData
                    );
                    this.players = [];
                }

                console.log("The game is starting");
                this.game.Transition(GameStates.StartState);
            });
        });
    }

    public broadcast(eventName: string, data?: any): void {
        this.io.sockets.emit(eventName, data);
    }

    public sendToClient(socket, eventName: string): void {
        socket.emit(command);
    }

    public sendDataToClient(socket, eventName: string, data?: any): void {
        socket.emit(command, data);
    }
}
//TODO:  merhod adter creating new gam ->StartGame
//TODO: Subscribe/Unsubscribe
//TODO: event for mode
//TODO: class Player for players not characters(socket.id can be used)
//arrat ot players
// public methods- send msg, broadcast, subscibe,unsubscribe.
