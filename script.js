document.addEventListener("DOMContentLoaded", function() {
    const cells = document.querySelectorAll(".cell");
    const resultDisplay = document.getElementById("result");
    let currentPlayer = "X";
    let gameActive = true;
    let gameMode = "PvP"; // Default mode is Player vs Player

    // Function to check if a player has won
    const checkWinner = () => {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
                gameActive = false;
                resultDisplay.innerText = `${cells[a].innerText} wins!`;
                return true;
            }
        }
        return false;
    };

    // Function to check if the board is full
    const isBoardFull = () => {
        return Array.from(cells).every(cell => cell.innerText !== "");
    };

    // Function to generate the computer's move
    const computerMove = () => {
        if (!gameActive || currentPlayer !== "O" || gameMode !== "PvC") return;

        let emptyCells = Array.from(cells).filter(cell => cell.innerText === "");
        if (emptyCells.length === 0) return;

        // Randomly select an empty cell
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        emptyCells[randomIndex].innerText = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";

        if (!checkWinner() && isBoardFull()) {
            gameActive = false;
            resultDisplay.innerText = "It's a draw!";
        }
    };

    // Function to handle cell click event
    const handleCellClick = (cell) => {
        if (cell.innerText === "" && gameActive) {
            cell.innerText = currentPlayer;
            if (!checkWinner() && isBoardFull()) {
                gameActive = false;
                resultDisplay.innerText = "It's a draw!";
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                if (gameMode === "PvC") computerMove(); // Trigger computer's move only in PvC mode
            }
        }
    };

    // Function to reset the game
    const resetGame = () => {
        cells.forEach(cell => {
            cell.innerText = "";
        });
        resultDisplay.innerText = "";
        currentPlayer = "X";
        gameActive = true;
    };

    // Function to handle Player vs Player mode
    const handlePlayerVsPlayer = () => {
        gameMode = "PvP"; // Set mode to Player vs Player
        cells.forEach(cell => {
            cell.removeEventListener("click", handleCellClick); // Remove any previous event listeners
            cell.addEventListener("click", () => {
                handleCellClick(cell);
            });
        });
        resetGame();
    };

    // Function to handle Player vs Computer mode
    const handlePlayerVsComputer = () => {
        gameMode = "PvC"; // Set mode to Player vs Computer
        cells.forEach(cell => {
            cell.removeEventListener("click", handleCellClick); // Remove any previous event listeners
            cell.addEventListener("click", () => {
                handleCellClick(cell);
            });
        });
        resetGame();
    };

    // Event listener for mode buttons
    document.getElementById("playerVsPlayer").addEventListener("click", handlePlayerVsPlayer);
    document.getElementById("playerVsComputer").addEventListener("click", handlePlayerVsComputer);
});
