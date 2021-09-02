import { createShip } from './index.js'


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