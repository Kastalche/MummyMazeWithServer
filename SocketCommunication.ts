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

    //I think i made this class too big and messy ;( help!!! i need somebody)
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
                //TODO: a user chosses mode and character()
                //io.on(singleplear, {eventa})
                
                this.io.on("single player", ()=> {
                    io.start(new GameServer(new Array<players> this.players.push( new player id=socket.id,...., new this.gameData { current mode= singleplayer players = this player adn so}),
                })
            socket.on("startGame", () => {
                if (this.players.length == 2) {
                    this.GameServer = new GameServer(
                        this.players,
                        this,
                        this.gameData
                    );
                    this.players = [];
                }
                

                console.log("The game is starting");
                this.GameServer.Transition(GameStates.StartState);
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

    public Subscribe(socket,eventName: string, callback:Function, contex:any )
    {
        socket.on(eventName, () => {
            callback.call(contex)
        })
    }

    public Unsubscribe(socket,eventName: string, callback:Function, contex:any )
    {
        socket.of(eventName, () => {
            callback.call(contex)
        });
    }
}
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