import React, { useState } from 'react'

export function App() {
  // Step 1: static implementation
  //Begin by defining the state of the game grid based on the response we expect to receive from the API. 8x8 grid.
  const [game, setGame] = useState({
    board: [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ],
    id: null,
    state: null,
    mines: null,
  })

  return (
    <div>
      <h1> Minesweeper API</h1>
      <ul>
        <li>{game.board[0][0]}</li>
        <li>{game.board[0][1]}</li>
        <li>{game.board[0][2]}</li>
        <li>{game.board[0][3]}</li>
        <li>{game.board[0][4]}</li>
        <li>{game.board[0][5]}</li>
        <li>{game.board[0][6]}</li>
        <li>{game.board[0][7]}</li>
        <li>{game.board[1][0]}</li>
        <li>{game.board[1][1]}</li>
        <li>{game.board[1][2]}</li>
        <li>{game.board[1][3]}</li>
        <li>{game.board[1][4]}</li>
        <li>{game.board[1][5]}</li>
        <li>{game.board[1][6]}</li>
        <li>{game.board[1][7]}</li>
        <li>{game.board[2][0]}</li>
        <li>{game.board[2][1]}</li>
        <li>{game.board[2][2]}</li>
        <li>{game.board[2][3]}</li>
        <li>{game.board[2][4]}</li>
        <li>{game.board[2][5]}</li>
        <li>{game.board[2][6]}</li>
        <li>{game.board[2][7]}</li>
      </ul>
    </div>
  )
}
