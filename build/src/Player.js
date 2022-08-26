"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var Player = /** @class */ (function () {
    function Player(socket, id) {
        this.socket = socket;
        this.id = id;
    }
    Player.prototype.AddCharacterToPlayer = function (character) {
        this.character = character;
    };
    return Player;
}());
exports.Player = Player;
