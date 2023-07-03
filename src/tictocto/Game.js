import React, { useState } from "react";
import Board from "./Board";
import "./GameStyle.css";
import "./helper";
import { calculaWinner } from "./helper";
import { getBestMove } from "./helper";
import { getEmptyIndexes } from "./helper";

const Game = () => {
  const [state, setState] = useState({
    board: Array(9).fill(null),
    xIsNext: true,
    isSinglePlayer: true,
  });

  const winner = calculaWinner(state.board);

  const handleClick = (index) => {
    const boardCopy = [...state.board];
    if (winner || boardCopy[index]) return;

    boardCopy[index] = state.xIsNext ? "X" : "O";

    const gameWinner = calculaWinner(boardCopy);

    if (gameWinner || getEmptyIndexes(boardCopy).length === 0) {
      setState((prevState) => ({
        ...prevState,
        board: boardCopy,
      }));
      return;
    }

    setState((prevState) => ({
      ...prevState,
      board: boardCopy,
      xIsNext: !prevState.xIsNext,
    }));

    if (state.isSinglePlayer && state.xIsNext) {
      const aiMove = getBestMove(boardCopy);
      boardCopy[aiMove] = "O";

      setState((prevState) => ({
        ...prevState,
        board: boardCopy,
        xIsNext: !prevState.xIsNext,
      }));
    }
  };

  const handleResetGame = () => {
    setState((prevState) => ({
      ...prevState,
      board: Array(9).fill(null),
      xIsNext: true,
    }));
  };
  const handleModeChange = (e) => {
    const mode = e.target.value;
    setState((prevState) => ({
      ...prevState,
      isSinglePlayer: mode === "1",
    }));
  };
  return (
    <div>
      <div className="mode-select">
        <label className="box-select">
          <input
            type="checkbox"
            name="mode"
            value="1"
            className="ui-checkbox"
            checked={state.isSinglePlayer}
            onChange={handleModeChange}
          />
          1 Player
        </label>
        <label className="box-select">
          <input
            type="checkbox"
            name="mode"
            value="2"
            id="cbx"
            className="ui-checkbox"
            checked={!state.isSinglePlayer}
            onChange={handleModeChange}
          />
          2 Players
        </label>
      </div>
      <Board cells={state.board} onClick={handleClick} />
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
