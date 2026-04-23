// =============================================
// CONFIG - Edit these to customize the app!
// =============================================

// Music URL - ganti dengan path ke file music Anda
// Format: MP3, OGG, WAV, etc.
// File bisa diletakkan di folder public/sounds/
export const MUSIC_URL = "/Kicau-Mania/sounds/sound.mp3";

// Cat media URL - GIF kucing
// Format: GIF
// File bisa diletakkan di folder public/videos/
export const CAT_VIDEO_URL = "/Kicau-Mania/videos/cat.gif";

// How many frames the gesture must be held before triggering
// Slightly higher to reduce false trigger
export const GESTURE_HOLD_FRAMES = 8;

// How long to show the cat animation (in milliseconds)
export const CAT_DISPLAY_DURATION = 8000;

// MediaPipe hands detection settings - tuned for better accuracy
export const HANDS_CONFIG = {
  maxNumHands: 2,
  modelComplexity: 1,  // 0 = lite/fast model, 1 = full
  minDetectionConfidence: 0.6,
  minTrackingConfidence: 0.6,
};

// Camera settings
export const CAMERA_CONFIG = {
  width: 640,
  height: 480,
};

// Debug mode - set to true to see console logs
export const DEBUG_MODE = true;


