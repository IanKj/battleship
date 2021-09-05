export { createShip }

function createShip(length, startX, startY, shipTitle) {
    const ship = {
        name: shipTitle,
        shipLength: length,
        hitsTaken: initializeHitsTaken(length),
        sunkStatus: false,
        hit: function (x, y) {
            for (let position of this.hitsTaken) {
                if (!position[0]) {
                    position.push(x, y)
                    if (isSunk(this)) {
                        this.sunkStatus = true
                    }
                    break
                }
            }
        },
        isSunk: function () {
            return isSunk(this)
        }
    }
    return ship
}

function initializeHitsTaken(length) {
    const hitsTaken = []
    for (let i = 0; i < length; i++) {
        hitsTaken.push([])
    }
    return hitsTaken
}
function isSunk(currentShip) {
    const shipStatus = currentShip.hitsTaken
    function checkIfHit(arr) {
        return arr[0]
    }
    return shipStatus.every(checkIfHit)
}
