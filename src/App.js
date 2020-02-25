import React, {useReducer} from 'react';
import './App.css';
import Board from "./Board";

function findBottomIndex(id, board){
  const column = id % 7;
  let index = 7 * 5 + column;

  while(index >= 0) {
    if(!board[index].backgroundColor){
      break;
    }
    index -= 7;
  }
  return index;
}


function reducer(state, action){
  switch (action.type){
    case "dropBadge":
      const newBoard = [...state.board];
      const bottomIndex = findBottomIndex(action.id, newBoard);

      if(bottomIndex < 0 || state.winner) {
        return state;
      }

      newBoard[bottomIndex] = {backgroundColor: state.currentPlayer}
      const winner = checkAll(newBoard);

      return { board: newBoard, currentPlayer: state.currentPlayer === "Blue" ? "Red" : "Blue", winner };

    case "reset":
      return { board: initBoard(), currentPlayer: "Blue", winner: null}

    default:
      return;
  }
}

function checkAll(newBoard){

  // CHECKS FOR A DRAW
  let emptyCompartment = true;
  for (let i = 0; i < newBoard.length; i++) {
    if (newBoard[i].backgroundColor === "") {
      break;
    } else {
      emptyCompartment = false;
    }

    if (i === 41 && emptyCompartment === false )  {
      return "It's a draw!";
    }
  }

  // CHECKS FOR A HORIZONTAL WIN
  for (let i = 0; i < newBoard.length; i+=7) {
    for (let j = i; j < i+4; j++) {
      if(newBoard[j].backgroundColor === newBoard[j+1].backgroundColor
         && newBoard[j+1].backgroundColor === newBoard[j+2].backgroundColor
         && newBoard[j+2].backgroundColor === newBoard[j+3].backgroundColor
         && newBoard[j].backgroundColor) {
        return "The winner is " + newBoard[j].backgroundColor + "!";
      }
    }
  }

  // CHECKS FOR A VERTICAL WIN
  for (let j = 0; j < Math.floor(newBoard.length / 2); j++) {
    if(newBoard[j].backgroundColor === newBoard[j+7].backgroundColor
      && newBoard[j].backgroundColor === newBoard[j+14].backgroundColor
      && newBoard[j].backgroundColor === newBoard[j+21].backgroundColor
      && newBoard[j].backgroundColor) {
      return "The winner is " + newBoard[j].backgroundColor + "!";
    }
  }

  // CHECKS FOR A DIAGONAL \ WIN
  for (let i = 0; i < newBoard.length; i++) {
    if (i === 4 || i === 11) {
      i += 3;
    }
    if (i > 17) {
      break;
    }

    if(newBoard[i].backgroundColor === newBoard[i+8].backgroundColor
      && newBoard[i+8].backgroundColor === newBoard[i+16].backgroundColor
      && newBoard[i+16].backgroundColor === newBoard[i+24].backgroundColor
      && newBoard[i].backgroundColor) {
      return "The winner is " + newBoard[i].backgroundColor + "!";
    }
  }

  // CHECKS FOR A DIAGONAL / WIN
  for (let i = 3; i < newBoard.length; i++) {
    if (i === 7 || i === 14) {
      i += 3;
    }

    if (i > 20) {
      break;
    }

    if(newBoard[i].backgroundColor === newBoard[i+6].backgroundColor
      && newBoard[i+6].backgroundColor === newBoard[i+12].backgroundColor
      && newBoard[i+12].backgroundColor === newBoard[i+18].backgroundColor
      && newBoard[i].backgroundColor) {
      return "The winner is " + newBoard[i].backgroundColor + "!";
    }
  }
}


function initBoard(){
  let cells = [];
  for (let i = 0; i < 42; i++) {
    let cell = {
      backgroundColor: "",
      id: i,
    };
    cells.push(cell);
  }
  return cells;
}


function App() {
  const [state, dispatch] = useReducer(reducer, {
    board: initBoard(),
    currentPlayer: "Blue",
    winner: null,
  });

  return (
    <main>
      <h1>Connect4 Super Game</h1>
      <Board cells={state.board} onClickCell={(id) => dispatch({type: "dropBadge", id})} />
      <button onClick={() => dispatch({type: "reset"})}>Reset game</button>
      <div className="result">{ state.winner ? <h2>{state.winner}</h2> : null }</div>
    </main>
  );
}

export default App;
