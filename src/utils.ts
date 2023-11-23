import { valueParams } from "./redux/slices/game";

export function checkWinner(board: Array<valueParams>) {
  const winPatterns = [
    // Rows
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    // Columns
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    // Diagonals
    [0, 4, 8], [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a][0] !== '' && board[a][0] === board[b][0] && board[b][0] === board[c][0]) {
      return board[a][0];
    }
  }
  return 0;
}