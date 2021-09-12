import { createPlayers } from './player.js'
import { createGrid } from './domStuff.js'

export { initGame }
function initGame() {
    const [human, computer] = createPlayers('human', 'computer', 10, 10)
    createGrid(human)
    createGrid(computer)
    placeBattleships(human, battleShips)
    placeBattleships(computer, battleShips)
    return [human, computer]
}

function placeBattleships(player, battleShips) {
    battleShips.forEach(battleShip => {
        const name = battleShip.title
        const size = battleShip.size
        const startX = battleShip.startingCoords[0]
        const startY = battleShip.startingCoords[1]
        player.gameboard.placeShip(player.gameboard.board, size, startX, startY, player.gameboard, name, false)

    })
}

const battleShips = [
    {
        title: 'onefer',
        size: 1,
        startingCoords: [0, 0]
    },
    {
        title: 'twofer',
        size: 2,
        startingCoords: [0, 1]
    },
    {
        title: 'threefer',
        size: 3,
        startingCoords: [0, 2]
    },
    {
        title: 'fourfer',
        size: 4,
        startingCoords: [0, 3]
    },
    {
        title: 'fivefer',
        size: 5,
        startingCoords: [0, 4]
    }

]


