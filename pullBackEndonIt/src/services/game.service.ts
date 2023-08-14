import Player from "../models/player.models";
import { Game } from "../models/games.model";

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
    
    public createGame(player: Player): Game {
        let game: Game = {
            gameStarted: false,
            activeCard: null,
            players: [player],
            points: [],
            turnOrder: [],
            cardSets:[]
        };
        return game
    }

    public startGame(game: Game): Game {
        let startedGame = game;
        startedGame.gameStarted = true;
        return startedGame
    }
}
