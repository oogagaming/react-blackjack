import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import Dealer from './Components/Dealer.js';
import { Player } from './Components/Player';

function App() {
  const [deck, setDeck] = useState([]);
  const [started, setStart] = useState(false)
  const [dealer, setDealer] = useState([]);
  const [player, setPlayer] = useState([]);
  const [dealerStatus, setDealerStat] = useState("")
  const [playerStatus, setPlayerStat] = useState("")

  const [playtotal, setTotal] = useState(0)
  const [dealtotal, setTotalDeal] = useState(0)

  useEffect(() => {
    StartDeck()
  }, [])

  useEffect(() =>{
    CheckHand()
    CheckDealer()
  })

  function Hit() {
    RandomCard("Player", 1)
  }

  function HitDealer() {

  }

  const StartDeck = () => {
    const deck = [];
    const ranks = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
    const suits = ['♥', '♦', '♣', '♠'];

    ranks.forEach((rank) => {
        suits.forEach((suit) => {
            deck.push({rank, suit});
        });
    });
    setDeck(shuffle(deck))

  }

  function RandomCard(where, amount) {

    if(where === "Dealer") {
      for(let i = 0; i < amount; i++) {
        setDealer(dealer => [...dealer, deck.pop()])
        console.log(dealer)
      }
    }else if(where === "Player") {
      for(let i = 0; i < amount; i++) {
        setPlayer(dealer => [...dealer, deck.pop()])
      }
    }
  }

  function DealCardToDealer() {
    if(dealtotal < 17) {
      RandomCard("Dealer", 1)
      CheckDealer()
      CheckWin()
    }
  }

  function StartGame() {
    RandomCard("Dealer", 2)

    RandomCard("Player", 2)
    setStart(true)
  }

  const CheckHand = () => {
    let total = 0;

    for (let i = 0; i < player.length; i++) {
      switch (player[i].rank) {
        case "A":
          total = total + 11
          break;
        case "J":
          total = total + 10
          break;
        case "Q":
          total = total + 10
          break;
        case "K":
          total = total + 10
          break;

        default:
          total = total + player[i].rank
          break;
      }
    }
    setTotal(total)
    console.log("check player", playtotal)
  }

  function CheckDealer() {
    let total = 0;

    for (let i = 0; i < dealer.length; i++) {
      switch (dealer[i].rank) {
        case "A":
          total = total + 11
          break;
        case "J":
          total = total + 10
          break;
        case "Q":
          total = total + 10
          break;
        case "K":
          total = total + 10
          break;

        default:
          total = total + dealer[i].rank
          break;
      }
    }
    setTotalDeal(total)
    console.log("check dealer", dealtotal)
  }

  function CheckWin() {

    console.log(dealer)

    if(playtotal === 21) {
      setPlayerStat("Blackjack")
    }else if(dealtotal === 21) {
      setDealerStat("Blackjack")
    }else if(playtotal < 21) {
        var y = dealtotal
        while(y < 17) {
          let x = deck.pop()
          y = x.rank + y
          console.log(x)
          setDealer(dealer =>[...dealer, x])
        }
      if(y > 21) {
          console.log("dealer bust")
          setDealerStat('Bust')
          setPlayerStat("Win")
      }else if(playtotal > y) {
          console.log("hand Win")
          setDealerStat('Lost')
          setPlayerStat("Win")
      }else if (playtotal < y) {
          console.log("Dealer Win")
          setDealerStat('Win')
          setPlayerStat("Lost")
      }else if(playtotal === y) {
        setDealerStat('Draw')
        setPlayerStat("Draw")
      }
    }else {
      setPlayerStat("Bust")
      setDealerStat("Win")
    }
    setTotalDeal(y)
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
      <h1>Black Jack</h1>
      {started ? <Dealer deck={dealer} win={dealerStatus} total={dealtotal}/> : null}
      {started ? <Player deck={player} hit={Hit} check={CheckWin} win={playerStatus} total={playtotal}/> : null}

      {!started ? <Button onClick={StartGame}>Play</Button> : null}
    </div>
  );
}

export default App;
