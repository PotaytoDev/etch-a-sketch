/*
    > Set up a “hover” effect so that the grid divs change color when your
    mouse passes over them, leaving a (pixelated) trail through your grid like
    a pen would.

        script.js:

        Get reference for nodelist of "grid-cell" divs;
        forEach of the elements in nodelist:
            .addEventListener('pointerover', (event) => {
                event.target.classList.toggle('hovered');
            })

        *******************
        styles.css:

        .hovered {
            background-color: black;
        }

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
        div.textContent = count + 1;
        divElement.appendChild(div);
    }
})