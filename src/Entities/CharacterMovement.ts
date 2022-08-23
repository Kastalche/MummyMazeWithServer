import { Tile } from "./Tile";
import { Character } from "./Character";
import { GridManager } from "./GridManager";
import { Socket } from "dgram";
import { GameModes, GameServer } from "../GameServer";

export class CharacterMovement {
    gameserver: GameServer;
    gridManager: GridManager;

    public GenerateBotMove(bot: Character): void {
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

    public GeneratePlayerMove(player: Character) {
        //sent data to the server for your move (when figure out how to do it)
    }

    public IsAvailableFrom(targetTile: Tile, yourTile: Tile): boolean {
        if (targetTile.obstacles.length != 0) {
            if (targetTile.x != yourTile.x) {
                //if your x is diffrent
                if (targetTile.x - yourTile.x == -1) {
                    // u go left => right
                    if (targetTile.obstacles.includes(3)) return false;
                    else return true;
                } else if (targetTile.x - yourTile.x == 1) {
                    // righ => left
                    if (targetTile.obstacles.includes(1)) return false;
                    else return true;
                }
            }

            if (targetTile.y != yourTile.y) {
                if (targetTile.y - yourTile.y == 1) {
                    if (targetTile.obstacles.includes(4))
                        // up => down
                        return false;
                    else return true;
                } else if (targetTile.y - yourTile.y == -1) {
                    if (targetTile.obstacles.includes(2))
                        //down => up
                        return false;
                    else return true;
                }
            }
        }
        return true;
    }

    public CompareExplores(mummy: Character): Character {
        switch (this.gameserver.mode) {
            case GameModes.SinglePlayer:
                return this.gameserver.characters[1];

            case GameModes.Multiplayer:
                var player1 = this.gameserver.characters[1];
                var player2 = this.gameserver.characters[2];

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
                return this.gameserver.characters[1];
        }
    }

    public FindExplorerTile(mummy: Character): Tile {
        var targetPlayer = this.CompareExplores(mummy);
        var target = targetPlayer.currentPosition;
        return this.gridManager.tiles[target.x][target.y];
        //if this row works I will buy myself a balkanche
    }

    public GoTo(character: Character, tile: Tile): void {
        character.currentPosition = tile;
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
                this.IsAvailableFrom(
                    this.gridManager.tiles[botPos.x + 1][botPos.y],
                    this.gridManager.tiles[botPos.x][botPos.y]
                )
            ) {
                this.GoTo(bot, this.gridManager.tiles[botPos.x + 1][botPos.y]);
            }
        } //left
        else {
            if (
                this.IsAvailableFrom(
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
                this.IsAvailableFrom(
                    this.gridManager.tiles[botPos.x][botPos.y + 1],
                    this.gridManager.tiles[botPos.x][botPos.y]
                )
            ) {
                this.GoTo(bot, this.gridManager.tiles[botPos.x][botPos.y + 1]);
            }
        } //left
        else {
            if (
                this.IsAvailableFrom(
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

//TODO: BotLogic static class. give me move
