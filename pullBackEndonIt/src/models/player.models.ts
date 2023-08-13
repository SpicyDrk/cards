import Card from "./cards.model";


export default interface Player{
    name: string,
    gameId?: string,
    cards?: Card[] 
    lastLogin: Date
}