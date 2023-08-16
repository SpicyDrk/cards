import Card from "./cards.model";


export interface Player{
    name: string,
    gameId?: string,
    lastLogin: Date
}


export interface PlayerInGame{
    id: string,
    name: string,
    gameId?: string,
    cards?: Card[], 
    points?: number
}