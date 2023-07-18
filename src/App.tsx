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

  // Step 1.1 Define a function to handleClicks
  function handleClickCell(row: number, column: number) {
    console.log(`You hace clicked on row ${row} and column ${column}`)
  }

  return (
    <div>
      <h1> Minesweeper API</h1>
      <ul>
        <li onClick={() => handleClickCell(0, 0)}>{game.board[0][0]}</li>
        <li onClick={() => handleClickCell(0, 1)}>{game.board[0][1]}</li>
        <li onClick={() => handleClickCell(0, 2)}>{game.board[0][2]}</li>
        <li onClick={() => handleClickCell(0, 3)}>{game.board[0][3]}</li>
        <li onClick={() => handleClickCell(0, 4)}>{game.board[0][4]}</li>
        <li onClick={() => handleClickCell(0, 5)}>{game.board[0][5]}</li>
        <li onClick={() => handleClickCell(0, 6)}>{game.board[0][6]}</li>
        <li onClick={() => handleClickCell(0, 7)}>{game.board[0][7]}</li>
        <li onClick={() => handleClickCell(1, 0)}>{game.board[1][0]}</li>
        <li onClick={() => handleClickCell(1, 1)}>{game.board[1][1]}</li>
        <li onClick={() => handleClickCell(1, 2)}>{game.board[1][2]}</li>
        <li onClick={() => handleClickCell(1, 3)}>{game.board[1][3]}</li>
        <li onClick={() => handleClickCell(1, 4)}>{game.board[1][4]}</li>
        <li onClick={() => handleClickCell(1, 5)}>{game.board[1][5]}</li>
        <li onClick={() => handleClickCell(1, 6)}>{game.board[1][6]}</li>
        <li onClick={() => handleClickCell(1, 7)}>{game.board[1][7]}</li>
        <li onClick={() => handleClickCell(2, 0)}>{game.board[2][0]}</li>
        <li onClick={() => handleClickCell(2, 1)}>{game.board[2][1]}</li>
        <li onClick={() => handleClickCell(2, 2)}>{game.board[2][2]}</li>
        <li onClick={() => handleClickCell(2, 3)}>{game.board[2][3]}</li>
        <li onClick={() => handleClickCell(2, 4)}>{game.board[2][4]}</li>
        <li onClick={() => handleClickCell(2, 5)}>{game.board[2][5]}</li>
        <li onClick={() => handleClickCell(2, 6)}>{game.board[2][6]}</li>
        <li onClick={() => handleClickCell(2, 7)}>{game.board[2][7]}</li>
      </ul>
    </div>
  )
}
