export function calculaWinner(cells) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let index = 0; index < lines.length; index++) {
    const [a, b, c] = lines[index];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}
const cells = [null, null, null, "X", "X", "X", null, null, null];
console.log(calculaWinner(cells));

export function getBestMove(board) {
  const emptyIndexes = getEmptyIndexes(board);
  let bestMove = null;
  let bestScore = -Infinity;
  for (let i = 0; i < emptyIndexes.length; i++) {
    const index = emptyIndexes[i];
    board[index] = "O";
    const score = minimax(board, 0, false);
    board[index] = null;
    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  }
  return bestMove;
}

export function getEmptyIndexes(board) {
  const indexes = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      indexes.push(i);
    }
  }
  return indexes;
}

export function minimax(board, depth, isMaximizing) {
  const winner = calculaWinner(board);
  if (winner === "X") {
    return -10 + depth;
  } else if (winner === "O") {
    return 10 - depth;
  } else if (winner === null && getEmptyIndexes(board).length === 0) {
    return 0;
  }
  if (isMaximizing) {
    let bestScore = -Infinity;
    const emptyIndexes = getEmptyIndexes(board);

    for (let i = 0; i < emptyIndexes.length; i++) {
      const index = emptyIndexes[i];
      board[index] = "O";
      const score = minimax(board, depth + 1, false);
      board[index] = null;
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    const emptyIndexes = getEmptyIndexes(board);
    for (let i = 0; i < emptyIndexes.length; i++) {
      const index = emptyIndexes[i];
      board[index] = "X";
      const score = minimax(board, depth + 1, true);
      board[index] = null;
      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
}
