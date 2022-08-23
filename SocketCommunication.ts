import { GameServer, GameModes, GameStates } from "./src/GameServer";
import { Character } from "./src/Entities/Character";

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

export class SocketCommunication {
  players: Character[] = new Array();
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

      socket.on("start game", () => {
        console.log("The game is starting");
        this.game.Transition(GameStates.StartState);
      });
    });
  }

  public broadcast(command: string, data?: any): void {
    io.sockets.emit(command, data);
  }

  public sendToClient(socket, command: string): void {
    socket.emit(command);
  }

  public sendDataToClient(socket, command: string, data?: any): void {
    socket.emit(command, data);
  }
}

//arrat ot players
// const msurver = new GameServer( new Array<Character>, GameServer.GameModes.Multiplayer);

// public methods- send msg, broadcast, subscibe,unsubscribe.
//nqkyde new mummy maze server(sebe si)
//server referance kym tova
// ode na server com
//testvai dvete nestha i servera
