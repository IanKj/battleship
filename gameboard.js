export { createGameboard }

import { createShip } from './index.js'

function createGameboard(l, w) {
    const gameBoard = {
        board: genLayout(l, w),
        // placeShip: function (x, y) {
        //     return placeShip(x, y, this)
        // }
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

// function placeShip(x, y, curentShip) {
//     console.log(currentShip)
//     const newShip = createShip(1)

// }