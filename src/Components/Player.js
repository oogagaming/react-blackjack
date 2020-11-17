import { Button, Card } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import './Player.css'

export function Player(props) {

    const listItems = props.deck.map((card) =>
    <Card className="card">
    <h1 key={Math.random()}>{card.suit}</h1>
    <h1 key={Math.random()}>{card.rank}</h1>
    </Card>
    );

    

    return (
        <div className="Player">
            <h1>Player</h1>
            <h3>{props.win}</h3>
            <div className="Cards">{listItems}</div>
            <p className="total">{props.total}</p>
            {props.gameended ? <Button disabled variant="contained" onClick={props.hit} style={{ borderRadius: 5, backgroundColor: "#505050", color: "#fffffe", width: "5vw"}}>Hit</Button> : <Button variant="contained" onClick={props.hit} style={{ borderRadius: 5, backgroundColor: "#7f5af0", color: "#fffffe", width: "5vw"}}>Hit</Button> }
            {props.gameended ? <Button disabled variant="contained" onClick={props.check} style={{borderRadius: 5,backgroundColor: "#505050",color: "#fffffe",width: "5vw",marginLeft: "1%",}}>Stand</Button> : <Button variant="contained" onClick={props.check} style={{borderRadius: 5,backgroundColor: "#7f5af0",color: "#fffffe",width: "5vw",marginLeft: "1%",}}>Stand</Button>}
            {props.gameended ? <button onClick={props.playagain} className="playAgain">Play Again</button> : null}
        </div>
    )
}
