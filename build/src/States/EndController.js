"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndController = void 0;
var EndController = /** @class */ (function () {
    function EndController(server) {
        this.server = server;
    }
    EndController.prototype.Start = function () {
        this.server.BroadcastMessage("endGame", {
            id: this.game.characters[0].id,
            winner: this.game.characters[0],
        });
    };
    EndController.prototype.Destroy = function () {
        //unsubscribe
    };
    return EndController;
}());
exports.EndController = EndController;
//TODO: timers or delay() for animation and where neeedet to sync
