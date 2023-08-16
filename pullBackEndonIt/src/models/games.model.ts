import Card from "./cards.model";
import {Player, PlayerInGame} from "./player.models";

export interface Game{
    gameStarted: boolean;
    players?: PlayerInGame[],    
    activeCard?: Card,
    password?: string,
    cardSets: string[],
}

export interface GameWithId extends Game{
    id: string;
}