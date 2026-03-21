# Tic Tac Toe Game

A modern, responsive Tic Tac Toe game built with HTML, CSS, and JavaScript. Play against a friend or challenge the computer AI!

## Features

- **Two Game Modes**: Player vs Player or Player vs AI
- **Smart AI**: Computer opponent with strategic gameplay
- **Score Tracking**: Persistent scores saved in browser storage
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Visual Effects**: Smooth animations, hover previews, and winning highlight
- **Keyboard Support**: Play using keyboard shortcuts
- **Modern UI**: Clean, dark-themed interface with gradient accents

## How to Play

1. **Player vs Player Mode**: Two players take turns clicking cells to place X and O
2. **Player vs AI Mode**: Play against the computer AI (you are X)
3. **Objective**: Get three of your marks in a row (horizontally, vertically, or diagonally)
4. **Controls**:
   - Click any empty cell to place your mark
   - Use keyboard numbers 1-9 to select cells (1 = top-left, 9 = bottom-right)
   - Press 'N' for New Game
   - Press 'R' to Reset Scores
   - Press 'M' to toggle between Player vs Player and Player vs AI modes

## Game Features

- **Winning Detection**: Automatically detects wins and highlights the winning line
- **Tie Detection**: Recognizes when the board is full with no winner
- **Score Persistence**: Scores are saved in localStorage and persist between sessions
- **Hover Preview**: See what your move would look like before clicking
- **Visual Feedback**: Animated cells, pulse effects for winning lines, and status messages

## Project Structure

```
tic-tac-toe/
├── index.html      # Main HTML file
├── style.css       # CSS styles
├── script.js       # JavaScript game logic
└── README.md       # This file
```

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Flexbox, Grid, animations, gradients, and responsive design
- **JavaScript (ES6)**: Game logic, DOM manipulation, localStorage API
- **Font Awesome**: Icons for UI elements
- **Google Fonts**: Poppins and Roboto Slab fonts

## Browser Compatibility

The game works on all modern browsers including:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Installation & Usage

1. Clone or download the project files
2. Open `index.html` in any modern web browser
3. No build process or dependencies required!

## Game Logic Details

The computer AI uses a simple strategy:
1. First, tries to win if possible
2. Then, blocks the player if they're about to win
3. Prefers the center cell
4. Then chooses corners
5. Finally, picks any available cell

## Deployment

This game can be easily deployed to various platforms:

### GitHub Pages (Free)
1. Create a GitHub repository
2. Push all game files to the `main` branch
3. Go to Repository Settings → Pages
4. Select "Deploy from a branch" and choose `main` branch
5. Your game will be available at `https://username.github.io/repository-name/`

Detailed instructions: [GITHUB_PAGES_DEPLOY.md](GITHUB_PAGES_DEPLOY.md)

### Netlify (Free)
1. Drag and drop the project folder to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Or connect your GitHub repository for automatic deployments
3. Netlify will provide a custom URL like `your-game.netlify.app`

Detailed instructions: [NETLIFY_DEPLOY.md](NETLIFY_DEPLOY.md)

### Local Testing
Run a local HTTP server:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

## License

This project is open source and available for educational and personal use.

## Credits

Created as a demonstration of front-end web development skills.
Built by Chirag Kukreja

Enjoy the game! 🎮