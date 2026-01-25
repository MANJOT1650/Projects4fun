# 🐍 Snake Game

A modern, feature-rich implementation of the classic Snake game built with React and Vite. Features multiple difficulty levels, custom maps, smooth animations, and game history tracking.

## ✨ Features

### 🎮 Gameplay
- **Smooth Controls**: Responsive keyboard controls for precise snake movement
- **Score Tracking**: Real-time score display with high score persistence
- **Game Over Detection**: Collision detection with walls and self-collision
- **Food Generation**: Dynamic food spawning with visual feedback

### 🎯 Game Modes
- **Multiple Difficulty Levels**: 
  - Easy: Slower speed for beginners
  - Medium: Balanced gameplay
  - Hard: Fast-paced challenge for experts
- **Custom Maps**: Different map layouts with unique wall configurations
- **Progressive Difficulty**: Speed increases based on selected difficulty

### 📊 Additional Features
- **Game History**: Track your past games and scores
- **High Score System**: Persistent high score tracking using localStorage
- **Options Menu**: Customize difficulty and map selection
- **Responsive UI**: Clean, modern interface with smooth transitions
- **Game Over Screen**: Restart or return to menu with statistics

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   git clone https://github.com/MANJOT1650/Projects4fun/tree/main/Snake
   cd Snake
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

### Controls
- **Arrow Keys** or **WASD**: Control snake direction
  - ⬆️ Up Arrow / W: Move up
  - ⬇️ Down Arrow / S: Move down
  - ⬅️ Left Arrow / A: Move left
  - ➡️ Right Arrow / D: Move right

### Objective
- Guide the snake to eat food (colored squares)
- Each food item increases your score
- The snake grows longer with each food consumed
- Avoid hitting walls and the snake's own body
- Achieve the highest score possible!

### Game Rules
1. The snake cannot move in the opposite direction of its current movement
2. Hitting a wall ends the game
3. Colliding with your own body ends the game
4. The game speed depends on your selected difficulty level

## 📁 Project Structure

```
Snake/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── Menu.jsx     # Main menu component
│   │   ├── Options.jsx  # Game options/settings
│   │   ├── History.jsx  # Game history viewer
│   │   ├── GameCanvas.jsx # Game rendering canvas
│   │   └── Button.jsx   # Reusable button component
│   ├── hooks/
│   │   └── useSnakeGame.js # Game logic hook
│   ├── constants.js     # Game constants (colors, sizes, etc.)
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
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
- **JavaScript (ES6+)** - Modern JavaScript features
- **CSS3** - Styling and animations
- **LocalStorage API** - Persistent data storage for scores and history

## 🎯 Game Features Deep Dive

### Snake Movement
The game uses a custom React hook (`useSnakeGame`) that handles:
- Snake position updates based on direction
- Collision detection with walls and self
- Food consumption and score calculation
- Game state management (MENU, PLAYING, GAME_OVER)

### Map System
Different maps provide varying challenges:
- **Classic**: Traditional open space
- **Maze**: Maps with strategic wall placements
- **Custom layouts**: Each map offers unique obstacles

### History Tracking
- All game sessions are automatically saved
- View past scores and performance
- High score is highlighted and tracked
- Data persisted across browser sessions

## 🔧 Configuration

Game settings can be customized in `src/constants.js`:
- Grid size and cell dimensions
- Color schemes for snake, food, and walls
- Initial snake length and starting position
- Food spawn locations

## 📝 Future Enhancements

Potential features for future versions:
- [ ] Multiplayer mode
- [ ] Power-ups (speed boost, invincibility, etc.)
- [ ] Sound effects and background music
- [ ] Additional map designs
- [ ] Leaderboard system
- [ ] Touch controls for mobile devices
- [ ] Pause functionality

## 🐛 Known Issues

None currently reported. If you encounter any bugs, please report them!

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

---

**Enjoy the game! 🎮🐍**
