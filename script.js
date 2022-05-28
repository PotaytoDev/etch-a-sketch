/*
    > Add a button to the top of the screen that will send the user a popup
    asking for the number of squares per side for the new grid.

    index.html:

    Add button with text "Create new grid";

    **************

    script.js:

    function validateUserInput(gridSize)
    {
        let validInput = true;

        if (gridSize < 1 || gridSize > 100)
        {
            Alert to user that the number is invalid and show the available
            range of numbers to choose from.

            validInput = false;
        }

        return validInput;
    }

    function getNewGridSize()
    {
        let validInput = true;

        do {
            Prompt user for a number n that will produce an nxn grid size and
            store in variable gridSize;
            let isValidInput = validateUserInput(gridSize);
        } while (!validInput);

        return gridSize;
    }

    function clearGrid(gridContainer)
    {
        while the gridContainer has child nodes;
        {
            Remove the last child of gridContainer;
        }
    }

    function addBehaviorToGridCells()
    {
        const gridCells = document.querySelectorAll('.grid-cell');

        gridCells.forEach(gridCell => {
            gridCell.addEventListener('pointerover', (event) => {
                event.target.classList.add('hovered');
            })
        })
    }

    function createNewGrid(gridContainer)
    {
        const gridContainer = document.querySelector('#grid-container');

        Clear the current grid;
        const gridSize = getNewGridSize(gridContainer);

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

        addBehaviorToGridCells();
    }

    initiateEtchASketch()
    {
        Get reference to "create-new-grid-button";
        Add event listener 'click' to button with callback function
        createNewGrid;
    }
*/


const gridContainer = document.querySelector('#grid-container');

for (count = 0; count < 16; count++)
{
    const div = document.createElement('div');
    div.classList.toggle('row');
    gridContainer.appendChild(div);
}

const rows = document.querySelectorAll('.row');

rows.forEach((divElement) => {
    for (count = 0; count < 16; count++)
    {
        const div = document.createElement('div');
        div.classList.toggle('grid-cell');
        divElement.appendChild(div);
    }
})

const gridCells = document.querySelectorAll('.grid-cell');

gridCells.forEach(gridCell => {
    gridCell.addEventListener('pointerover', (event) => {
        event.target.classList.add('hovered');
    })
})