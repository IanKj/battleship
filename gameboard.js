export { createGameboard }

import { createShip } from './index.js'

function createGameboard(l, w) {
    const gameBoard = {
        board: genLayout(l, w),
        placeShip: function (x, y) {
            placeShip(x, y, this.board)
        }
    }
    return gameBoard
}

function genLayout(l, w) {
    const board = []
    for (let i = 0; i < l; i++) {
        board.push([])
        for (let j = 0; j < w; j++) {
            const defaultGridItem = {
                shipPresent: false
            }
            board[i].push(defaultGridItem)
        }
    }
    return board
}

function placeShip(x, y, currentBoard) {
    const newShip = createShip(1)
    currentBoard[x][y].shipPresent = true
    currentBoard[x][y].ship = newShip
    console.log(currentBoard[x][y].ship)
}