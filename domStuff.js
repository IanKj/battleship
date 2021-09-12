export { createGrid, addGridDivListener }

function createGrid(board) {
    let rows = board.boardLength
    let cols = board.boardWidth
    const gridContainer = document.querySelector('.gridContainer')
    gridContainer.style.setProperty('--grid-rows', rows);
    gridContainer.style.setProperty('--grid-cols', cols);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const gridDiv = document.createElement('div')
            gridDiv.dataset.coords = `${i},${j}`
            addGridDivListener(gridDiv, board)
            gridContainer.appendChild(gridDiv).className = 'grid-item'
        }
    }
}

function addGridDivListener(gridDiv, board) {
    gridDiv.addEventListener('click', function () {
        findCoordMatch(board, gridDiv)
    })
}

// when board is clicked
// run loop of gameboard.board 
// find match 
function findCoordMatch(board, gridDiv) {
    for (let i = 0; i < board.boardLength; i++) {
        for (let j = 0; j < board.boardWidth; j++) {
            let currPos = board.board[i][j]
            if (currPos.shipPresent && currPos.coords === gridDiv.dataset.coords) {
                console.log('found a match at ' + currPos.coords + ' belonging to ' + currPos.ship)
                let coordArr = currPos.coords.split(',')
                currPos.ship.hit(coordArr[0], coordArr[1])
            }
        }
    }
}


// alterative loop to generate grid divs = chose other loop to be consistent with previous code
// and to account for rows/cols
    // for (let i = 0; i < rows * cols; i++) {
    //     const gridDiv = document.createElement('div')
    //     gridDiv.innerText = 'data'
    //     gridContainer.appendChild(gridDiv).className = 'grid-item'
    // }


