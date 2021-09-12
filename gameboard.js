export { createGameboard, checkIfWithinBounds, checkIfAllSunk }

import { createShip } from './createShip.js'

function createGameboard(l, w) {
    const gameBoard = {
        board: genLayout(l, w),
        boardLength: l,
        boardWidth: w,
        missedShots: [],
        placeShip: function (board, length, startX, startY, gameboard, shipTitle, isHorizontal) {
            placeShip(board, length, startX, startY, this, shipTitle, isHorizontal)
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
            const gridItem = {
                shipPresent: false,
                hit: false,
                coords: `${i},${j}`
            }
            board[i].push(gridItem)
        }
    }
    return board
}

function placeShip(currentBoard, length, startX, startY, gameboard, shipTitle, isHorizontal) {
    checkIfWithinBounds(currentBoard, length, startX, startY)
    const newShip = createShip(length, startX, startY, shipTitle)
    gameboard.ships.push(newShip)
    newShip.coords = []

    for (let i = 0; i < length; i++) {
        if (isHorizontal) {
            const coords = `${startX},${startY + i}`
            let currGridItem = document.querySelector(`[data-coords='${coords}']`)
            currGridItem.classList.add('shipPresent')
            newShip.coords.push(coords)
            currentBoard[startX][startY + i].shipPresent = shipTitle
            currentBoard[startX][startY + i].ship = newShip
        }
        else {
            const coords = `${startX + i},${startY}`
            let currGridItem = document.querySelector(`[data-coords='${coords}']`)
            currGridItem.classList.add('shipPresent')
            newShip.coords.push(coords)
            currentBoard[startX + i][startY].shipPresent = shipTitle
            currentBoard[startX + i][startY].ship = newShip
        }
    }
}

function checkIfWithinBounds(gameboard, length, startX, startY) {
    let withinBounds = true
    for (let i = startY; i < startY + length; i++) {
        if (!gameboard[startX] || !gameboard[startX][i]) {
            withinBounds = false
            throw Error(`${startX} or ${startX},${[i]} not within bounds`)
        }
    }
}

function receiveAttack(x, y, gameboard) {
    gameboard.board[x][y].hit = true
    if (gameboard.board[x][y].shipPresent) {
        const shipName = gameboard.board[x][y].shipPresent
        for (let ship of gameboard.ships) {
            if (ship.name === shipName) {
                ship.hit(x, y)
                if (checkIfAllSunk(gameboard)) {
                    gameboard.allShipsSunk = true
                }
            }
        }
    }
    else {
        gameboard.missedShots.push([x, y])
    }
}

function checkIfAllSunk(gameboard) {
    return gameboard.ships.every(ship => ship.sunkStatus === true)
}