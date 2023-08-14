import Card from "./cards.model";
import Player from "./player.models";

export interface Game{
    gameStarted: boolean;
    players?: Player[],    
    turnOrder?: string[], //Player Ids
    activeCard?: Card,
    points?: Record<string,number>[]
    cards?: Record<string,Card[]>[]
    password?: string,
    cardSets: string[],
}

export interface GameWithId extends Game{
    id: string;
}