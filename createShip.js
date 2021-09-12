export { createShip }

function createShip(length, startX, startY, shipTitle) {
    const ship = {
        name: shipTitle,
        shipLength: length,
        // hitsTaken: initializeHitsTaken(length),
        hitsTaken: [],
        sunkStatus: false,
        hit: function (x, y) {
            console.log('hit!')
            let coordToString = `${x},${y}`
            if (!this.hitsTaken.includes(coordToString)) {
                this.hitsTaken.push(coordToString)

            }
            if (isSunk(this)) {
                this.sunkStatus = true
            }
            // for (let position of this.hitsTaken) {
            //     if (!position.length) {
            //         position.push(x, y)
            //         if (isSunk(this)) {
            //             this.sunkStatus = true
            //         }
            //         break
            //     }
            // }
            console.log(this)
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
    return currentShip.shipLength === currentShip.hitsTaken.length
    // const shipStatus = currentShip.hitsTaken
    // function checkIfHit(arr) {
    //     return arr.length
    // }
    // return shipStatus.every(checkIfHit)
}
