/*
    > Add a button to the top of the screen that will send the user a popup
    asking for the number of squares per side for the new grid.
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