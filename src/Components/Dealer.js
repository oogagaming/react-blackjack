import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'

export function Dealer(props) {

    const listItems = props.deck.map((card) =>
        <h1 key={Math.random()}>{card.suit}{card.rank}</h1>
    );

    return (
        <div>
            <h1>Dealer</h1>
            <h3>{props.win}</h3>
            {listItems}
            <p>{props.total}</p>
        </div>
    )
}

export default Dealer
