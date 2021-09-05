import { createShip } from './createShip.js'

import { createGameboard } from './gameboard.js'

export { createPlayers }

// create a player as object
//create a computer as object
//each has their own board generated
//

function createPlayers(human, computer, l, w) {
    const players = [{
        type: human,
        gameboard: createGameboard(l, w),
        attack: function (target, x, y) {
            attack(target, x, y)
        },


    },
    {
        type: computer,
        gameboard: createGameboard(l, w),
        computerAttack: function (human, x, y) {
            attack(human, x, y)
        }
    }
    ]
    players[0].opponent = players[1]
    players[1].opponent = players[0]
    return players
}

function attack(target, x, y) {
    target.gameboard.receiveAttack(x, y)
    if (target.type == 'computer') {
        const [ranX, ranY] = genRandomCoords(target.opponent)
        target.computerAttack(target.opponent, ranX, ranY)
    }
}

function genRandomCoords(player) {
    const coords = []
    const length = player.gameboard.boardLength
    const width = player.gameboard.boardWidth
    const ranX = Math.floor(Math.random() * length)
    const ranY = Math.floor(Math.random() * width)
    coords.push(ranX, ranY)
    //checkForDuplicateCoords(coords, player.gameboard.missedShots)
    return coords
}

// function checkForDuplicateCoords(coords, gameboard) {
//     let isDuplicate = false
//     gameboard.missedShots.forEach(missedShot => {
//         if (arrayEquals(missedShot, coords)) {
//             isDuplicate = true
//         }
//     })
//     return isDuplicate
// }
// function arrayEquals(a, b) {
//     return Array.isArray(a) &&
//         Array.isArray(b) &&
//         a.length === b.length &&
//         a.every((val, index) => val === b[index]);
// }
//check if coords have already been hit
//loop over missed shots array
// if current coords match any of the missed shots
// use recursion and call genRandomCoords again