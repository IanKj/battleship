import { createShip } from './createShip.js'

import { createGameboard } from './gameboard.js'

export { createPlayers }


function createPlayers(human, computer, l, w) {
    const players = [{
        type: human,
        // turn: true,
        gameboard: createGameboard(l, w, human),
        attack: function (target, x, y) {
            attack(target, x, y)
        },
    },
    {
        type: computer,
        //turn: false,
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
    // if (target.type == 'computer') {
    //     const [ranX, ranY] = genRandomCoords(target.opponent)
    //     target.computerAttack(target.opponent, ranX, ranY)
    // }
}




