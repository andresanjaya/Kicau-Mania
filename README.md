# 🐱 Kicau Mania - Dancing Cat Gesture

A fun React app that uses **MediaPipe Hand Tracking** to detect hand gestures and trigger a dancing cat animation with music!

## 🎯 How It Works

Perform this hand gesture to trigger the dancing cat:

1. **Left Hand**: Make a fist (close hand, fingers curled down) - simulating covering mouth
2. **Right Hand**: Open hand with fingers extended, raised up - waving motion
3. Hold both gestures for ~18 frames (about 1-2 seconds)
4. 🎉 **Dancing cat appears with music!**

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## ⚙️ Configuration

Edit `src/config.js` to customize:

```javascript
// Your music URL (MP3, OGG, WAV, etc)
export const MUSIC_URL = "https://example.com/your-music.mp3";

// Your favorite dancing cat GIF URL
export const CAT_GIF_URL = "https://your-gif-url.gif";

// How long gesture must be held before triggering (in frames)
export const GESTURE_HOLD_FRAMES = 18;

// How long to display the cat animation (in milliseconds)
export const CAT_DISPLAY_DURATION = 8000;
```

## 📁 Project Structure

```
src/
├── App.jsx                 # Main app component with all logic
├── main.jsx               # React entry point
├── index.css              # Global styles
├── config.js              # Configuration & constants
├── styles.js              # All styled-component styles
├── components/
│   ├── Header.jsx         # Header component
│   ├── CameraView.jsx     # Camera and canvas display
│   ├── SidePanel.jsx      # Instructions and controls
│   └── CatOverlay.jsx     # Dancing cat animation overlay
└── utils/
    └── gestureDetection.js # Hand gesture detection logic
```

## 🎮 Features

✨ **Real-time Hand Tracking** - Detects 21 hand landmarks using MediaPipe  
🎵 **Custom Music** - Play any music when gesture is triggered  
🐱 **Animated Cat** - Customize with your favorite GIF  
📊 **Progress Bar** - Visual feedback showing gesture completion  
🎯 **Gesture Debug** - See which gestures are being detected  
📱 **Responsive UI** - Beautiful gradient design  
🌙 **Starfield Background** - Animated cosmic backdrop

## 📝 Gesture Detection Details

### Blow Kiss Gesture (Fist - covering mouth)

- All fingers curled downward
- Hand positioned in upper half of frame
- Simulates covering mouth for "blow kiss"

### Wave Gesture (Open hand - waving)

- All fingers extended
- Hand raised (upper portion of frame)
- Simulates waving motion toward camera

### Combo Trigger

- Requires **2 hands** detected
- One hand must show **fist gesture**
- Other hand must show **wave gesture**
- Hold gesture for `GESTURE_HOLD_FRAMES` (configurable)

## 🎨 Customization

### Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --pink: #ff6b9d;
  --purple: #c44dff;
  --yellow: #ffe66d;
  --cyan: #4dffee;
  --bg: #0d0d1a;
  --card: #1a1a2e;
}
```

### MediaPipe Settings

Adjust hand detection sensitivity in `src/config.js`:

```javascript
export const HANDS_CONFIG = {
  maxNumHands: 2, // Number of hands to detect
  modelComplexity: 1, // 0 (lite), 1 (full)
  minDetectionConfidence: 0.7, // 0-1 (lower = more sensitive)
  minTrackingConfidence: 0.6, // 0-1 (lower = more sensitive)
};
```

## 🔧 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **MediaPipe Hands** - Hand gesture detection
- **CSS-in-JS** - Inline styles for components

## 📄 License

Free to use and modify!

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

Made with ❤️ and 🐱
