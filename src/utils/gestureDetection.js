/**
 * Basic euclidean distance between two landmarks.
 */
function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/**
 * Finger is considered extended when tip is clearly above pip (camera upright).
 */
function isFingerExtended(landmarks, tipIndex, pipIndex) {
  const tip = landmarks[tipIndex];
  const pip = landmarks[pipIndex];
  return tip.y < pip.y - 0.01;
}

/**
 * Finger is considered curled when tip is clearly below pip.
 */
function isFingerCurled(landmarks, tipIndex, pipIndex) {
  const tip = landmarks[tipIndex];
  const pip = landmarks[pipIndex];
  return tip.y > pip.y + 0.01;
}

/**
 * Detect "tutup mulut" gesture as a compact/closed hand.
 */
export function detectBlowKissGesture(landmarks) {
  if (!landmarks || landmarks.length < 21) return false;

  const wrist = landmarks[0];
  const fingertips = [8, 12, 16, 20].map((i) => landmarks[i]);

  const curledCount = [
    isFingerCurled(landmarks, 8, 6),
    isFingerCurled(landmarks, 12, 10),
    isFingerCurled(landmarks, 16, 14),
    isFingerCurled(landmarks, 20, 18),
  ].filter(Boolean).length;

  const avgTipDistanceToWrist =
    fingertips.reduce((sum, tip) => sum + distance(tip, wrist), 0) / fingertips.length;

  const isCompactHand = avgTipDistanceToWrist < 0.27;

  return curledCount >= 2 && isCompactHand;
}

/**
 * Detect "melambai" gesture as open hand with finger spread.
 */
export function detectWaveGesture(landmarks) {
  if (!landmarks || landmarks.length < 21) return false;

  const wrist = landmarks[0];
  const indexTip = landmarks[8];
  const pinkyTip = landmarks[20];

  const extendedCount = [
    isFingerExtended(landmarks, 8, 6),
    isFingerExtended(landmarks, 12, 10),
    isFingerExtended(landmarks, 16, 14),
    isFingerExtended(landmarks, 20, 18),
  ].filter(Boolean).length;

  const handScale = Math.max(distance(wrist, landmarks[9]), 0.001);
  const tipSpread = distance(indexTip, pinkyTip) / handScale;

  const isOpenAndSpread = extendedCount >= 2 && tipSpread > 1.05;

  return isOpenAndSpread;
}

/**
 * Detect combo gesture: at least one closed hand and one open/wave hand.
 */
export function detectGestureCombo(multiHandLandmarks) {
  if (!multiHandLandmarks || multiHandLandmarks.length === 0) {
    return false;
  }

  let hasFist = false;
  let hasWave = false;

  for (const landmarks of multiHandLandmarks) {
    if (detectBlowKissGesture(landmarks)) hasFist = true;
    if (detectWaveGesture(landmarks)) hasWave = true;
  }

  return hasFist && hasWave;
}
