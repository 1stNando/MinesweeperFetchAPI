import React, { useState } from 'react'

export function App() {
  // Declare types used:
  type Cell = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | '*' | 'F' | ' ' | '_' | '@'
  type Row = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell]
  type Board = [Row, Row, Row, Row, Row, Row, Row, Row]

  type Game = {
    board: Board
    id: null | number
    state: 'new' | 'playing' | 'won' | 'lost'
    mines: null | number
  }

  // Step 1: static implementation
  //Begin by defining the state of the game grid based on the response we expect to receive from the API. 8x8 grid.
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

  const [game, setGame] = useState<Game | null>(null)

  // Step 1.2 Define a function to create a new game by fetching from the API
  async function handleNewGame(newGameDifficulty: 0 | 1 | 2) {
    const gameOptions = { difficulty: newGameDifficulty }

    const url = 'https://minesweeper-api.herokuapp.com/games'

    const fetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gameOptions),
    }

    const response = await fetch(url, fetchOptions)

    // Check point
    console.log(response)

    if (response.ok) {
      const newGame = (await response.json()) as Game
      setGame(newGame)
      setDifficulty(newGameDifficulty)
    }
  }

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
    const url = `https://sdg-tic-tac-toe-api.herokuapp.com/games/${game.id}/${action}`

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

  ////////////////////////////////////////////////////////////////////////////////
  const header = 'Minesweeper API -'

  return (
    <div>
      <h1>{header}</h1>

      <p>Instructions: Select the difficulty level to begin.</p>
      <h2>
        <button onClick={() => handleNewGame(0)}>EASY</button>
        <button className="new-game" onClick={() => handleNewGame(1)}>
          MEDIUM
        </button>
        <button onClick={() => handleNewGame(2)}>HARD</button>
      </h2>
      <h3>
        Game ID:{game.id}, containing {game.mines} mines. Difficulty:
        {difficulty}
      </h3>
      <ul>
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

        {/* <li onClick={() => handleClickCell(0, 0)}>{game.board[0][0]}</li>
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

        <li onClick={() => handleClickCell(2, 0)}>{game.board[3][0]}</li>
        <li onClick={() => handleClickCell(3, 1)}>{game.board[3][1]}</li>
        <li onClick={() => handleClickCell(3, 2)}>{game.board[3][2]}</li>
        <li onClick={() => handleClickCell(3, 3)}>{game.board[3][3]}</li>
        <li onClick={() => handleClickCell(3, 4)}>{game.board[3][4]}</li>
        <li onClick={() => handleClickCell(3, 5)}>{game.board[3][5]}</li>
        <li onClick={() => handleClickCell(3, 6)}>{game.board[3][6]}</li>
        <li onClick={() => handleClickCell(3, 7)}>{game.board[3][7]}</li>
        <li onClick={() => handleClickCell(4, 0)}>{game.board[4][0]}</li>
        <li onClick={() => handleClickCell(4, 1)}>{game.board[4][1]}</li>
        <li onClick={() => handleClickCell(4, 2)}>{game.board[4][2]}</li>
        <li onClick={() => handleClickCell(4, 3)}>{game.board[4][3]}</li>
        <li onClick={() => handleClickCell(4, 4)}>{game.board[4][4]}</li>
        <li onClick={() => handleClickCell(4, 5)}>{game.board[4][5]}</li>
        <li onClick={() => handleClickCell(4, 6)}>{game.board[4][6]}</li>
        <li onClick={() => handleClickCell(4, 7)}>{game.board[4][7]}</li>
        <li onClick={() => handleClickCell(5, 0)}>{game.board[5][0]}</li>
        <li onClick={() => handleClickCell(5, 1)}>{game.board[5][1]}</li>
        <li onClick={() => handleClickCell(5, 2)}>{game.board[5][2]}</li>
        <li onClick={() => handleClickCell(5, 3)}>{game.board[5][3]}</li>
        <li onClick={() => handleClickCell(5, 4)}>{game.board[5][4]}</li>
        <li onClick={() => handleClickCell(5, 5)}>{game.board[5][5]}</li>
        <li onClick={() => handleClickCell(5, 6)}>{game.board[5][6]}</li>
        <li onClick={() => handleClickCell(5, 7)}>{game.board[5][7]}</li>
        <li onClick={() => handleClickCell(6, 0)}>{game.board[6][0]}</li>
        <li onClick={() => handleClickCell(6, 1)}>{game.board[6][1]}</li>
        <li onClick={() => handleClickCell(6, 2)}>{game.board[6][2]}</li>
        <li onClick={() => handleClickCell(6, 3)}>{game.board[6][3]}</li>
        <li onClick={() => handleClickCell(6, 4)}>{game.board[6][4]}</li>
        <li onClick={() => handleClickCell(6, 5)}>{game.board[6][5]}</li>
        <li onClick={() => handleClickCell(6, 6)}>{game.board[6][6]}</li>
        <li onClick={() => handleClickCell(6, 7)}>{game.board[6][7]}</li>
        <li onClick={() => handleClickCell(7, 0)}>{game.board[7][0]}</li>
        <li onClick={() => handleClickCell(7, 1)}>{game.board[7][1]}</li>
        <li onClick={() => handleClickCell(7, 2)}>{game.board[7][2]}</li>
        <li onClick={() => handleClickCell(7, 3)}>{game.board[7][3]}</li>
        <li onClick={() => handleClickCell(7, 4)}>{game.board[7][4]}</li>
        <li onClick={() => handleClickCell(7, 5)}>{game.board[7][5]}</li>
        <li onClick={() => handleClickCell(7, 6)}>{game.board[7][6]}</li>
        <li onClick={() => handleClickCell(7, 7)}>{game.board[7][7]}</li> */}
      </ul>
    </div>
  )
}
