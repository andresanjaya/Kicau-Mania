// Quick test script to verify MediaPipe is working
// Paste this in browser console (F12) to debug

console.log('=== MEDIAPIPE DEBUG ===');
console.log('window.Hands:', typeof window.Hands);
console.log('window.Camera:', typeof window.Camera);
console.log('window.HAND_CONNECTIONS:', typeof window.HAND_CONNECTIONS);
console.log('window.drawConnectors:', typeof window.drawConnectors);
console.log('window.drawLandmarks:', typeof window.drawLandmarks);

if (window.Hands && window.Camera) {
  console.log('✅ MediaPipe libraries are loaded!');
} else {
  console.log('❌ MediaPipe libraries NOT loaded. Check network in DevTools > Network tab');
  console.log('   Look for hands.js, camera_utils.js, drawing_utils.js');
}

// Test hand detection
async function testHands() {
  if (!window.Hands) {
    console.error('Hands not loaded');
    return;
  }

  const hands = new window.Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
  });

  hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 0,
    minDetectionConfidence: 0.3,
    minTrackingConfidence: 0.3,
  });

  let count = 0;
  hands.onResults((results) => {
    count++;
    console.log(`Result #${count}:`, results.multiHandLandmarks?.length ?? 0, 'hands detected');
    if (count >= 5) {
      hands.close();
    }
  });

  try {
    await hands.initialize();
    console.log('✅ Hands initialized successfully');
  } catch (e) {
    console.error('❌ Failed to initialize hands:', e);
  }
}

console.log('\n💡 To test hand detection, run: testHands()');
