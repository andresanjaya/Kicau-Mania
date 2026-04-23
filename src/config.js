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
// RELAXED: was 6 → 4 (lebih cepat trigger)
export const GESTURE_HOLD_FRAMES = 4;

// How long to show the cat animation (in milliseconds)
export const CAT_DISPLAY_DURATION = 8000;

// MediaPipe hands detection settings - tuned for better accuracy
export const HANDS_CONFIG = {
  maxNumHands: 2,
  modelComplexity: 1,  // 0 = lite/fast model, 1 = full
  // RELAXED: was 0.45 → 0.35 (lebih sensitif mendeteksi tangan)
  minDetectionConfidence: 0.35,
  minTrackingConfidence: 0.35,
};

// Camera settings
export const CAMERA_CONFIG = {
  width: 640,
  height: 480,
};

// Debug mode - set to true to see console logs
export const DEBUG_MODE = true;