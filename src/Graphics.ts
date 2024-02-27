// // grab the canvas element 
// const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
// // create a 2d context
// const ctx = canvas.getContext('2d');

// // check if the context is null
// if (!ctx) {
//     throw new Error('Failed to get 2D context');
// }

// // set the canvas size
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// // draw a rectangle that takes up a third of the canvas and is centered
// const RIVER_WIDTH = canvas.width / 3;
// const RIVER_HEIGHT = canvas.height;
// const RIVER_X = (canvas.width - RIVER_WIDTH) / 2;
// const RIVER_Y = 0;

// // draw a grid of non fill squares inside the river
// const SQUARE_SIZE = 25;

// // calculate the number of squares that can fit into the width and height
// let squaresPerRow = Math.round(RIVER_WIDTH / SQUARE_SIZE);
// let squaresPerColumn = Math.round(RIVER_HEIGHT / SQUARE_SIZE);

// // recalculate SQUARE_SIZE based on the rounded values
// let squareWidth = RIVER_WIDTH / squaresPerRow;
// let squareHeight = RIVER_HEIGHT / squaresPerColumn;

// let highlightedRow = -1;
// let highlightedColumn = -1;
// let lastHighlightedRow = -1;
// let lastHighlightedColumn = -1;

// canvas.addEventListener('mousemove', (event) => {
//     // calculate the mouse position relative to the canvas
//     const rect = canvas.getBoundingClientRect();
//     const mouseX = event.clientX - rect.left - RIVER_X;
//     const mouseY = event.clientY - rect.top - RIVER_Y;

//     // calculate which grid box the mouse is over
//     highlightedRow = Math.floor(mouseX / squareWidth);
//     highlightedColumn = Math.floor(mouseY / squareHeight);

//     // request a redraw
//     requestAnimationFrame(drawGrid);
// });

// function drawGrid() {
//     // redraw the previously highlighted square
//     if (lastHighlightedRow !== -1 && lastHighlightedColumn !== -1) {
//         ctx!.fillStyle = 'lightblue';
//         ctx!.fillRect(RIVER_X + lastHighlightedRow * squareWidth, RIVER_Y + lastHighlightedColumn * squareHeight, squareWidth, squareHeight);
//         ctx!.strokeStyle = 'black';
//         ctx!.strokeRect(RIVER_X + lastHighlightedRow * squareWidth, RIVER_Y + lastHighlightedColumn * squareHeight, squareWidth, squareHeight);
//     }

//     // draw the newly highlighted square
//     if (highlightedRow !== -1 && highlightedColumn !== -1) {
//         ctx!.fillStyle = 'lightblue';
//         ctx!.fillRect(RIVER_X + highlightedRow * squareWidth, RIVER_Y + highlightedColumn * squareHeight, squareWidth, squareHeight);
//         ctx!.strokeStyle = 'red';
//         ctx!.strokeRect(RIVER_X + highlightedRow * squareWidth, RIVER_Y + highlightedColumn * squareHeight, squareWidth, squareHeight);
//     }

//     // update the last highlighted square
//     lastHighlightedRow = highlightedRow;
//     lastHighlightedColumn = highlightedColumn;
// }

// // initial draw
// drawGrid();