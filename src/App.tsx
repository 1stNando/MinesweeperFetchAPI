import React, { useState } from 'react'

export function App() {
  // Cell values:

  //   (empty space) An unrevealed cell

  //   _ An empty revealed cell

  //   F An unrevealed flagged cell

  //   * A cell with a bomb in it (only show after a game is won or lost)

  //   @ A flagged cell with a bomb in it (only show after a game is won or lost)

  //   1-8 The number of neighboring cells that contain a mine.

  // Declare types used:
  type Cell = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | '*' | 'F' | ' ' | '_' | '@'
  type Row = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell]
  type Board = [Row, Row, Row, Row, Row, Row, Row, Row]

  type Game = {
    board: Board
    id: null | number
    state: null | 'new' | 'playing' | 'won' | 'lost'
    mines: null | number
  }

  // Step 1: static implementation
  //Begin by defining the state of the game grid based on the response we expect to receive from the API. 8x8 grid
  const [game, setGame] = useState<Game>({
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

  // Define difficulty state
  const [difficulty, setDifficulty] = useState<0 | 1 | 2>(0)

  // Step 1.1 Define a function to handleClicks
  async function handleClickCell(
    row: number,
    col: number,
    action: 'check' | 'flag'
  ) {
    // This is a guard clause to prevent clicking cells.
    if (!game || game.board[row][col] !== ' ') {
      return
    }
    // Check correct cells(optional)
    console.log(`You have clicked on row ${row} and column ${col}`)

    ///////////////////
    const checkOptions = {
      id: game.id,
      row,
      col,
    }

    // Generate the URL we need
    const url = `https://minesweeper-api.herokuapp.com/games/${game.id}/${action}`

    const fetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(checkOptions),
    }

    // Make a POST request to make a move
    const response = await fetch(url, fetchOptions)
    if (response.ok) {
      // Get the response back as JSON
      const newGame = await response.json()

      // Set the new game state!
      setGame(newGame)
    }
  }

  function transformCellValue(value: string | number) {
    if (value === 'F') {
      return <i className="fa fa-flag" />
    }

    if (value === '_') {
      return ' '
    }

    if (value === '*') {
      return <i className="fa fa-bomb" />
    }
    return value
  }

  function transformCellClassName(value: string | number) {
    switch (value) {
      case 'F':
        return 'cell-flag'

      case '*':
        return 'cell-bomb'

      case '_':
        return 'cell-free'

      case ' ':
        return undefined

      default:
        return `cell-number cell-${value}`
    }
  }

  // Step 1.2 Define a function to create a new game by fetching from the API
  async function handleNewGame(newGameDifficulty: 0 | 1 | 2) {
    const gameOptions = { difficulty: newGameDifficulty }

    // Visit this page to review the API resource information.
    const url = 'https://minesweeper-api.herokuapp.com/games'

    // Explain the response we expect from the API call
    const fetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gameOptions),
    }

    // Variable to hold the response we await
    const response = await fetch(url, fetchOptions)

    // Check point
    console.log(response)

    if (response.ok) {
      const newGame = (await response.json()) as Game
      setGame(newGame)
      setDifficulty(newGameDifficulty)
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  const header = game.state ? `You have ${game.state}` : 'Minesweeper API -'

  return (
    <div>
      <h1>{header}</h1>

      <p>Instructions: Select the difficulty level to begin!!!</p>
      <h2>
        <button className="new-game" onClick={() => handleNewGame(0)}>
          EASY
        </button>
      </h2>
      <h3>
        Game ID:{game.id}, containing {game.mines} mines. Difficulty:
        {difficulty}
      </h3>
      <section className={`difficulty-${difficulty}`}>
        {game.board.map(function (gameRow, row) {
          return gameRow.map(function (square, col) {
            return (
              <button
                className={transformCellClassName(square)}
                onClick={function (event) {
                  event.preventDefault()
                  handleClickCell(row, col, 'check')
                }}
                onContextMenu={function (event) {
                  event.preventDefault()

                  handleClickCell(row, col, 'flag')
                }}
                key={col}
              >
                {transformCellValue(square)}
              </button>
            )
          })
        })}
      </section>
    </div>
  )
}
