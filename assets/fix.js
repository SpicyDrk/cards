'use strict'

const fs = require('fs');

let cardTable = []

fs.readFile('cardsOrigional.json', (error, data)=>{
    
    let parsedData = JSON.parse(data);
    for (let i=0; i < parsedData.length; i++){
        for (let j=0; j < parsedData[i].white.length; j++){
            cardTable.push({
                packName: parsedData[i].name,
                color: 'white',
                text: parsedData[i].white[j].text,
                pick: null,
                official: parsedData[i].official
            })
        }
        for (let j=0; j < parsedData[i].black.length; j++){
            cardTable.push({
                packName: parsedData[i].name,
                color: 'black',
                text: parsedData[i].black[j].text,
                pick: parsedData[i].black[j].pick,
                official: parsedData[i].official
            })
        }
    }
    fs.writeFile('cards.json', JSON.stringify(cardTable), 'utf8', ()=>{})
})