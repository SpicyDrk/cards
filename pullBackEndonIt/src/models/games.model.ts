import Card from "./cards.model";
import Player from "./player.models";

export interface Game{
    players?: Player[],
    turnOrder?: string[], //Player Ids
    activeCard?: Card,
    points?: Record<string,number>[]
    cards?: Record<string,Card[]>[]
    password?: string
}