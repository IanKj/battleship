import { createShip } from './index.js'
import { createGameboard, checkIfWithinBounds, checkIfAllSunk } from './gameboard.js'


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
    const myShip = createShip(3)
    myShip.hitsTaken =
        [[1, 1], [1, 2], [1, 3], [1, 4], []]
    myShip.hit(1, 5)
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
    expect(() => {
        checkIfAllSunk(gameboard)
    }).toBe(true)
})

test('NOT all ships are sunk', () => {
    const gameboard = createGameboard(3, 3)
    gameboard.placeShip(gameboard.board, 1, 0, 0, gameboard, 'onefer')
    gameboard.placeShip(gameboard.board, 1, 1, 0, gameboard, 'secondShip')
    gameboard.receiveAttack(0, 0)
    expect(() => {
        checkIfAllSunk(gameboard)
    }).toBe(false)
})
