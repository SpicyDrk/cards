import express, { Request, Response } from "express";
import bodyParser, { json } from "body-parser";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import { GameService } from "../services/game.service";
import Player from "../models/player.models";



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
    res.status(200).send(game);
})

cardsRouter.get("/join-game/:id", async (req: Request, res: Response) =>{
    const id = req?.params?.id;
    res.status(200).send(id);
})


//** Login */
cardsRouter.post("/login",bodyParser.json(), async (req: Request, res: Response) =>{
    const id = req?.body?.id;
    const name = req?.body?.name;
    try {
        const query = { _id: new ObjectId(id) };
        const player = await collections.players.findOne(query);
        if(player){
            res.status(200).send(player);
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