import { createShip } from './createShip.js'

import { createGameboard } from './gameboard.js'

export { createPlayers, genRandomCoords }

function createPlayers(human, computer, l, w) {
    const players = [{
        type: human,
        gameboard: createGameboard(l, w, human),
        attack: function (target, x, y) {
            attack(target, x, y)
        },
    },
    {
        type: computer,
        gameboard: createGameboard(l, w, computer),
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
    let coords = []
    const length = player.gameboard.boardLength
    const width = player.gameboard.boardWidth
    const ranX = Math.floor(Math.random() * length)
    const ranY = Math.floor(Math.random() * width)
    coords.push(ranX, ranY)
    if (checkForDuplicateCoords(coords, player.gameboard.missedShots)) {
        console.log(`a duplicate coord was found: ${coords}`)
        coords = []
        genRandomCoords(player)
    }
    else {
        return coords
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
function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}