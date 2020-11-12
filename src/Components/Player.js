import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import './Player.css'

export function Player(props) {

    const listItems = props.deck.map((card) =>
        <h1 key={Math.random()}>{card.suit}{card.rank}</h1>
    );

    

    return (
        <div className="Player">
            <h1>Player</h1>
            <h3>{props.win}</h3>
            {listItems}
            <p>{props.total}</p>
            <Button 
                variant="contained" 
                onClick={props.hit} 
                style={{
                    borderRadius: 5,
                    backgroundColor: "#7f5af0",
                    color: "#fffffe",
                    width: "5vw",
                }}
                >
                    Hit
                </Button>
            <Button 
                variant="contained" 
                onClick={props.check} 
                style={{
                    borderRadius: 5,
                    backgroundColor: "#7f5af0",
                    color: "#fffffe",
                    width: "5vw",
                }}
            >
            Stand</Button>
        </div>
    )
}
