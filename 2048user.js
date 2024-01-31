// Get the canvas element and its 2d context
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 4 * 100; // 30 columns, each cell is 20 pixels wide
canvas.height = 4 * 100; // 30 rows, each cell is 20 pixels high

// Example grid data
let grid = new Array(4).fill([]).map(() => new Array(4).fill(0));
grid[3][0]=2;
/*
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}*/

// Function to draw the grid
function drawGrid() {
    const cellSize = 100; // Size of each cell
    const borderSize = 6; // Size of the border
    let gridcolor=`rgb(187,187,187)`;
    let textcolor=`rgb(187,187,187)`;
    // Loop through the rows and columns of the grid
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const cellValue = grid[i][j];
            if (cellValue==2) {
                gridcolor=`rgb(218,217,184)`;
                textcolor='black';
            }
            else if (cellValue==4){
                gridcolor=`rgb(239,237,163)`;
                textcolor='black';
            }
            else if (cellValue==8){
                gridcolor=`rgb(254,191,167)`;
                textcolor='white';
            }
            else if (cellValue==16){
                gridcolor=`rgb(255,180,104)`;
                textcolor='white';
            }
            else if (cellValue==32){
                gridcolor=`rgb(255,142,142)`;
                textcolor='white';
            }
            else if (cellValue==64){
                gridcolor=`rgb(255,81,81)`;
                textcolor='white';
            }
            else if (cellValue==128){
                gridcolor=`rgb(255,255,111)`;
                textcolor='white';
            }
            else if (cellValue==256){
                gridcolor=`rgb(222,254,112)`;
                textcolor='white';
            }
            else if (cellValue==512){
                gridcolor=`rgb(194,251,2)`;
                textcolor='white';
            }
            else if (cellValue==1024){
                gridcolor=`rgb(148,190,1)`;
                textcolor='white';
            }
            else if (cellValue==2048){
                gridcolor=`rgb(126,163,1)`;
                textcolor='white';
            }
            else{ //(cellValue==0) {
                gridcolor=`rgb(187,187,187)`;
                textcolor=`rgb(187,187,187)`;   
            }
            ctx.fillStyle=gridcolor;
            // Draw the cell
            ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            ctx.fillStyle = textcolor;
            ctx.font = '30px Arial';
            ctx.fillText(`${grid[i][j]}`, j * cellSize + 35, i *cellSize+45);
            
            // Draw borders between cells
            ctx.fillStyle = `rgb(105,105,105)`;
            ctx.fillRect(j * cellSize, i * cellSize, cellSize, borderSize); 
            ctx.fillRect(j * cellSize, i * cellSize, borderSize, cellSize);
        }
    }
}

// Function to start rendering the grid
function startGrid() {
    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawGrid(); 
}

function updateGrid(moveoption) {
    if (moveoption==1){
        // Move non-zero elements to the right
        for (let i = 0; i < 4; i++) {
            let nonZeros = [];
            for (let j = 3; j >= 0; j--) {
                if (grid[i][j] != 0) {
                    nonZeros.push(grid[i][j]);
                    grid[i][j] = 0;
                }
            }
            let c = 3;
            for (let k = 0; k < nonZeros.length; k++) {
                grid[i][c] = nonZeros[k];
                c--;
            }
        }

        // Merge adjacent equal elements
        for (let i = 0; i < 4; i++) {
            for (let j = 3; j > 0; j--) {
                if (grid[i][j] == grid[i][j - 1]) {
                    grid[i][j] = grid[i][j] * 2;
                    grid[i][j - 1] = 0;
                }
            }
        }
        // Move non-zero elements to the right again
        for (let i = 0; i < 4; i++) {
            let nonZeros = [];
            for (let j = 3; j >= 0; j--) {
                if (grid[i][j] != 0) {
                    nonZeros.push(grid[i][j]);
                    grid[i][j] = 0;
                }
            }
            let c = 3;
            for (let k = 0; k < nonZeros.length; k++) {
                grid[i][c] = nonZeros[k];
                c--;
            }
        }
    }
    
    else if (moveoption==2){
        for (let i = 0; i < 4; i++){ //for i in range(0,4):
            let non_zeros=[];
            for (let j = 0; j < 4; j++){//for j in range(0,4):
                if (grid[i][j]!=0){
                    non_zeros.push(grid[i][j]);
                    grid[i][j]=0;
                }
            }
            for (let k = 0; k < grid.length; k++){//for k in range(0,len(non_zeros))
                grid[i][k]=non_zeros[k];
            }
        }
        for (let i = 0; i < 4; i++){ //for i in range(0,4):
            for (let j = 0; j < 3; j++){//for j in range(0,3):
                if (grid[i][j]==grid[i][j+1]){
                    grid[i][j]=grid[i][j]*2;
                    grid[i][j+1]=0;
                }
            }
        }
        for (let i = 0; i < 4; i++){
            let non_zeros=[];
            for (let j = 0; j < 4; j++){
                if (grid[i][j]!=0){
                    non_zeros.push(grid[i][j]);
                    grid[i][j]=0;
                }
            }
            for (let k = 0; k < grid.length; k++){
                grid[i][k]=non_zeros[k];
            }
        }
                
    }
    else if (moveoption==3){
        // Move non-zero elements to the top
        for (let i = 0; i < 4; i++) {
            let nonZeros = [];
            for (let j = 0; j < 4; j++) {
                if (grid[j][i] != 0) {
                    nonZeros.push(grid[j][i]);
                    grid[j][i] = 0;
                }
            }
            for (let k = 0; k < nonZeros.length; k++) {
                grid[k][i] = nonZeros[k];
            }
        }

        // Merge adjacent equal elements in the column
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[j][i] == grid[j + 1][i]) {
                    grid[j][i] = grid[j][i] * 2;
                    grid[j + 1][i] = 0;
                }
            }
        }

        // Move non-zero elements to the top again
        for (let i = 0; i < 4; i++) {
            let nonZeros = [];
            for (let j = 0; j < 4; j++) {
                if (grid[j][i] != 0) {
                    nonZeros.push(grid[j][i]);
                    grid[j][i] = 0;
                }
            }
            for (let k = 0; k < nonZeros.length; k++) {
                grid[k][i] = nonZeros[k];
            }
        }
    }
    
    else if (moveoption==4){
        // Move non-zero elements to the bottom
        for (let i = 0; i < 4; i++) {
            let nonZeros = [];
            for (let j = 3; j >= 0; j--) {
                if (grid[j][i] != 0) {
                    nonZeros.push(grid[j][i]);
                    grid[j][i] = 0;
                }
            }
            let c = 3;
            for (let k = 0; k < nonZeros.length; k++) {
                grid[c][i] = nonZeros[k];
                c--;
            }
        }

        // Merge adjacent equal elements in the column
        for (let i = 0; i < 4; i++) {
            for (let j = 3; j > 0; j--) {
                if (grid[j][i] == grid[j - 1][i]) {
                    grid[j][i] = grid[j][i] * 2;
                    grid[j - 1][i] = 0;
                }
            }
        }

        // Move non-zero elements to the bottom again
        for (let i = 0; i < 4; i++) {
            let nonZeros = [];
            for (let j = 3; j >= 0; j--) {
                if (grid[j][i] != 0) {
                    nonZeros.push(grid[j][i]);
                    grid[j][i] = 0;
                }
            }
            let c = 3;
            for (let k = 0; k < nonZeros.length; k++) {
                grid[c][i] = nonZeros[k];
                c--;
            }
        }
        
    }
    
    for (let i = 0; i < 4; i++){
        for (let j = 0; j < 4; j++){
            if (isNaN(grid[i][j]) || grid[i][j] === undefined) {
                grid[i][j] = 0;
            }
        }
    }
    //console.log(grid);
}



