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
  const [gameended , setGameEnd] = useState(false);

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
    let x = deck.pop()
    let y;
    if (x.rank === "J" || x.rank === "Q" || x.rank === "K") {
      y = playtotal + 10
    }else if(x.rank === "A") {
      y =  playtotal + 11
    }else {
      y =  playtotal + x.rank
    }
    
    console.log(y)
    setPlayer(dealer =>[...dealer, x])
    if(y > 21) {
      setPlayerStat("Bust")
      setDealerStat("Win")
      setGameEnd(true)
    }
  }
  const StartDeck = () => {
    const deck = [];
    const ranks = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
    const suits = ['♥', '♦', '♣', '♠'];
    const hidden = false;
    ranks.forEach((rank) => {
        suits.forEach((suit) => {
            deck.push({rank, suit, hidden});
        });
    });
    setDeck(shuffle(deck))
    console.log(deck)
  }

  function RandomCardDealer(amount) {

      for(let i = 0; i < amount; i++) {
        let x = deck.pop()
        console.log(x)
        if (i === 1) {
          x.hidden = true
        }
        console.log(x)
        setDealer(dealer => [...dealer, x])
        console.log(dealer)
      }
  }

  function RandomCardPlayer(amount) {
    for(let i = 0; i < amount; i++) {
      setPlayer(dealer => [...dealer, deck.pop()])
    }
  }

  function StartGame() {
    RandomCardDealer(2)

    RandomCardPlayer(2)
    setStart(true)
    setGameEnd(false)
  }

  function PlayAgain() {
    StartDeck()
    setDealer([])
    setPlayer([])
    setDealerStat()
    setPlayerStat()
    RandomCardDealer(2)

    RandomCardPlayer(2)
    setStart(true)
    setGameEnd(false)
    console.log(deck)
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
          console.log(total)
          break;
        case "J":
          total = total + 10
          console.log(total)
          break;
        case "Q":
          total = total + 10
          console.log(total)
          break;
        case "K":
          total = total + 10
          console.log(total)
          break;

        default:
          console.log(dealer[i].rank)
          total = total + dealer[i].rank
          break;
      }
    }
    setTotalDeal(total)
    console.log("check dealer", dealtotal)
  }

  function DealerWin() {
    console.log("Dealer Win")
    setDealerStat('Win')
    setPlayerStat("Lost")
    setGameEnd(true)
  }

  function ShowCard() {
    for (let i = 0; i < dealer.length; i++) {
      dealer[i].hidden = false
      
    }
  }

  function CheckWin() {

    ShowCard()
    console.log(dealer)

    if(playtotal === 21) {
      setPlayerStat("Blackjack")
      setGameEnd(true)
    }else if(dealtotal === 21) {
      setDealerStat("Blackjack")
      setGameEnd(true)
    }else if(playtotal < 21) {
      var y = dealtotal
      while(y < 17) {
        let x = deck.pop()
        console.log("rank: ", x.rank)
        if(x.rank === "K" || x.rank === "Q" || x.rank === "J") {
          y = y + 10
        }else if(x.rank === "A") {
          y = y + 11
        }else {
          y = y + x.rank
        }
        console.log("185", y)
        setDealer(dealer =>[...dealer, x])
      }
      if(y > 21) {
          console.log("dealer bust")
          setDealerStat('Bust')
          setPlayerStat("Win")
          setGameEnd(true)
      }else if(playtotal > y) {
          console.log("hand Win")
          setDealerStat('Lost')
          setPlayerStat("Win")
          setGameEnd(true)
      }else if (playtotal < y) {
          DealerWin()
      }else if(playtotal === y) {
        setDealerStat('Draw')
        setPlayerStat("Draw")
        setGameEnd(true)
      }
    }else {
      setPlayerStat("Bust")
      setDealerStat("Win")
      setGameEnd(true)
    }
    CheckDealer()
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
      {started ? <Player deck={player} hit={Hit} playagain={PlayAgain} check={CheckWin} win={playerStatus} total={playtotal} gameended={gameended}/> : null}

      {!started ? <Button onClick={StartGame} style={{
                    borderRadius: 5,
                    backgroundColor: "#7f5af0",
                    color: "#fffffe",
                    width: "5vw",
                }}>Play</Button> : null}
    </div>
  );
}

export default App;
