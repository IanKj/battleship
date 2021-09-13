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
        const orientation = battleShip.horizontal
        const startX = battleShip.startingCoords[0]
        const startY = battleShip.startingCoords[1]
        player.gameboard.placeShip(player.gameboard.board, size, startX, startY, player.gameboard, name, orientation)

    })
}

const battleShips = [
    {
        title: 'onefer',
        size: 1,
        startingCoords: [0, 0],
        horizontal: true
    },
    {
        title: 'twofer',
        size: 2,
        startingCoords: [8, 8],
        horizontal: false
    },
    {
        title: 'threefer',
        size: 3,
        startingCoords: [2, 2],
        horizontal: true
    },
    {
        title: 'fourfer',
        size: 4,
        startingCoords: [5, 5],
        horizontal: true
    },
    {
        title: 'fivefer',
        size: 5,
        startingCoords: [6, 0],
        horizontal: true
    }

]


