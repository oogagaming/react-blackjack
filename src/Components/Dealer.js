import { Button, Card } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import './Dealer.css'
import { Gamecard } from './GameCard';

export function Dealer(props) {

    console.log(props)

    const getTotal = () => {
        var total = props.total
        for (let i = 0; i < props.deck.length; i++) {
            let x = props.deck[i]
            if(x.hidden === true) {
                if(x.rank === "J" || x.rank === "Q" || x.rank === "K") {
                    total -= 10
                }else if (x.rank === "A") {
                    total -= 11
                }else{
                    total -= x.rank
                }
            }
        }
        return total
    }

    const listItems1 = props.deck.map((card) =>
        <Gamecard card={card}></Gamecard>
    );
    
    return (
        <div className="Dealer">
            <h1>Dealer</h1>
            <h3>{props.win}</h3>
            <div className="Cards">{listItems1}</div>
            <p>{getTotal()}</p>
        </div>
    )
}

export default Dealer
