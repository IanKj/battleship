export { createGameboard, checkIfWithinBounds, checkIfAllSunk, genRandomCoords }

import { createShip } from './createShip.js'
import { human, computer } from './index.js'

function createGameboard(l, w, type) {
    const gameBoard = {
        type,
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
    checkIfWithinBounds(currentBoard, length, startX, startY, isHorizontal)
    const newShip = createShip(length, startX, startY, shipTitle)
    gameboard.ships.push(newShip)
    newShip.coords = []
    const target = gameboard.type

    for (let i = 0; i < length; i++) {
        if (isHorizontal) {
            const coords = `${startX},${startY + i}`
            let currGridItem = document.querySelector(`.${target}Container [data-coords='${coords}']`)
            currGridItem.classList.add('shipPresent')
            newShip.coords.push(coords)
            currentBoard[startX][startY + i].shipPresent = shipTitle
            currentBoard[startX][startY + i].ship = newShip
        }
        else {
            const coords = `${startX + i},${startY}`
            let currGridItem = document.querySelector(`.${target}Container [data-coords='${coords}']`)
            currGridItem.classList.add('shipPresent')
            newShip.coords.push(coords)
            currentBoard[startX + i][startY].shipPresent = shipTitle
            currentBoard[startX + i][startY].ship = newShip
        }
    }
}

function checkIfWithinBounds(board, length, startX, startY, isHorizontal) {
    let withinBounds = true
    if (isHorizontal) {
        for (let i = startY; i < startY + length; i++) {
            if (!board[i]) {
                withinBounds = false
                throw Error(`${startX}, ${startY} with a length of ${length} is not within bounds`)
            }
        }
    }
    else {
        for (let i = startX; i < startX + length; i++) {
            if (!board[startX][i]) {
                withinBounds = false
                throw Error(`${startX}, ${startY} with a length of ${length} is not within bounds`)
            }
        }
    }
}

function receiveAttack(x, y, gameboard) {
    const target = gameboard.type
    console.log(target)
    let coordToString = `${x},${y}`
    gameboard.board[x][y].hit = true
    if (gameboard.board[x][y].shipPresent) {
        const currShip = gameboard.board[x][y].ship
        currShip.hit(x, y, target)
        if (checkIfAllSunk(gameboard)) {
            gameboard.allShipsSunk = true
        }
    }
    else {
        gameboard.missedShots.push([x, y])
        let currGrid = document.querySelector(`.${target}Container [data-coords="${coordToString}"]`)
        currGrid.classList.add('miss')

    }

    let [ranX, ranY] = genRandomCoords(human)
    console.log(computer)
    if (computer.turn == true) {
        computer.turn = false
        computer.computerAttack(human, ranX, ranY)
        console.log(computer)
    }

    return
}

//when player picks a spot
// player turn is false
//computer attack will only fire if player turn is false


const genRandomCoords = player => {
    console.log('inside genRandomCoords functin...')
    let coords = []
    const length = player.gameboard.boardLength
    const width = player.gameboard.boardWidth
    const ranX = Math.floor(Math.random() * length)
    const ranY = Math.floor(Math.random() * width)
    coords.push(ranX, ranY)
    if (!checkForDuplicateCoords(coords, player.gameboard.missedShots)) {
        return coords
    }
    else {

        console.log(`a duplicate coord was found: ${coords}`)
        coords = []
        genRandomCoords(player)
    }
}

function checkForDuplicateCoords(coords, missedShots) {
    let isDuplicate = false
    missedShots.forEach(missedShot => {
        if (arrayEquals(missedShot, coords)) {
            isDuplicate = true
        }
    })
    return isDuplicate
}

function checkIfAllSunk(gameboard) {
    return gameboard.ships.every(ship => ship.sunkStatus === true)
}

function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}