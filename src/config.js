// =============================================
// CONFIG - Edit these to customize the app!
// =============================================

// Music URL - ganti dengan path ke file music Anda
// Format: MP3, OGG, WAV, etc.
// File bisa diletakkan di folder public/sounds/
export const MUSIC_URL = "/sounds/sound.mp3";

// Cat Video URL - Video kucing dengan transparent background
// Format: MP4, WebM (dengan alpha channel/transparency)
// File bisa diletakkan di folder public/videos/
export const CAT_VIDEO_URL = "/videos/video.webm";

// How many frames the gesture must be held before triggering
// Very low for easy testing
export const GESTURE_HOLD_FRAMES = 5;

// How long to show the cat animation (in milliseconds)
export const CAT_DISPLAY_DURATION = 8000;

// MediaPipe hands detection settings - ULTRA LENIENT
export const HANDS_CONFIG = {
  maxNumHands: 2,
  modelComplexity: 0,  // 0 = lite/fast model, 1 = full
  minDetectionConfidence: 0.1,  // SUPER LOW - detect almost anything
  minTrackingConfidence: 0.1,   // SUPER LOW - track almost anything
};

// Camera settings
export const CAMERA_CONFIG = {
  width: 640,
  height: 480,
};

// Debug mode - set to true to see console logs
export const DEBUG_MODE = true;


