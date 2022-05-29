function validateUserInput(gridSize)
{
    if (isNaN(gridSize) || (gridSize < 1 || gridSize > 100))
    {
        alert("That is an invalid number. Please enter a number in the range " + 
                "of 1 to 100.");

        return false;
    }

    return true;
}

function getNewGridSize()
{
    let isValidInput;

    do {
        gridSize = prompt("Enter a number n (in the range of 1 to 100) to " +
                "create a new grid of size nxn");
        isValidInput = validateUserInput(gridSize);
    } while (!isValidInput);

    return gridSize;
}

function clearGrid(gridContainer = document.querySelector('#grid-container'))
{
    while (gridContainer.hasChildNodes())
    {
        gridContainer.removeChild(gridContainer.lastChild);
    }
}

function addBehaviorToGridCells()
{
    const gridCells = document.querySelectorAll('.grid-cell');

    gridCells.forEach(gridCell => {
        gridCell.addEventListener('pointerover', (event) => {
            event.target.classList.add('hovered');
        })
    });
}

function createNewGrid()
{
    const gridContainer = document.querySelector('#grid-container');

    clearGrid(gridContainer);

    const gridSize = getNewGridSize();

    for (count = 0; count < gridSize; count++)
    {
        const div = document.createElement('div');
        div.classList.toggle('row');
        gridContainer.appendChild(div);
    }

    const rows = document.querySelectorAll('.row');

    rows.forEach((divElement) => {
        for (count = 0; count < gridSize; count++)
        {
            const div = document.createElement('div');
            div.classList.toggle('grid-cell');
            divElement.appendChild(div);
        }
    })

    // addBehaviorToGridCells();
    changeToRandomColor();
}

function initiateEtchASketch()
{
    const createNewGridButton = document.querySelector('#create-new-grid-button');
    createNewGridButton.addEventListener('click', createNewGrid);

    
}

function changeToRandomColor()
{
    const gridCells = document.querySelectorAll('.grid-cell');

    gridCells.forEach(gridCell => {
        gridCell.addEventListener('pointerover', (event) => {
            
            let randomRGBColor = `rgb(${getRandomNumber(255)}, ` +
                    `${getRandomNumber(255)}, ${getRandomNumber(255)})`;

            event.target.style.cssText = `background-color: ${randomRGBColor}`;
        })
    });
}

function getRandomNumber(highestNumberRange)
{
    return Math.floor(Math.random() * (highestNumberRange + 1));
}

initiateEtchASketch();