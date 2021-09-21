export { createGrid, addGridDivListener }
import { human, computer } from './index.js'
import { genRandomCoords } from './gameboard.js'

function createGrid(player) {
    let rows = player.gameboard.boardLength
    let cols = player.gameboard.boardWidth
    const gridContainer = document.querySelector(`.${player.type}Container`)
    gridContainer.style.setProperty('--grid-rows', rows);
    gridContainer.style.setProperty('--grid-cols', cols);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const gridDiv = document.createElement('div')
            gridDiv.dataset.coords = `${i},${j}`
            addGridDivListener(gridDiv, player.gameboard)
            gridContainer.appendChild(gridDiv).className = 'grid-item'
        }
    }
}

function addGridDivListener(gridDiv, board) {

    gridDiv.addEventListener('click', function () {
        let coordToArr = gridDiv.dataset.coords.split(',')
        computer.turn = true
        board.receiveAttack(coordToArr[0], coordToArr[1])
        console.log(computer)
    })
}




// alterative loop to generate grid divs = chose other loop to be consistent with previous code
// and to account for rows/cols
// for (let i = 0; i < rows * cols; i++) {
//     const gridDiv = document.createElement('div')
//     gridDiv.innerText = 'data'
//     gridContainer.appendChild(gridDiv).className = 'grid-item'
// }

