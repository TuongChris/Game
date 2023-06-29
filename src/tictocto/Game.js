import React, { useState } from "react";
import Board from "./Board";
import "./GameStyle.css";
import { calculaWinner } from "./helper";

const Game = () => {
  const [state, setState] = useState({
    board: Array(9).fill(null),
    xIsNext: true,
  });
  const winner = calculaWinner(state.board);
  const handClick = (index) => {
    const boardCopy = [...state.board];
    if (winner || boardCopy[index]) return;
    boardCopy[index] = state.xIsNext ? "X" : "O";
    setState({
      board: boardCopy,
      xIsNext: !state.xIsNext,
    });
  };
  const handleResetGame = () => {
    setState({
      board: Array(9).fill(null),
      xIsNext: true,
    });
  };
  return (
    <div>
      <Board cells={state.board} onClick={handClick}></Board>
      {winner && <div className="game-winner">Winner is {winner}</div>}
      <div className="button">
        <button className="game-reset" onClick={handleResetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default Game;
