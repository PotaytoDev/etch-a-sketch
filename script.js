/*
    > Create a webpage with a 16x16 grid of square divs.

        index.html:

        Add "container" div to HTML to hold the grid of divs;

        *******************
        script.js:

        Get reference for "container" div and store in container variable;
        for (count = 0; count < 16; count++)
            Create div element;
            Add class "row" to div;
            Append div as child to container div;

        Get reference for nodelist of "row" elements;
        forEach of the elements in the nodelist:
            for (count = 0; count < 16; count++)
                Create a new div element;
                Add class "grid-cell" to div;
                Append div as child to each div with class "row";
        
        *******************
        styles.css:

        .container {
            max-width: 2000px;
        }

        .row {
            display: flex;
            min-height: 3px;
        }


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