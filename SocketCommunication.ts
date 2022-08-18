import { GameServer, GameModes } from './src/GameServer';
import { Character } from './src/Character';

export class SocketCommunication {
  constructor() {
    const express = require("express");
    const app = express();
    const http = require("http");
    const server = http.createServer(app);
    const { Server } = require("socket.io");
    const io = new Server(server);
    //arrat ot players
    const msurver = new GameServer( new Array<Character>, GameServer.GameModes.Multiplayer);

    app.get("/", (req, res) => {
      res.send("<h1>Hello world</h1>");
    });

    io.on("connection", (socket) => {
      console.log("a user connected");
    });

    server.listen(3000, () => {
      console.log("listening on *:3000");
    });
  }
}
// public methods- send msg, broadcast, subscibe,unsubscribe.
//nqkyde new mummy maze server(sebe si)
//server referance kym tova
// ode na server com
//testvai dvete nestha i servera
