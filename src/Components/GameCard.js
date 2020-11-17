import { Card } from '@material-ui/core'
import React from 'react'
import './GameCard.css'

export function Gamecard(props) {
    
    console.log(props)

    if(props.card.hidden === true){
        return (
            <Card className="card"></Card>
        )
    }else {
        return (
        <Card className="card">
            <h1>{props.card.suit}</h1>
            <h1>{props.card.rank}</h1> 
        </Card>
        );
    }
}
