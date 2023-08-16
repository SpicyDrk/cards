import {Player, PlayerInGame} from "../models/player.models";
import { Game, GameWithId } from "../models/games.model";
import { collections } from "./database.service";
import { ObjectId } from "mongodb";
import { Response, response } from "express";

export class GameService{
    private static _instance: GameService;
    private constructor() {}

    static getInstance(): GameService {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new GameService();
        return this._instance;
    }
    
    public createGame(player: PlayerInGame): Game {
        let game: Game = {
            gameStarted: false,
            activeCard: null,
            players: [player],
            cardSets:[]
        };
        return game
    }

    public startGame(game: Game): Game {
        let startedGame = game;
        startedGame.gameStarted = true;
        return startedGame
    }

    public async joinGame(gameId: string, playerId: string, resp: Response): Promise<Game>{
        const query = { _id: new ObjectId(gameId) };
        let game: any;
        await collections.games.findOne(query).then(res=>{
            game = res;
        })
        const playerQuery = { _id: new ObjectId(playerId) };

        if(game?.players?.find((x: { id: string; })=>x.id===playerId)){
            return game;
        }
        let playerInGame: PlayerInGame;
        await collections.players.findOne(playerQuery).then(res=>{
            let player = res as any;
            playerInGame.id = player._id;
            playerInGame.name = player.name;
        })
        game.players.push(playerInGame);
        let count = await collections.games.updateOne(query, {$set:game});
        return game;
    }
}
