// Tic Tac Toe Game
document.addEventListener('DOMContentLoaded', function() {
    // Game state variables
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let scores = { X: 0, O: 0, tie: 0 };
    let vsComputer = true;
    let gameMode = 'computer'; // 'player' or 'computer'
    let turnTimer = null;
    let timeLeft = 2; // seconds
    let playerMoves = { X: [], O: [] }; // Track each player's moves (stack)
    
    // DOM elements
    const gameBoardElement = document.getElementById('game-board');
    const playerTurnElement = document.getElementById('player-turn');
    const gameStatusElement = document.getElementById('game-status');
    const scoreXElement = document.getElementById('score-x');
    const scoreOElement = document.getElementById('score-o');
    const scoreTieElement = document.getElementById('score-tie');
    const newGameButton = document.getElementById('new-game');
    const resetScoresButton = document.getElementById('reset-scores');
    const toggleModeButton = document.getElementById('toggle-mode');
    const visitorCountElement = document.getElementById('visitor-count');
    
    // Visitor counter function
    function updateVisitorCounter() {
        let visitorCount = localStorage.getItem('ticTacToeVisitors');
        if (!visitorCount) {
            visitorCount = 1;
        } else {
            visitorCount = parseInt(visitorCount) + 1;
        }
        localStorage.setItem('ticTacToeVisitors', visitorCount);
        
        if (visitorCountElement) {
            visitorCountElement.textContent = visitorCount;
        }
        
        // Add subtle animation effect
        if (visitorCountElement) {
            visitorCountElement.style.transform = 'scale(1.2)';
            setTimeout(() => {
                visitorCountElement.style.transform = 'scale(1)';
            }, 300);
        }
    }
    
    // Winning combinations
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    // Initialize the game
    function initGame() {
        createBoard();
        updatePlayerTurn();
        // Update button and status based on vsComputer
        toggleModeButton.innerHTML = vsComputer ?
            '<i class="fas fa-user-friends"></i> vs Player' :
            '<i class="fas fa-robot"></i> vs AI';
        updateGameStatus(vsComputer ?
            'Playing against AI. You are X!' :
            'Playing against another player. Player X goes first!');
        loadScoresFromStorage();
        updateScoreDisplay();
        attachEventListeners();
        // Add timer display to player turn element (hidden by default)
        const timerDisplay = document.createElement('span');
        timerDisplay.id = 'timer-display';
        timerDisplay.className = 'timer-display';
        timerDisplay.textContent = ' (2s)';
        timerDisplay.style.display = 'none'; // Hide timer as requested
        playerTurnElement.appendChild(timerDisplay);
        
        // Update visitor counter
        updateVisitorCounter();
        
        // Start timer for first player
        startTurnTimer();
    }
    
    // Timer functions
    function startTurnTimer() {
        // Clear any existing timer
        stopTurnTimer();
        
        // Reset time to 2 seconds
        timeLeft = 2;
        updateTimerDisplay();
        
        // Start new timer
        turnTimer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                stopTurnTimer();
                handleTurnTimeout();
            }
        }, 1000);
    }
    
    function stopTurnTimer() {
        if (turnTimer) {
            clearInterval(turnTimer);
            turnTimer = null;
        }
    }
    
    function updateTimerDisplay() {
        const timerDisplay = document.getElementById('timer-display');
        if (timerDisplay) {
            timerDisplay.textContent = ` (${timeLeft}s)`;
            
            // Change color based on time left (2 seconds total)
            if (timeLeft <= 1) {
                timerDisplay.style.color = '#ff416c'; // Red for 1 second or less
                timerDisplay.style.fontWeight = 'bold';
            } else {
                timerDisplay.style.color = '#ffcc00'; // Yellow for 2 seconds
                timerDisplay.style.fontWeight = 'bold';
            }
        }
    }
    
    function handleTurnTimeout() {
        if (!gameActive) return;
        
        const player = currentPlayer;
        const moves = playerMoves[player];
        
        // If this player has no moves, nothing to erase
        if (moves.length === 0) return;
        
        // Get the last move (most recent)
        const moveIndex = moves.pop();
        
        // Verify the move still belongs to this player
        if (gameBoard[moveIndex] !== player) {
            // If not, try to find another move
            for (let i = moves.length - 1; i >= 0; i--) {
                const idx = moves[i];
                if (gameBoard[idx] === player) {
                    moves.splice(i, 1); // Remove this move from array
                    const cell = document.querySelector(`.cell[data-index="${idx}"]`);
                    if (cell) {
                        removeMoveWithAnimation(cell, idx, player);
                    }
                    return;
                }
            }
            return;
        }
        
        const cell = document.querySelector(`.cell[data-index="${moveIndex}"]`);
        if (!cell) return;
        
        removeMoveWithAnimation(cell, moveIndex, player);
        
        // Update game status
        const playerName = player === 'X' ? 'Player X' : (vsComputer && player === 'O' ? 'Computer' : 'Player O');
        updateGameStatus(`${playerName} took too long! Their last move was erased.`, 'tie');
        
        // Restart timer for current player (still same player's turn)
        startTurnTimer();
    }
    
    function removeMoveWithAnimation(cell, index, player) {
        // Apply fade-out animation
        cell.classList.add('fade-out');
        
        // Wait for animation to complete before removing content
        setTimeout(() => {
            // Erase this player's move
            gameBoard[index] = '';
            cell.textContent = '';
            cell.classList.remove(player.toLowerCase());
            cell.classList.remove('fade-out');
            cell.style.opacity = '1';
            cell.style.transform = 'scale(1)';
        }, 800); // Match animation duration (0.8s)
    }
    
    // Create the game board cells
    function createBoard() {
        gameBoardElement.innerHTML = '';
        
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', () => handleCellClick(i));
            gameBoardElement.appendChild(cell);
        }
    }
    
    // Handle cell click
    function handleCellClick(index) {
        // Check if cell is empty and game is active
        if (gameBoard[index] !== '' || !gameActive) {
            return;
        }
        
        // Make player move
        makeMove(index, currentPlayer);
        
        // Check for win or tie
        if (checkWin(currentPlayer)) {
            handleWin(currentPlayer);
            return;
        }
        
        if (checkTie()) {
            handleTie();
            return;
        }
        
        // Switch player
        switchPlayer();
        
        // If playing against computer and it's computer's turn
        if (vsComputer && currentPlayer === 'O' && gameActive) {
            setTimeout(makeComputerMove, 600);
        }
    }
    
    // Make a move on the board
    function makeMove(index, player) {
        gameBoard[index] = player;
        const cell = document.querySelector(`.cell[data-index="${index}"]`);
        cell.textContent = player;
        cell.classList.add(player.toLowerCase());
        
        // Track this player's moves for potential timeout erasure
        playerMoves[player].push(index);
        
        // Stop timer since move was made
        stopTurnTimer();
        
        // Add animation effect
        cell.style.transform = 'scale(0)';
        setTimeout(() => {
            cell.style.transform = 'scale(1)';
        }, 50);
    }
    
    // Switch current player
    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updatePlayerTurn();
        
        // Start timer for the new player's turn
        if (gameActive) {
            startTurnTimer();
        }
    }
    
    // Update player turn display
    function updatePlayerTurn() {
        const playerIcon = playerTurnElement.querySelector('.player-icon');
        const turnText = playerTurnElement.querySelector('.turn-text');
        
        // Update icon class
        playerIcon.className = 'player-icon';
        playerIcon.classList.add(currentPlayer === 'X' ? 'player-x' : 'player-o');
        
        // Update icon content
        playerIcon.innerHTML = currentPlayer === 'X' ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="far fa-circle"></i>';
        
        // Update text
        turnText.textContent = `${currentPlayer === 'X' ? 'Player X' : 'Player O'}'s Turn`;
        
        // If playing against computer and it's computer's turn
        if (vsComputer && currentPlayer === 'O') {
            turnText.textContent = "Computer's Turn (Thinking...)";
        }
    }
    
    // Check for win
    function checkWin(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => gameBoard[index] === player);
        });
    }
    
    // Check for tie
    function checkTie() {
        return gameBoard.every(cell => cell !== '');
    }
    
    // Handle win
    function handleWin(winner) {
        gameActive = false;
        scores[winner]++;
        saveScoresToStorage();
        updateScoreDisplay();
        
        // Stop timer since game is over
        stopTurnTimer();
        
        // Highlight winning cells
        const winningCombo = winningCombinations.find(combination => {
            return combination.every(index => gameBoard[index] === winner);
        });
        
        winningCombo.forEach(index => {
            const cell = document.querySelector(`.cell[data-index="${index}"]`);
            cell.classList.add('winning');
        });
        
        // Update game status
        const winnerName = winner === 'X' ? 'Player X' : (vsComputer ? 'Computer' : 'Player O');
        updateGameStatus(`${winnerName} wins! 🎉`, 'win');
        
        // Update player turn display to show winner
        playerTurnElement.querySelector('.turn-text').textContent = `${winnerName} Wins!`;
        
        // Clear timer display
        const timerDisplay = document.getElementById('timer-display');
        if (timerDisplay) {
            timerDisplay.textContent = '';
        }

        // Auto-restart after 2 seconds
        setTimeout(() => {
            resetGameBoard();
        }, 2000);
    }
    
    // Handle tie
    function handleTie() {
        gameActive = false;
        scores.tie++;
        saveScoresToStorage();
        updateScoreDisplay();
        
        // Stop timer since game is over
        stopTurnTimer();
        
        updateGameStatus("It's a tie! 🤝", 'tie');
        playerTurnElement.querySelector('.turn-text').textContent = "Game Tied!";
        
        // Clear timer display
        const timerDisplay = document.getElementById('timer-display');
        if (timerDisplay) {
            timerDisplay.textContent = '';
        }

        // Auto-restart after 2 seconds
        setTimeout(() => {
            resetGameBoard();
        }, 2000);
    }
    
    // Update game status message
    function updateGameStatus(message, status = '') {
        gameStatusElement.textContent = message;
        gameStatusElement.className = 'game-status';
        
        if (status) {
            gameStatusElement.classList.add(status);
        }
    }
    
    // Update score display
    function updateScoreDisplay() {
        scoreXElement.textContent = scores.X;
        scoreOElement.textContent = scores.O;
        scoreTieElement.textContent = scores.tie;
    }
    
    // Reset game board for a new round
    function resetGameBoard() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        
        // Reset timer variables
        stopTurnTimer();
        playerLastMove = { X: -1, O: -1 };
        timeLeft = 3;
        updateTimerDisplay();
        
        // Clear board UI
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning');
            cell.style.transform = 'scale(1)';
        });
        
        updatePlayerTurn();
        updateGameStatus('New game started. Player X goes first!');
        
        // Start timer for first player
        startTurnTimer();
    }
    
    // Computer move logic (simple AI)
    function makeComputerMove() {
        if (!gameActive || currentPlayer !== 'O') return;
        
        // Try to win if possible
        let move = findWinningMove('O');
        
        // Block player if they can win
        if (move === -1) {
            move = findWinningMove('X');
        }
        
        // Take center if available
        if (move === -1 && gameBoard[4] === '') {
            move = 4;
        }
        
        // Take corners if available
        if (move === -1) {
            const corners = [0, 2, 6, 8];
            const availableCorners = corners.filter(index => gameBoard[index] === '');
            if (availableCorners.length > 0) {
                move = availableCorners[Math.floor(Math.random() * availableCorners.length)];
            }
        }
        
        // Take any available spot
        if (move === -1) {
            const availableSpots = gameBoard
                .map((cell, index) => cell === '' ? index : -1)
                .filter(index => index !== -1);
            
            if (availableSpots.length > 0) {
                move = availableSpots[Math.floor(Math.random() * availableSpots.length)];
            }
        }
        
        // Make the move
        if (move !== -1) {
            makeMove(move, 'O');
            
            // Check for win or tie
            if (checkWin('O')) {
                handleWin('O');
                return;
            }
            
            if (checkTie()) {
                handleTie();
                return;
            }
            
            // Switch back to player
            switchPlayer();
        }
    }
    
    // Find a winning move for a player
    function findWinningMove(player) {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            
            // Check if two cells are occupied by player and one is empty
            if (gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === '') {
                return c;
            }
            if (gameBoard[a] === player && gameBoard[c] === player && gameBoard[b] === '') {
                return b;
            }
            if (gameBoard[b] === player && gameBoard[c] === player && gameBoard[a] === '') {
                return a;
            }
        }
        return -1;
    }
    
    // Toggle game mode (player vs player or player vs AI)
    function toggleGameMode() {
        vsComputer = !vsComputer;
        gameMode = vsComputer ? 'computer' : 'player';
        
        // Update button text and icon
        const icon = toggleModeButton.querySelector('i');
        const text = vsComputer ? ' vs Player' : ' vs AI';
        
        toggleModeButton.innerHTML = vsComputer ? 
            '<i class="fas fa-user-friends"></i> vs Player' : 
            '<i class="fas fa-robot"></i> vs AI';
        
        // Reset game if switching modes mid-game
        if (gameActive && !gameBoard.every(cell => cell === '')) {
            resetGameBoard();
        }
        
        updateGameStatus(vsComputer ? 
            'Playing against AI. You are X!' :
            'Playing against another player. Player X goes first!');
    }
    
    // Save scores to localStorage
    function saveScoresToStorage() {
        localStorage.setItem('ticTacToeScores', JSON.stringify(scores));
    }
    
    // Load scores from localStorage
    function loadScoresFromStorage() {
        const savedScores = localStorage.getItem('ticTacToeScores');
        if (savedScores) {
            scores = JSON.parse(savedScores);
        }
    }
    
    // Reset all scores
    function resetScores() {
        scores = { X: 0, O: 0, tie: 0 };
        saveScoresToStorage();
        updateScoreDisplay();
        updateGameStatus('Scores have been reset to zero.');
    }
    
    // Attach event listeners to buttons
    function attachEventListeners() {
        newGameButton.addEventListener('click', resetGameBoard);
        resetScoresButton.addEventListener('click', resetScores);
        toggleModeButton.addEventListener('click', toggleGameMode);
    }
    
    // Initialize the game when page loads
    initGame();
    
    // Add some fun effects
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('mouseenter', function() {
            if (this.textContent === '' && gameActive) {
                const player = currentPlayer === 'X' ? 'X' : 'O';
                this.style.color = player === 'X' ? 'rgba(0, 219, 222, 0.3)' : 'rgba(252, 0, 255, 0.3)';
                this.textContent = player;
            }
        });
        
        cell.addEventListener('mouseleave', function() {
            if (this.textContent === currentPlayer && gameBoard[this.dataset.index] === '') {
                this.textContent = '';
                this.style.color = '';
            }
        });
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        // N for new game
        if (event.key === 'n' || event.key === 'N') {
            resetGameBoard();
        }
        // R for reset scores
        if (event.key === 'r' || event.key === 'R') {
            resetScores();
        }
        // M for toggle mode
        if (event.key === 'm' || event.key === 'M') {
            toggleGameMode();
        }
        // 1-9 for cell selection
        if (event.key >= '1' && event.key <= '9' && gameActive) {
            const index = parseInt(event.key) - 1;
            if (gameBoard[index] === '') {
                handleCellClick(index);
            }
        }
    });
    
    // Display keyboard shortcuts info
    console.log('Tic Tac Toe Keyboard Shortcuts:');
    console.log('N - New Game');
    console.log('R - Reset Scores');
    console.log('M - Toggle Mode (Player vs AI)');
    console.log('1-9 - Select cell (1 = top-left, 9 = bottom-right)');
});