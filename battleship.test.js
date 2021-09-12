import { createShip } from './createShip.js'
import { createPlayers, genRandomCoords } from './player.js'
import { createGameboard, checkIfWithinBounds, checkIfAllSunk } from './gameboard.js'
import { initGame } from './gameLoop.js'

test('ship takes a hit', () => {
    const myShip = createShip(5)
    myShip.hit(1, 1)
    myShip.hit(1, 2)
    expect(myShip.hitsTaken).toEqual(
        [[1, 1], [1, 2], [], [], []]
    )
})

test('initialize hits taken object', () => {
    const myShip = createShip(5)
    expect(myShip.hitsTaken).toEqual(
        [[], [], [], [], []]
    )
})

test('is ship sunk?', () => {
    const myShip = createShip(1)
    myShip.hitsTaken =
        [[]]
    myShip.hit(0, 0)
    //expect(myShip.isSunk()).toBe(true)
    expect(myShip.sunkStatus).toBe(true)
})

test('is ship afloat?', () => {
    const myShip = createShip(3)
    myShip.hitsTaken =
        [[1, 1], [1, 2], [], [1, 4], [1, 5]]
    expect(myShip.isSunk()).toBe(false)
})


test('create a gameboard', () => {
    const gameboard = createGameboard(3, 3)
    expect(gameboard.board).toEqual([
        [{ shipPresent: false, hit: false }, { shipPresent: false, hit: false }, { shipPresent: false, hit: false }],
        [{ shipPresent: false, hit: false }, { shipPresent: false, hit: false }, { shipPresent: false, hit: false }],
        [{ shipPresent: false, hit: false }, { shipPresent: false, hit: false }, { shipPresent: false, hit: false }]
    ])
})

test('place a ship', () => {
    const gameboard = createGameboard(3, 3)
    gameboard.placeShip(gameboard.board, 2, 0, 0, gameboard, 'twofer')
    expect(gameboard.board[0][0].ship).toHaveProperty('shipLength', 2)
    expect(gameboard.ships[0]).toBeTruthy()
    expect(gameboard.board[0][0].shipPresent).toEqual('twofer')
    expect(gameboard.board[0][0].shipPresent).toBeTruthy()
})

test('not within bounds of gameboard', () => {
    const gameboard = createGameboard(3, 3)
    expect(() => {
        checkIfWithinBounds(gameboard.board, 2, 2, 2)
    }).toThrowError('not within bounds')

    expect(() => {
        gameboard.placeShip(gameboard.board, 2, 2, 2)
    }).toThrowError('not within bounds')
})

test('ship was attacked', () => {
    const gameboard = createGameboard(3, 3)
    gameboard.placeShip(gameboard.board, 2, 0, 0, gameboard, 'twofer')
    gameboard.receiveAttack(0, 0)
    expect((gameboard.board[0][0])).toHaveProperty('hit', true)
    expect((gameboard.ships[0].hitsTaken)).toEqual(
        [[0, 0], []]
    )
})

test('all ships are sunk', () => {
    const gameboard = createGameboard(3, 3)
    gameboard.placeShip(gameboard.board, 1, 0, 0, gameboard, 'onefer')
    gameboard.receiveAttack(0, 0)
    expect(gameboard.allShipsSunk).toEqual(true)
})

test('NOT all ships are sunk', () => {
    const gameboard = createGameboard(3, 3)
    gameboard.placeShip(gameboard.board, 1, 0, 0, gameboard, 'onefer')
    gameboard.placeShip(gameboard.board, 1, 1, 0, gameboard, 'secondShip')
    gameboard.receiveAttack(0, 0)
    expect(checkIfAllSunk(gameboard)).toBe(false)
    expect(gameboard.allShipsSunk).toEqual(false)
})

test('human player has a gameboard', () => {
    const players = createPlayers('human', 'computer', 1, 1)
    const [human, computer] = players
    expect(human).toHaveProperty('gameboard')
})

test('human attacks computer', () => {
    const players = createPlayers('human', 'computer', 1, 1)
    const [human, computer] = players
    computer.gameboard.placeShip(computer.gameboard.board, 1, 0, 0, computer.gameboard, 'onefer')
    human.attack(computer, 0, 0)
    expect(computer.gameboard.ships[0].sunkStatus).toEqual(true)
    expect(computer.gameboard.allShipsSunk).toEqual(true)
})

test.skip('computer attacks player automatically', () => {
    const players = createPlayers('human', 'computer', 1, 1)
    const [human, computer] = players
    computer.gameboard.placeShip(computer.gameboard.board, 1, 0, 0, computer.gameboard, 'onefer')
    const spy = jest.spyOn(computer, 'computerAttack')
    const computerAttacked = computer.computerAttack(human, 0, 0)
    human.attack(computer, 0, 0)
    expect(spy).toHaveBeenCalled()
})

test('computer sinks player battleship', () => {
    const players = createPlayers('human', 'computer', 1, 1)
    const [human, computer] = players
    computer.gameboard.placeShip(computer.gameboard.board, 1, 0, 0, computer.gameboard, 'onefer')
    human.gameboard.placeShip(human.gameboard.board, 1, 0, 0, human.gameboard, 'onefer')
    human.attack(computer, 0, 0)
    expect(human.gameboard.allShipsSunk).toBe(true)
})

test('log a missed player and computer shot', () => {
    const players = createPlayers('human', 'computer', 5, 5)
    const [human, computer] = players
    human.attack(computer, 0, 0)
    expect(computer.gameboard.missedShots[0]).toEqual([0, 0])
    expect(human.gameboard.missedShots[0]).toBeTruthy()
})

test.skip('computer fires follow up shot to duplicate shot', () => {
    const players = createPlayers('human', 'computer', 1, 2)
    const [human, computer] = players
    computer.computerAttack(human, 0, 0)

    const coords = genRandomCoords(human)
    console.log(coords)
    expect(coords).toEqual([0, 1])
})

test.skip('game starts w/comp and human player', () => {
    const game = initGame()
    const [human, computer] = game
    expect(human.type).toBe('human')
})

test.only('battleship placed on field', () => {
    const players = createPlayers('human', 'computer', 5, 5)
    const [human, computer] = players
    human.gameboard.placeShip(human.gameboard.board, 3, 0, 0, human.gameboard, 'threefer', true)
})