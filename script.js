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

function clearGrid(gridContainer)
{
    while (gridContainer.hasChildNodes())
    {
        gridContainer.removeChild(gridContainer.lastChild);
    }
}

function getRandomNumber(highestNumberRange)
{
    return Math.floor(Math.random() * (highestNumberRange + 1));
}

function getPaintColor(paintButton)
{
    let paintColor;

    // If rainbow paint is enabled, get a random paint color
    if (paintButton === 'rainbow-brush-button')
    {
        paintColor = `rgb(${getRandomNumber(255)}, ` +
            `${getRandomNumber(255)}, ${getRandomNumber(255)})`;
    }
    // If single color paint is enabled, get selected color from color well
    else if (paintButton === 'single-color-brush-button')
    {
        paintColor = document.querySelector('#color-well').value;
    }

    return paintColor;
}

function enablePaint(event)
{
    let isDrawing = false;
    let paintButton = event.target.id;

    function startAndStopPainting(event)
    {
        if (isDrawing)
        {
            isDrawing = false;
        }
        else
        {
            isDrawing = true;
            let paintColor = getPaintColor(paintButton);
            
            // Only paint grid cell if it is not already painted when clicked
            event.target.style.cssText = `background-color: ${paintColor}`;
        }
    }

    function continuePainting(event)
    {
        if (isDrawing)
        {
            let paintColor = getPaintColor(paintButton);
            event.target.style.cssText = `background-color: ${paintColor}`;
        }
    }

    // Clone entire grid and its children nodes in order to remove event
    // listeners from grid cells
    const gridContainer = document.querySelector('#grid-container');
    gridContainer.replaceWith(gridContainer.cloneNode(true));

    const gridCells = document.querySelectorAll('.grid-cell');

    gridCells.forEach(gridCell => {
        gridCell.addEventListener('mousedown', startAndStopPainting);
        gridCell.addEventListener('mouseover', continuePainting);
    });
}

function createNewGrid()
{
    const gridContainer = document.querySelector('#grid-container');
    const gridSize = getNewGridSize();

    if (gridSize === 0) return;

    clearGrid(gridContainer);

    // Create rows in grid that will hold the grid cells
    for (count = 0; count < gridSize; count++)
    {
        const div = document.createElement('div');
        div.classList.toggle('row');
        gridContainer.appendChild(div);
    }

    const rows = document.querySelectorAll('.row');

    // Add to each row the amount of grid cells specified by gridSize
    rows.forEach((divElement) => {
        for (count = 0; count < gridSize; count++)
        {
            const div = document.createElement('div');
            div.classList.toggle('grid-cell');
            divElement.appendChild(div);
        }
    })
}

function enableSingleButton(event)
{
    document.querySelectorAll('button').forEach(button => {
        button.classList.remove('active')
    });
    
    // Only add 'active' class to button if it is not the create-new-grid button
    if (event.target.id !== 'create-new-grid-button')
    {
        event.target.classList.add('active');
    }
}

function initiateEtchASketch()
{
    const paintButtons = document.querySelectorAll('button');
    paintButtons.forEach(button => {
        button.addEventListener('click', enableSingleButton);
    })
    
    const createNewGridButton = document.querySelector('#create-new-grid-button');
    createNewGridButton.addEventListener('click', createNewGrid);

    const rainbowBrushButton = document.querySelector('#rainbow-brush-button');
    rainbowBrushButton.addEventListener('click', enablePaint);

    const singleColorBrushButton = document.querySelector('#single-color-brush-button');
    singleColorBrushButton.addEventListener('click', enablePaint);
}

initiateEtchASketch();