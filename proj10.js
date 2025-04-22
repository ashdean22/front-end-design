// Select the container it will be in and initialize game state
const puzzleContainer = document.querySelector('.puzzle-pieces');
const pieces = [];
let emptyPiece = 8;  // Track position of empty square (0-8, right bottom is 8)

function createPuzzle() {
    // Add instructions text
    puzzleContainer.parentElement.insertBefore(
        Object.assign(document.createElement('p'), {
            innerHTML: 'Arrange numbers from 1-8. Empty space at bottom right'
        }),
        puzzleContainer
    );

    puzzleContainer.parentElement.insertBefore(
        Object.assign(document.createElement('button'), {
            textContent: 'Check Solution',
            onclick: checkWin
        }),
        puzzleContainer
    );

    // Create array 0-8 and perform 3 random swaps for initial puzzle state
    const positions = Array.from({length: 9}, (_, i) => i);
    for (let i = 0; i < 3; i++) {
        // Only swap numbers 0-7 to keep empty space (8) at end
        const [pos1, pos2] = [Math.random() * 7 | 0, Math.random() * 7 | 0];
        [positions[pos1], positions[pos2]] = [positions[pos2], positions[pos1]];
    }

    // Create puzzle pieces
    positions.forEach((pos, i) => {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        
        if (pos !== 8) {
            // Calculate background image position for this piece
            // Each piece is 100x100px, positioned based on original position
            piece.style.backgroundImage = `url(./roger.jpg)`;
            piece.style.backgroundPosition = `-${pos % 3 * 100}px -${Math.floor(pos / 3) * 100}px`;
            piece.innerHTML = `<span>${pos + 1}</span>`;
        } else {
            // Mark the empty piece
            piece.classList.add('empty');
            emptyPiece = i;
        }
        
        piece.onclick = () => movePiece(i);
        pieces.push(piece);
        puzzleContainer.appendChild(piece);
    });
}

function movePiece(index) {
    // Check if clicked piece is adjacent to empty space
    // Uses math to determine if piece is directly above, below, left, or right
    const isAdjacent = Math.abs(index % 3 - emptyPiece % 3) + Math.abs(Math.floor(index / 3) - Math.floor(emptyPiece / 3)) === 1;
    
    if (isAdjacent) {
        // Swap the background images between the clicked piece and empty space
        // This uses array destructuring to swap values in a single line
        // Example: if clicked piece has "url(roger.jpg)" and empty has "none",
        // they will swap so that clicked piece gets "none" and empty gets "url(roger.jpg)"
        [pieces[index].style.backgroundImage, pieces[emptyPiece].style.backgroundImage] = 
        [pieces[emptyPiece].style.backgroundImage, pieces[index].style.backgroundImage];
        
        // Swap the position of the background images
        // Each piece shows a different part of the same image using backgroundPosition
        // Example: if clicked piece shows "-100px -0px" and empty shows "0px 0px",
        // they will swap their viewing "windows" of the background image
        [pieces[index].style.backgroundPosition, pieces[emptyPiece].style.backgroundPosition] = 
        [pieces[emptyPiece].style.backgroundPosition, pieces[index].style.backgroundPosition];
        
        // Number display
        [pieces[index].innerHTML, pieces[emptyPiece].innerHTML] = 
        [pieces[emptyPiece].innerHTML, pieces[index].innerHTML];
        
        // Update empty space tracking
        pieces[index].classList.toggle('empty');
        pieces[emptyPiece].classList.toggle('empty');
        emptyPiece = index;
    }
}

function checkWin() {
    // Check if puzzle is solved by verifying each piece
    const isWin = pieces.every((piece, i) => {
        // For the last position (i=8), check if it's the empty piece
        if (i === 8) {
            return piece.classList.contains('empty');
        }
        // For all other positions (0-7), check if the number matches its position
        // i=0 should have "1", i=1 should have "2", etc.
        // Add 1 because our display numbers start at 1, not 0
        return piece.textContent === String(i + 1);
    });

    if (isWin) {
        // Show victory celebration
        document.querySelector('.div3').insertAdjacentHTML('beforeend', `
            <div class="celebration">
                <div class="celebration-content">
                    <h2>🎉 Congratulations! 🎉</h2>
                    <p>You solved the puzzle!</p>
                    <button onclick="location.reload()">Play Again</button>
                </div>
            </div>
        `);
    } else {
        alert('Not quite right! Keep trying!');
    }
}

// Start game when page loads
window.onload = createPuzzle;
