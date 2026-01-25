# ❌⭕ Tic Tac Toe

A beautiful, modern implementation of the classic Tic Tac Toe game built with React and Vite. Features both Player vs Player and Player vs AI modes, stunning animations with confetti effects, and comprehensive game history tracking.

## ✨ Features

### 🎮 Game Modes
- **Player vs Player (PvP)**: Play against a friend locally on the same device
- **Player vs AI**: Challenge the computer opponent with intelligent move selection
- **Mode Selection Screen**: Easy-to-use interface to choose your preferred game mode

### 🎯 Gameplay Features
- **Interactive Game Board**: Click to place X or O marks
- **Turn Indicator**: Clear visual indication of whose turn it is
- **Win Detection**: Automatic detection of winning combinations
- **Draw Detection**: Recognizes when the board is full with no winner
- **Celebration Effects**: Confetti animation when a player wins! 🎉
- **Reset Functionality**: Quickly start a new game after finishing

### 📊 Advanced Features
- **Game History**: Complete tracking of all played games
- **Statistics Display**: View game results, winners, and timestamps
- **Persistent Storage**: Game history saved using localStorage
- **Responsive Design**: Beautiful UI that works on all screen sizes
- **Modern Aesthetics**: Clean, colorful design with smooth animations

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   git clone https://github.com/MANJOT1650/Projects4fun/tree/main/TicTacToe
   cd TicTacToe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🎮 How to Play

### Basic Rules
1. The game is played on a 3×3 grid
2. Player 1 is **X** (blue), Player 2 or AI is **O** (red/pink)
3. Players take turns placing their marks in empty squares
4. The first player to get 3 of their marks in a row wins
5. Rows can be horizontal, vertical, or diagonal
6. If all 9 squares are filled and no one has won, the game is a draw

### Game Flow
1. **Main Menu**: Choose to start a new game, view history, or exit
2. **Mode Selection**: Select Player vs Player or Player vs AI
3. **Play**: Take turns clicking on empty squares to place your mark
4. **Result**: When the game ends, see the winner with confetti celebration
5. **Continue**: Start a new game or return to the main menu

### Controls
- **Mouse Click**: Click on any empty square to place your mark
- **Navigation Buttons**: Use on-screen buttons to navigate between views
- **New Game**: Start fresh after a game ends
- **Back to Menu**: Return to main menu at any time

## 📁 Project Structure

```
TicTacToe/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── Menu.jsx     # Main menu component
│   │   ├── ModeSelection.jsx # Game mode selection screen
│   │   ├── Game.jsx     # Main game component with board logic
│   │   ├── History.jsx  # Game history viewer
│   │   └── [other components] # Additional UI components
│   ├── utils/           # Utility functions
│   │   └── aiPlayer.js  # AI logic for computer opponent
│   ├── App.jsx          # Main application component
│   ├── App.css          # Main application styles
│   ├── index.css        # Global styles
│   └── main.jsx         # Application entry point
├── index.html           # HTML template
├── package.json         # Project dependencies
└── vite.config.js       # Vite configuration
```

## 🛠️ Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build production-ready bundle
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint for code quality checks

## 🎨 Technologies Used

- **React 19.2.0** - UI library for building components
- **Vite 7.2.4** - Fast build tool and dev server
- **canvas-confetti 1.9.4** - Celebration effects for winners
- **JavaScript (ES6+)** - Modern JavaScript features
- **CSS3** - Advanced styling with animations and gradients
- **LocalStorage API** - Persistent game history storage

## 🎯 Game Logic Deep Dive

### Win Detection Algorithm
The game checks for winning combinations after each move:
- 3 horizontal rows
- 3 vertical columns
- 2 diagonal lines

### AI Player Strategy
The AI opponent uses intelligent move selection:
1. **Win**: If AI can win in one move, it takes that move
2. **Block**: If player can win in one move, AI blocks them
3. **Strategic Play**: AI chooses optimal positions using minimax-like logic
4. **Random Fallback**: If no strategic move is available, chooses randomly

### State Management
- React hooks manage game state
- Component-based architecture for modularity
- Efficient re-rendering for smooth gameplay

## 🎨 Visual Features

### Design Highlights
- **Modern Color Palette**: Vibrant blues and pinks with gradients
- **Smooth Animations**: Hover effects and transitions
- **Glassmorphism**: Semi-transparent backgrounds with blur effects
- **Responsive Layout**: Adapts to different screen sizes
- **Icon Integration**: Emoji-based user-friendly icons

### Confetti Celebration
When a player wins, experience:
- Multi-colored confetti animation
- Celebratory particle effects
- Visual feedback for game completion

## 📊 Game History

The history feature tracks:
- **Game Results**: Winner or draw
- **Mode Played**: PvP or vs AI
- **Timestamp**: Date and time of each game
- **Persistent Storage**: Data saved across browser sessions

Access history from the main menu to review past games and statistics.

## 🔧 Customization

You can customize the game by modifying:
- **Colors**: Edit CSS variables in `App.css` and `index.css`
- **Board Size**: Modify grid dimensions (currently 3×3)
- **AI Difficulty**: Adjust AI logic in `utils/aiPlayer.js`
- **Animations**: Customize confetti and transition effects

## 📝 Future Enhancements

Potential features for future versions:
- [ ] Online multiplayer with WebSockets
- [ ] Multiple AI difficulty levels (Easy, Medium, Hard)
- [ ] Larger board sizes (4×4, 5×5)
- [ ] Custom themes and color schemes
- [ ] Sound effects for moves and wins
- [ ] Player profiles and persistent usernames
- [ ] Tournament mode for multiple rounds
- [ ] Undo/Redo functionality

## 🐛 Known Issues

None currently reported. If you encounter any bugs, please report them!

## 💡 Tips for Playing Against AI

1. **Control the Center**: The center square is strategically important
2. **Create Forks**: Set up multiple winning opportunities
3. **Block Early**: Don't let the AI create two-in-a-row situations
4. **Corner Strategy**: Corners are more valuable than edges
5. **Think Ahead**: Plan your next 2-3 moves

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

---

**Have fun playing! ❌⭕🎮**
