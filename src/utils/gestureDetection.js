/**
 * Basic euclidean distance between two landmarks.
 */
function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/**
 * Finger is considered extended when tip is clearly above pip (camera upright).
 * RELAXED: threshold 0.01 → 0.005
 */
function isFingerExtended(landmarks, tipIndex, pipIndex) {
  const tip = landmarks[tipIndex];
  const pip = landmarks[pipIndex];
  return tip.y < pip.y - 0.005;
}

/**
 * Finger is considered curled when tip is clearly below pip.
 * RELAXED: threshold 0.01 → 0.005
 */
function isFingerCurled(landmarks, tipIndex, pipIndex) {
  const tip = landmarks[tipIndex];
  const pip = landmarks[pipIndex];
  return tip.y > pip.y + 0.005;
}

/**
 * Detect "tutup mulut" gesture as a compact/closed hand.
 * RELAXED:
 *   - isCompactHand threshold: 0.27 → 0.40
 *   - curledCount minimum: >= 2 → >= 1
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

  // RELAXED: was 0.27 → 0.40 (tangan tidak harus sekompak fist sempurna)
  const isCompactHand = avgTipDistanceToWrist < 0.40;

  // RELAXED: was >= 2 → >= 1
  return curledCount >= 1 && isCompactHand;
}

/**
 * Detect "melambai" gesture as open hand with finger spread.
 * RELAXED:
 *   - extendedCount minimum: >= 2 → >= 1
 *   - tipSpread threshold: > 1.05 → > 0.6
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

  // RELAXED: extendedCount >= 1 (was 2), tipSpread > 0.6 (was 1.05)
  const isOpenAndSpread = extendedCount >= 1 && tipSpread > 0.6;

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