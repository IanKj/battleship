export { createShip }

function createShip(length, startX, startY, shipTitle) {
    const ship = {
        name: shipTitle,
        shipLength: length,
        hitsTaken: [],
        sunkStatus: false,
        hit: function (x, y, target) {
            console.log('hit!')
            let coordToString = `${x},${y}`
            if (!this.hitsTaken.includes(coordToString)) {
                this.hitsTaken.push(coordToString)
                let currGrid = document.querySelector(`.${target}Container [data-coords="${coordToString}"]`)
                currGrid.classList.add('hit')
            }
            if (isSunk(this)) {
                this.sunkStatus = true
                this.hitsTaken.forEach(hit => {
                    let currGrid = document.querySelector(`.${target}Container [data-coords="${hit}"]`)
                    currGrid.classList.add('sunken')
                    currGrid.classList.remove('shipPresent')
                })
            }
        },
        isSunk: function () {
            return isSunk(this)
        }
    }
    return ship
}

function isSunk(currentShip) {
    return currentShip.shipLength === currentShip.hitsTaken.length
}
