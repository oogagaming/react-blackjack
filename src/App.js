import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import Dealer from './Components/Dealer.js';
import { Player } from './Components/Player';

function App() {
  const [deck, setDeck] = useState([]);
  const [started, setStart] = useState(false)

  useEffect(() => {
    StartGame()
  }, [])

  const StartGame = () => {
    const deck = [];
    const ranks = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
    const suits = ['♥', '♦', '♣', '♠'];

    ranks.forEach((rank) => {
        suits.forEach((suit) => {
            deck.push({rank, suit});
        });
    });
    setDeck(shuffle(deck))
    
    setStart(true)
  }

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  return (
    <div className="App">
      {started ? <Dealer deck={deck}/> : null}
      <Player deck={deck} />
    </div>
  );
}

export default App;
