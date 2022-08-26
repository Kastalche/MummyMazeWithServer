"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
var Character = /** @class */ (function () {
    function Character(startPosition, isMummy, isBot) {
        this.startPosition = startPosition;
        this.isBot = isBot;
        this.isMummy = isMummy;
    }
    Character.prototype.GoToStartPosition = function () {
        this.currentPosition = this.startPosition;
    };
    return Character;
}());
exports.Character = Character;
