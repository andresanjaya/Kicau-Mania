/**
 * Detect "blow kiss" gesture - simplified for testing
 * Just check if hand is relatively closed/compact
 */
export function detectBlowKissGesture(landmarks) {
  if (!landmarks || landmarks.length < 21) return false;

  const wrist = landmarks[0];
  const indexTip = landmarks[8];
  const middleTip = landmarks[12];
  const ringTip = landmarks[16];
  const pinkyTip = landmarks[20];

  // Calculate average finger position
  const avgY = (indexTip.y + middleTip.y + ringTip.y + pinkyTip.y) / 4;

  // If fingers are significantly lower than wrist (curled), it's a fist
  const isFist = avgY > wrist.y + 0.05;

  return isFist;
}

/**
 * Detect "waving" gesture - simplified for testing
 * Just check if hand is relatively open/spread
 */
export function detectWaveGesture(landmarks) {
  if (!landmarks || landmarks.length < 21) return false;

  const wrist = landmarks[0];
  const indexTip = landmarks[8];
  const middleTip = landmarks[12];
  const ringTip = landmarks[16];
  const pinkyTip = landmarks[20];

  // Calculate average finger position
  const avgY = (indexTip.y + middleTip.y + ringTip.y + pinkyTip.y) / 4;

  // If fingers are above wrist, hand is open
  const isOpen = avgY < wrist.y + 0.05;

  return isOpen;
}

/**
 * Detect any hand gesture
 * ULTRA LENIENT - just need to detect if hand exists!
 * No complex gesture checking, just "is there a hand?"
 */
export function detectGestureCombo(multiHandLandmarks) {
  // If any hand is detected, trigger the gesture
  if (!multiHandLandmarks || multiHandLandmarks.length === 0) {
    return false;
  }

  // ANY hand detected = gesture triggered
  return true;
}
