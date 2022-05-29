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
                
        if (gridSize === null || gridSize === undefined || gridSize === '') return 0;

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

function enableSingleColorPaint()
{
    let isDrawing = false;
    const gridCells = document.querySelectorAll('.grid-cell');

    gridCells.forEach(gridCell => {
        gridCell.addEventListener('mousedown', (event) => {
            if (isDrawing)
            {
                isDrawing = false;
            }
            else
            {
                isDrawing = true;
                event.target.style.cssText = "background-color: #000000";
            }
        });

        gridCell.addEventListener('mouseover', (event) => {
            if (isDrawing)
            {
                event.target.style.cssText = "background-color: #000000";
            }
        });
    });
}

function createNewGrid()
{
    const gridContainer = document.querySelector('#grid-container');

    const gridSize = getNewGridSize();

    if (gridSize === 0) return;

    clearGrid(gridContainer);

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
}

function initiateEtchASketch()
{
    const createNewGridButton = document.querySelector('#create-new-grid-button');
    createNewGridButton.addEventListener('click', createNewGrid);

    const rainbowBrushButton = document.querySelector('#rainbow-brush-button');
    rainbowBrushButton.addEventListener('click', changeToRandomColor);

    const singleColorBrushButton = document.querySelector('#single-color-brush-button');
    singleColorBrushButton.addEventListener('click', enableSingleColorPaint);
}

function changeToRandomColor()
{
    let isDrawing = false;
    const gridCells = document.querySelectorAll('.grid-cell');

    gridCells.forEach(gridCell => {
        gridCell.addEventListener('mousedown', (event) => {
            let randomRGBColor = `rgb(${getRandomNumber(255)}, ` +
                    `${getRandomNumber(255)}, ${getRandomNumber(255)})`;

            if (isDrawing)
            {
                isDrawing = false;
            }
            else
            {
                isDrawing = true;
                
                // Only paint grid cell if it is not already painted when clicked
                event.target.style.cssText = `background-color: ${randomRGBColor}`;
            }
        })
        
        gridCell.addEventListener('mouseover', (event) => {
            if (isDrawing)
            {
                let randomRGBColor = `rgb(${getRandomNumber(255)}, ` +
                    `${getRandomNumber(255)}, ${getRandomNumber(255)})`;

                event.target.style.cssText = `background-color: ${randomRGBColor}`;
            }
        })
    });
}

function getRandomNumber(highestNumberRange)
{
    return Math.floor(Math.random() * (highestNumberRange + 1));
}

initiateEtchASketch();