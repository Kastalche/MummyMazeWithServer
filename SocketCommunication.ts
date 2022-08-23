import { GameServer, GameModes, GameStates } from "./src/GameServer";
import { Character } from "./src/Entities/Character";
import { Player } from "./src/Player";
// TODO: move consts into classs and add public/private
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

export class SocketCommunication {
    characters: Character[] = new Array();
    players: Player[] = new Array();

    game: GameServer;

    constructor() {
        this.listen();
    }

    private listen(): void {
        server.listen(3000, () => {
            console.log("listening on *:3000");
        });

        app.get("/", (req, res) => {
            res.send("<h1>Welcome to Mummy Maze!</h1>");
        });

        io.on("connection", (socket) => {
            console.log("a user connected");
            //lengt 2, game==null
            this.game = new GameServer(this.characters, 1, this);
            this.players = [];

            socket.on("startGame", () => {
                console.log("The game is starting");
                this.game.Transition(GameStates.StartState);
            });
        });
    }

    public broadcast(eventName: string, data?: any): void {
        io.sockets.emit(command, data);
    }

    public sendToClient(socket, command: string): void {
        socket.emit(command);
    }

    public sendDataToClient(socket, command: string, data?: any): void {
        socket.emit(command, data);
    }
}
//TODO:  merhod adter creating new gam ->StartGame
//TODO: Subscribe/Unsubscribe
//TODO: event for mode
//TODO: class Player for players not characters(socket.id can be used)
//arrat ot players
// const msurver = new GameServer( new Array<Character>, GameServer.GameModes.Multiplayer);

// public methods- send msg, broadcast, subscibe,unsubscribe.
//nqkyde new mummy maze server(sebe si)
//server referance kym tova
// ode na server com
//testvai dvete nestha i servera
