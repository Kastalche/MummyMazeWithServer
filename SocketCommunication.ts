import { GameServer, GameModes, GameStates } from "./src/GameServer";
import { Character } from "./src/Entities/Character";
import { Player } from "./src/Player";
import express from "express";
import { Game } from "./src/Game";
export class SocketCommunication {
    private players: Player[] = new Array();
    private GameServer: GameServer = null;
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
                //TODO: a user chosses character()
            }

            socket.on("singlePlayer", () => {
                console.log("singlePlayer");
                this.players.push(new Player(socket, socket.id));
                this.GameServer = new GameServer(
                    this.players,
                    socket,
                    (this.gameData = new Game(
                        this.GameServer,
                        this.players,
                        GameModes.SinglePlayer
                    ))
                );
                this.GameServer.Start();
                console.log("GameMaden");
            });

            socket.on("multiPlayer", () => {
                console.log("Multiplayer");
                this.players.push(new Player(socket, socket.id));
                if (this.players.length == 2) {
                    this.GameServer = new GameServer(
                        this.players,
                        socket,
                        (this.gameData = new Game(
                            this.GameServer,
                            this.players,
                            GameModes.Multiplayer
                        ))
                    );
                    this.GameServer.Start();
                }
            });

            // socket.on("startGame", () => {
            //     console.log("The game is starting");
            //     this.GameServer.Transition(GameStates.StartState);
            // });

            socket.on("disconnect", () => {
                console.log("disconnected");

                this.broadcast("otherPlayerDisconnected");
            });

            socket.on("applyMove", ()=>{
                console.log("Aplied Move?")
            });
        });
    }

    public broadcast(eventName: string, data?: any): void {
        this.io.sockets.emit(eventName, data);
    }

    public sendToClient(socket, eventName: string): void {
        socket.emit(eventName);
    }

    public sendDataToClient(socket, eventName: string, data?: any): void {
        socket.emit(eventName, data);
    }

    public Subscribe(
        socket,
        eventName: string,
        callback: Function,
        contex: any
    ) {
        socket.on(eventName, () => {
            callback.call(contex);
        });
    }

    public Unsubscribe(
        socket,
        eventName: string,
        callback: Function,
        contex: any
    ) {
        socket.of(eventName, () => {
            callback.call(contex);
        });
    }
}