document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        let previousGrid=grid.map(row => [...row]);
        let gridsAreEqual = true;
        updateGrid(1);
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] !== previousGrid[i][j]) {
                    gridsAreEqual = false;
                    break;
                }
            }
            if (!gridsAreEqual) {
                break;
            }
        }
        
        if (gridsAreEqual==false){
            let m=Math.floor(Math.random() * 4);
            let n=Math.floor(Math.random() * 4);
            while (grid[m][n]!=0){
                m=Math.floor(Math.random() * 4);
                n=Math.floor(Math.random() * 4);
            }
            grid[m][n]=2;
        }
        // Clear the canvas before drawing the updated grid
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw the updated grid
        drawGrid();
    }
    else if (event.key === 'ArrowLeft') {
        let previousGrid=grid.map(row => [...row]);
        let gridsAreEqual = true;
        updateGrid(2);
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] !== previousGrid[i][j]) {
                    gridsAreEqual = false;
                    break;
                }
            }
            if (!gridsAreEqual) {
                break;
            }
        }
        
        if (gridsAreEqual==false){
            let m=Math.floor(Math.random() * 4);
            let n=Math.floor(Math.random() * 4);
            while (grid[m][n]!=0){
                m=Math.floor(Math.random() * 4);
                n=Math.floor(Math.random() * 4);
            }
            grid[m][n]=2;
        }
        // Clear the canvas before drawing the updated grid
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw the updated grid
        drawGrid();
    }
    if (event.key === 'ArrowUp') {
        let previousGrid=grid.map(row => [...row]);
        let gridsAreEqual = true;
        updateGrid(3);
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] !== previousGrid[i][j]) {
                    gridsAreEqual = false;
                    break;
                }
            }
            if (!gridsAreEqual) {
                break;
            }
        }
        
        if (gridsAreEqual==false){
            let m=Math.floor(Math.random() * 4);
            let n=Math.floor(Math.random() * 4);
            while (grid[m][n]!=0){
                m=Math.floor(Math.random() * 4);
                n=Math.floor(Math.random() * 4);
            }
            grid[m][n]=2;
        }
        // Clear the canvas before drawing the updated grid
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw the updated grid
        drawGrid();
    }
    if (event.key === 'ArrowDown') {
        let previousGrid=grid.map(row => [...row]);
        let gridsAreEqual = true;
        updateGrid(4);
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] !== previousGrid[i][j]) {
                    gridsAreEqual = false;
                    break;
                }
            }
            if (!gridsAreEqual) {
                break;
            }
        }
        
        if (gridsAreEqual==false){
            let m=Math.floor(Math.random() * 4);
            let n=Math.floor(Math.random() * 4);
            while (grid[m][n]!=0){
                m=Math.floor(Math.random() * 4);
                n=Math.floor(Math.random() * 4);
            }
            grid[m][n]=2;
        }
        // Clear the canvas before drawing the updated grid
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw the updated grid
        drawGrid();
    }
});