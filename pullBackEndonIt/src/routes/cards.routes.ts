import express, { Request, Response } from "express";
import bodyParser, { json } from "body-parser";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import { GameService } from "../services/game.service";
import Player from "../models/player.models";
import { Game, GameWithId } from "../models/games.model";



export const cardsRouter = express.Router();

cardsRouter.use(express.json());

cardsRouter.get("/", async (req: Request, res: Response) => {
    res.send("Api up and running")
});

cardsRouter.post("/", async (req: Request, res: Response) => {
    res.send(req.body);
});

cardsRouter.get("/all-cards", async (req: Request, res: Response) => {
    try {
        const cards = await collections.cards.find({}).toArray();
        res.status(200).send(cards);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

cardsRouter.get("/card-sets", async (req: Request, res: Response) => {
    try {
        const cardSets = await collections.cards.distinct("packName",{});
        res.status(200).send(cardSets);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

cardsRouter.get("/white-cards/:count", async (req: Request, res: Response) => {
    const count = req?.params?.count;
    try {
        const cards = await collections.cards.find({}).toArray();
        res.status(200).send(cards);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

cardsRouter.get("/games", async (req: Request, res: Response) =>{
    try {
        const cards = await collections.games.find({}).toArray();
        res.status(200).send(cards);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

cardsRouter.post("/create-game", async (req: Request, res: Response) =>{
    let gameData = req.body;
    let service = GameService.getInstance();
    let game = service.createGame(gameData);
    let gameResult = await collections.games.insertOne(game)
    res.status(200).send(game);
})

cardsRouter.post("/start-game", async (req: Request, res: Response) =>{
    let gameData:GameWithId = req.body;
    if(!gameData.cardSets ||gameData?.cardSets?.length <= 0 ){
        res.status(400).send("Pick at least 1 card set");
        return;
    }
    if(!gameData.players || gameData?.players?.length < 2){1
        res.status(400).send("At least 3 players required for a game");
        return;
    }
    const query = { _id: new ObjectId(gameData.id) };
    const game = await collections.games.findOne(query);
    if (!game){
        res.status(400).send("Unable to find game with id: " + gameData.id);
        return;
    }
    let service = GameService.getInstance();
    let startedGame = service.startGame(gameData);
    await collections.games.updateOne(query, {$set:startedGame}).then(()=>{
        res.status(200).send(startedGame);
    });
})

cardsRouter.get("/join-game/:id", async (req: Request, res: Response) =>{
    const id = req?.params?.id;
    res.status(200).send(id);
})

//** Login */
cardsRouter.post("/login", async (req: Request, res: Response) =>{
    const id = req?.body?.id;
    const name = req?.body?.name;
    try {
        const query = { _id: new ObjectId(id) };
        const player = await collections.players.findOne(query);
        if(player){
            let player: Player = {
                name: name,
                lastLogin: new Date(),
            }
            await collections.players.updateOne(query, {$set:player}).then(()=>{
                res.status(200).send(player);
            });
            
        } else {
            if (!name){
                res.status(400).send("No name specified");
                return;
            }
            let player: Player = {
                name: name,
                lastLogin: new Date(),
            }
            const result = await collections.players.insertOne(player)
            result ? res.status(201).send(player) : res.status(500).send("failed to log in.");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
})