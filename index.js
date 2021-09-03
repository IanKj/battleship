export { createShip }

function createShip(length) {
    const ship = {
        shipLength: length,
        sunkStatus: false,
        hitsTaken: initializeHitsTaken(length),
        hit: function (locationHit) {
            this.hitsTaken[locationHit] = 'hit'
        },
        isSunk: function () {
            return isSunk(this)
        }
    }
    return ship
}

function initializeHitsTaken(length) {
    const hitsTaken = {}
    for (let i = 1; i < length + 1; i++) {
        hitsTaken[i] = false
    }
    return hitsTaken
}
function isSunk(currentShip) {
    console.log(Object.values(currentShip.hitsTaken))
    const shipStatus = Object.values(currentShip.hitsTaken)
    function checkIfHit(boolean) {
        return boolean === true
    }
    return shipStatus.every(checkIfHit)
}