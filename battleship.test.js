import { createShip } from './index.js'
import { createGameboard } from './gameboard.js'


test('ship takes a hit', () => {
    const myShip = createShip(5)
    myShip.hit(1)
    myShip.hit(2)
    expect(myShip.hitsTaken).toEqual({
        1: 'hit',
        2: 'hit',
        3: false,
        4: false,
        5: false
    })
})

test('initialize hits taken object', () => {
    const myShip = createShip(5)
    expect(myShip.hitsTaken).toEqual(
        {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false
        })
})

test('is ship sunk?', () => {
    const myShip = createShip(3)
    myShip.hitsTaken = {
        1: 'hit',
        2: 'hit',
        3: false,
        4: false,
        5: false
    }
    expect(myShip.isSunk()).toBe(false)
})

test('create a gameboard', () => {
    const gameboard = createGameboard(3, 3)
    expect(gameboard.board).toEqual([
        [{ shipPresent: false }, { shipPresent: false }, { shipPresent: false }],
        [{ shipPresent: false }, { shipPresent: false }, { shipPresent: false }],
        [{ shipPresent: false }, { shipPresent: false }, { shipPresent: false }]
    ])
})

test('place a ship', () => {
    const gameboard = createGameboard(3, 3)
    gameboard.placeShip(0, 0)
    expect(gameboard.board[0][0].ship).toHaveProperty('shipLength', 1)
    expect(gameboard.board[0][0].ship).toHaveProperty('sunkStatus', false)
    expect(gameboard.board[0][0].ship).toHaveProperty('hitsTaken')
})