import { Tile } from "../Entities/Tile";
import { Game } from "../Game";
import { IStateController } from "./IStateController";
import { BotLogic } from "../Entities/BotLogic";
import { GameServer, GameStates } from "../GameServer";
import { Player } from '../Player';
import { Character } from '../Entities/Character';
export class BattleController implements IStateController {
    private game: Game;
    private server: GameServer;
    private botLogic: BotLogic;

    constructor(server: GameServer) {
        this.server = server;
    }

    public Start(): void {
        if (this.game.currentCharacter.isBot)
        {
            this.botLogic.GenerateBotMove(this.game.currentCharacter,this.game);
            this.ApplyMove(?);
        }
        
        else
        //TODO: Figure this shit out! 
        {socket.subscribe("playerMove", OnPlayerMoved)}
        socket.sendMessage(player, MoveRquest, data)
        //
    }

    private OnPlayerMoved(move: Tile, player:Player): void {
        
        if(this.IsMoveValid(player,move))
        {
        this.ApplyMove(player.character,move);
        }
        else
        {
            //generate player move
        }
    }

    private ApplyMove(ActiveCharacter:Character, NewCurrentTile:Tile): void {
        this.server.socketCommunication.broadcast('applyMove', { ActiveCharacter:Character, NewCurrentTile:Tile});
    }

    NextState(): void {
        if(this.game.characters.length>1)
        {
        this.game.NextCurrentCharacter();
        this.server.Transition(GameStates.BattleState);
        }
        else
        {
        this.server.Transition(GameStates.EndState);
        }
    }

    Destroy(): void {
        //unsubscribe
    }

    public IsMoveValid(player:Player, move:Tile):boolean
    {
    if(player.character==this.game.currentCharacter && this.botLogic.IsAvailableFrom(move,this.game.currentCharacter.currentPosition) )
    {
        return true;
    }
    else
    {
        return false;
    }
    }
}
