import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'

export function Dealer(props) {
    const [cards, setCards] = useState([]);
    
    useEffect(() => {

    }, [])

    function RandomCard() {
        console.log("Dealer: ",props.deck)

        setCards(oldArray => [...oldArray, props.deck.pop()])
    }

    console.log(cards)
    const listItems = cards.map((card) =>
        <h1>{card.suit}{card.rank}</h1>
    );

    

    return (
        <div>
            {listItems}
            <Button color="primary" onClick={RandomCard}>Deal</Button>
        </div>
    )
}

export default Dealer
