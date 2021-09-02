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
            console.log(Object.values(this.hitsTaken))
            const shipStatus = Object.values(this.hitsTaken)
            function checkIfHit(boolean) {
                return boolean === true
            }
            return shipStatus.every(checkIfHit)
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
