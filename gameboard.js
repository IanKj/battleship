export { createGameboard, checkIfWithinBounds, checkIfAllSunk }

import { createShip } from './index.js'

function createGameboard(l, w) {
    const gameBoard = {
        board: genLayout(l, w),
        placeShip: function (board, length, startX, startY, gameboard, shipTitle) {
            placeShip(board, length, startX, startY, this, shipTitle)
        },
        receiveAttack: function (x, y) {
            receiveAttack(x, y, this)
        },
        ships: [],
        allShipsSunk: false
    }
    return gameBoard
}

function genLayout(l, w) {
    const board = []
    for (let i = 0; i < l; i++) {
        board.push([])
        for (let j = 0; j < w; j++) {
            const defaultGridItem = {
                shipPresent: false,
                hit: false
            }
            board[i].push(defaultGridItem)
        }
    }
    return board
}

function placeShip(currentBoard, length, startX, startY, gameboard, shipTitle) {
    checkIfWithinBounds(currentBoard, length, startX, startY)
    const newShip = createShip(length, startX, startY, shipTitle)
    gameboard.ships.push(newShip)
    currentBoard[startX][startY].shipPresent = shipTitle
    currentBoard[startX][startY].ship = newShip
}

function checkIfWithinBounds(gameboard, length, startX, startY) {
    let withinBounds = true
    for (let i = startY; i < startY + length; i++) {
        if (!gameboard[startX] || !gameboard[startX][i]) {
            withinBounds = false
        }
    }
    if (withinBounds === false) {
        throw Error('not within bounds')
    }
}

function receiveAttack(x, y, gameboard) {
    gameboard.board[x][y].hit = true
    const shipName = gameboard.board[x][y].shipPresent
    for (let ship of gameboard.ships) {
        if (ship.name === shipName) {
            ship.hit(x, y)
        }
    }
    checkIfAllSunk(gameboard)


}

function checkIfAllSunk(gameboard) {
    return gameboard.ships.every(ship => ship.isSunk === true)

}