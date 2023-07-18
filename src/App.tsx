import React, { useState } from 'react'

export function App() {
  // Begin by defining the state of the game grid based on the response we expect to receive from the API. 8x8 grid.
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
    winner: null,
  })

  return (
    <div>
      <h1> Minesweeper API</h1>
      <ul>
        <li></li>
      </ul>
    </div>
  )
}
