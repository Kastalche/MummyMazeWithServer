import { GameModes, GameServer } from "../GameServer";
import { Character } from "./Character";
import { GridManager } from "./GridManager";
import { Tile } from "./Tile";
import { Game } from "../Game";

export class BotLogic {
    gameserver: GameServer;
    gridManager: GridManager;
    gamedata: Game;

    public GenerateBotMove(bot: Character, gamedata: Game): void {
        if (bot.isMummy) {
            if (this.BotNotOnTargetX(bot)) {
                this.BotMoveHorizontally(bot);
            } else {
                this.BotMoveVertically(bot);
            }

            if (this.BotNotOnTargetY(bot)) {
                this.BotMoveVertically(bot);
            } else {
                this.BotMoveHorizontally(bot);
            }
        } else {
            if (this.BotNotOnTargetX(bot)) {
                this.BotMoveHorizontally(bot);
            } else {
                this.BotMoveVertically(bot);
            }
        }
    }

    public GoTo(character: Character, tile: Tile): void {
        character.currentPosition = tile;
    }

    public CompareExplores(mummy: Character): Character {
        switch (this.gamedata.curentMode) {
            case GameModes.SinglePlayer:
                return this.gamedata.characters[1];

            case GameModes.Multiplayer:
                var player1 = this.gamedata.characters[1];
                var player2 = this.gamedata.characters[2];

                if (
                    Math.abs(
                        mummy.currentPosition.x - player1.currentPosition.x
                    ) >
                    Math.abs(
                        mummy.currentPosition.x - player2.currentPosition.x
                    )
                )
                    return player2;
                else if (player1.startPosition.x == player2.startPosition.x)
                    return player1;
                else return player1;

            default:
                return this.gamedata.characters[1];
        }
    }

    public FindExplorerTile(mummy: Character): Tile {
        if (mummy.isMummy) {
            var targetPlayer = this.CompareExplores(mummy);
            var target = targetPlayer.currentPosition;
            return this.gridManager.tiles[target.x][target.y];
            //if this row works I will buy myself a balkanche
        }
        else return this.gridManager.tiles[0][5];
    }

    private BotMoveHorizontally(bot: Character) {
        var botPos = bot.currentPosition;
        if (bot.isMummy) {
            var targetPos = this.FindExplorerTile(bot);
        } else {
            targetPos = this.gridManager.tiles[5][0];
        }

        if (botPos.x < targetPos.x) {
            //right
            if (
                this.gamedata.IsAvailableFrom(
                    this.gridManager.tiles[botPos.x + 1][botPos.y],
                    this.gridManager.tiles[botPos.x][botPos.y]
                )
            ) {
                this.GoTo(bot, this.gridManager.tiles[botPos.x + 1][botPos.y]);
            }
        } //left
        else {
            if (
                this.gamedata.IsAvailableFrom(
                    this.gridManager.tiles[botPos.x - 1][botPos.y],
                    this.gridManager.tiles[botPos.x][botPos.y]
                )
            ) {
                this.GoTo(bot, this.gridManager.tiles[botPos.x - 1][botPos.y]);
            }
        }
    }

    private BotMoveVertically(bot: Character) {
        var botPos = bot.currentPosition;
        if (bot.isMummy) {
            var targetPos = this.FindExplorerTile(bot);
        } else {
            targetPos = this.gridManager.tiles[5][0];
        }

        if (botPos.y < targetPos.y) {
            //right
            if (
                this.gamedata.IsAvailableFrom(
                    this.gridManager.tiles[botPos.x][botPos.y + 1],
                    this.gridManager.tiles[botPos.x][botPos.y]
                )
            ) {
                this.GoTo(bot, this.gridManager.tiles[botPos.x][botPos.y + 1]);
            }
        } //left
        else {
            if (
                this.gamedata.IsAvailableFrom(
                    this.gridManager.tiles[botPos.x][botPos.y - 1],
                    this.gridManager.tiles[botPos.x][botPos.y]
                )
            ) {
                this.GoTo(bot, this.gridManager.tiles[botPos.x][botPos.y - 1]);
            }
        }
    }

    private BotNotOnTargetX(bot: Character): boolean {
        var botPos = bot.currentPosition;
        if (bot.isMummy) {
            var targetPos = this.FindExplorerTile(bot);
        } else {
            targetPos = this.gridManager.tiles[5][2];
        }
        if (botPos.x != targetPos.x) return true;
        else return false;
    }

    private BotNotOnTargetY(bot: Character): boolean {
        var botPos = bot.currentPosition;
        if (bot.isMummy) {
            var targetPos = this.FindExplorerTile(bot);
        } else {
            targetPos = this.gridManager.tiles[5][2];
        }

        if (botPos.y != targetPos.y) return true;
        else return false;
    }
}
