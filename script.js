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

function getColorValues(colorString)
{
    // Replace string with an array of strings of each different value in RGB
    colorString = colorString.substring(colorString.indexOf('(') + 1,
            colorString.indexOf(')'));
    colorString = colorString.split(',');

    // Convert array of strings into array of numbers and return it
    return colorString.map((item) => Number(item));
}

function calculateNewColorValue(originalValue, currentValue)
{
    let newValue = currentValue - (originalValue / 10)

    return (newValue < 0 ? 0 : newValue);
}

function getDarkenedColor(originalColor, currentColor)
{
    redValue = calculateNewColorValue(originalColor[0], currentColor[0]);
    greenValue = calculateNewColorValue(originalColor[1], currentColor[1]);
    blueValue = calculateNewColorValue(originalColor[2], currentColor[2]);

    return `rgb(${redValue}, ${greenValue}, ${blueValue})`;
}

function getPaintColor(event, paintButton)
{
    let paintColor;

    // If rainbow paint is enabled, get a random paint color
    if (paintButton === 'rainbow-brush-button')
    {
        paintColor = `rgb(${getRandomNumber(255)}, ${getRandomNumber(255)}, ` +
                `${getRandomNumber(255)})`;
    }
    // If single color paint is enabled, get selected color from color well
    else if (paintButton === 'single-color-brush-button')
    {
        paintColor = document.querySelector('#color-well').value;
    }
    // Darken brush will darken the current color of a grid cell by 10% each time
    else if (paintButton === 'darken-brush-button')
    {
        // Store original cell color as property of event target so it will remain
        // static and be used as a base for new color calculations
        if (!event.target.originalColor)
        {
            event.target.originalColor = event.target.style.backgroundColor;
        }

        let originalCellColor = getColorValues(event.target.originalColor);
        let currentCellColor = getColorValues(event.target.style.backgroundColor);

        paintColor = getDarkenedColor(originalCellColor, currentCellColor);
    }
    else if (paintButton === 'eraser-button')
    {
        paintColor = document.querySelector('#canvas-color-well').value;
        event.target.classList.remove('painted');
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
            event.target.classList.add('painted');
            let paintColor = getPaintColor(event, paintButton);
            
            // Only paint grid cell if it is not already painted when clicked
            event.target.style.backgroundColor = `${paintColor}`;
        }
    }

    function continuePainting(event)
    {
        if (isDrawing)
        {
            event.target.classList.add('painted');
            let paintColor = getPaintColor(event, paintButton);
            event.target.style.backgroundColor = `${paintColor}`;
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
    });

    changeCanvasColor();
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

function changeCanvasColor()
{
    const gridCells = document.querySelectorAll('.grid-cell');
    const canvasColorWell = document.querySelector('#canvas-color-well');

    gridCells.forEach(gridCell => {
        if (!gridCell.classList.contains('painted'))
        {
            gridCell.style.backgroundColor = `${canvasColorWell.value}`;
        }
    });
}

function toggleBorders()
{
    const gridCells = document.querySelectorAll('.grid-cell');

    gridCells.forEach(gridCell => {
        if (gridCell.style.border === 'none')
        {
            gridCell.style.border = "1px solid #E5C2CB";
        }
        else
        {
            gridCell.style.border = "none";
        }
    });
}

function initiateEtchASketch()
{
    const paintButtons = document.querySelectorAll('button');
    paintButtons.forEach(button => {
        button.addEventListener('click', enableSingleButton);
    });
    
    const createNewGridButton = document.querySelector('#create-new-grid-button');
    createNewGridButton.addEventListener('click', createNewGrid);

    const rainbowBrushButton = document.querySelector('#rainbow-brush-button');
    rainbowBrushButton.addEventListener('click', enablePaint);

    const singleColorBrushButton = document.querySelector('#single-color-brush-button');
    singleColorBrushButton.addEventListener('click', enablePaint);

    const darkenBrushButton = document.querySelector('#darken-brush-button');
    darkenBrushButton.addEventListener('click', enablePaint);

    const eraserButton = document.querySelector('#eraser-button');
    eraserButton.addEventListener('click', enablePaint);

    const canvasColorButton = document.querySelector('#canvas-color-button');
    canvasColorButton.addEventListener('click', changeCanvasColor);

    const toggleBordersButton = document.querySelector('#toggle-borders-button');
    toggleBordersButton.addEventListener('click', toggleBorders);
}

initiateEtchASketch();