import { useState, useEffect, useRef, useCallback } from 'react';
import {
  detectBlowKissGesture,
  detectWaveGesture,
} from './utils/gestureDetection';
import {
  MUSIC_URL,
  GESTURE_HOLD_FRAMES,
  CAT_DISPLAY_DURATION,
  HANDS_CONFIG,
  CAMERA_CONFIG,
  DEBUG_MODE,
} from './config';
import { styles } from './styles';
import Header from './components/Header';
import CameraView from './components/CameraView';
import SidePanel from './components/SidePanel';
import CatOverlay from './components/CatOverlay';

export default function App() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const handsRef = useRef(null);
  const cameraRef = useRef(null);
  const audioRef = useRef(null);

  const [isActive, setIsActive] = useState(false);
  const [showCat, setShowCat] = useState(false);
  const [statusText, setStatusText] = useState('Aktifkan kamera untuk mulai!');
  const [gestureDebug, setGestureDebug] = useState({ fist: false, wave: false });

  // Gesture hold counter
  const gestureCountRef = useRef(0);
  const isTriggerredRef = useRef(false);
  const fistRecentFramesRef = useRef(0);
  const waveRecentFramesRef = useRef(0);

  const GESTURE_MEMORY_FRAMES = 14;

  // Check if MediaPipe is loaded on mount
  useEffect(() => {
    console.log('🔍 Checking MediaPipe libraries...');

    const checkMediaPipe = () => {
      if (window.Hands && window.Camera && window.HAND_CONNECTIONS) {
        console.log('✅ MediaPipe libraries loaded!');
        setStatusText('✅ Ready! Click "Aktifkan Kamera" to start');
      } else {
        console.warn('⏳ MediaPipe still loading... Hands:', !!window.Hands, 'Camera:', !!window.Camera);
        setTimeout(checkMediaPipe, 500);
      }
    };

    checkMediaPipe();
  }, []);

  const handleResults = useCallback((results) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = results.image.width;
    canvas.height = results.image.height;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw video mirrored
    ctx.scale(-1, 1);
    ctx.translate(-canvas.width, 0);
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    const multiHandLandmarks = results.multiHandLandmarks || [];

    let hasFist = false;
    let hasWave = false;

    for (const landmarks of multiHandLandmarks) {
      // Draw landmarks
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
      window.drawConnectors && window.drawConnectors(ctx, landmarks, window.HAND_CONNECTIONS, {
        color: '#FF6B9D',
        lineWidth: 2,
      });
      window.drawLandmarks && window.drawLandmarks(ctx, landmarks, {
        color: '#FFE66D',
        lineWidth: 1,
        radius: 3,
      });
      ctx.restore();

      if (detectBlowKissGesture(landmarks)) hasFist = true;
      if (detectWaveGesture(landmarks)) hasWave = true;
    }

    setGestureDebug({ fist: hasFist, wave: hasWave });

    // Debug log
    if (DEBUG_MODE) {
      console.log(`Hands: ${multiHandLandmarks.length} | Fist: ${hasFist} | Wave: ${hasWave} | Progress: ${gestureCountRef.current}/${GESTURE_HOLD_FRAMES}`);
    }

    // Keep short memory so fist and wave can be recognized across nearby frames.
    if (hasFist) {
      fistRecentFramesRef.current = GESTURE_MEMORY_FRAMES;
    } else {
      fistRecentFramesRef.current = Math.max(0, fistRecentFramesRef.current - 1);
    }

    if (hasWave) {
      waveRecentFramesRef.current = GESTURE_MEMORY_FRAMES;
    } else {
      waveRecentFramesRef.current = Math.max(0, waveRecentFramesRef.current - 1);
    }

    const gestureDetected =
      fistRecentFramesRef.current > 0 && waveRecentFramesRef.current > 0;

    if (gestureDetected) {
      gestureCountRef.current++;
      const progress = Math.round((gestureCountRef.current / GESTURE_HOLD_FRAMES) * 100);
      if (
        gestureCountRef.current >= GESTURE_HOLD_FRAMES &&
        !isTriggerredRef.current
      ) {
        isTriggerredRef.current = true;
        if (DEBUG_MODE) console.log('✅ GESTURE TRIGGERED!');
        triggerCat();
      }
      setStatusText(`🎯 Gesture! ${progress}%`);
    } else {
      if (gestureCountRef.current > 0) {
        gestureCountRef.current = Math.max(0, gestureCountRef.current - 3);
      }

      if (multiHandLandmarks.length === 0) {
        setStatusText('👐 Tunjukkan tangan ke kamera!');
      } else {
        setStatusText(`✋ Tangan terdeteksi! Tahan... ${Math.round((gestureCountRef.current / GESTURE_HOLD_FRAMES) * 100)}%`);
      }

      if (!isTriggerredRef.current || gestureCountRef.current === 0) {
        isTriggerredRef.current = false;
      }
    }
  }, []);

  const triggerCat = useCallback(() => {
    setShowCat(true);
    fistRecentFramesRef.current = 0;
    waveRecentFramesRef.current = 0;
    if (audioRef.current && MUSIC_URL) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) => console.log('Audio blocked:', e));
    }

    setTimeout(() => {
      setShowCat(false);
      isTriggerredRef.current = false;
      gestureCountRef.current = 0;
      if (audioRef.current) audioRef.current.pause();
    }, CAT_DISPLAY_DURATION);
  }, []);

  const startCamera = useCallback(async () => {
    try {
      // Check if MediaPipe libraries are loaded
      if (!window.Hands) {
        console.error('❌ window.Hands not found. MediaPipe library not loaded!');
        setStatusText('❌ Library belum loaded. Refresh page!');
        return;
      }

      if (!window.Camera) {
        console.error('❌ window.Camera not found. MediaPipe library not loaded!');
        setStatusText('❌ Library belum loaded. Refresh page!');
        return;
      }

      console.log('✅ MediaPipe libraries loaded');
      console.log('📝 Creating Hands with config:', HANDS_CONFIG);

      const hands = new window.Hands({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions(HANDS_CONFIG);

      hands.onResults((results) => {
        console.log('📊 Results received:', results.multiHandLandmarks?.length ?? 0, 'hands');
        handleResults(results);
      });

      handsRef.current = hands;

      console.log('📷 Starting camera...');

      const camera = new window.Camera(videoRef.current, {
        onFrame: async () => {
          if (handsRef.current) {
            try {
              await handsRef.current.send({ image: videoRef.current });
            } catch (e) {
              console.error('Error sending frame:', e);
            }
          }
        },
        ...CAMERA_CONFIG,
      });

      await camera.start();
      cameraRef.current = camera;
      setIsActive(true);
      console.log('✅ Camera started successfully!');
      setStatusText('✅ Kamera aktif! Lambaikan tangan...');
    } catch (err) {
      console.error('❌ Camera/MediaPipe error:', err);
      setStatusText(`❌ Error: ${err.message || 'Gagal akses kamera'}`);
    }
  }, [handleResults]);

  const stopCamera = useCallback(() => {
    if (cameraRef.current) {
      cameraRef.current.stop();
      cameraRef.current = null;
    }
    if (handsRef.current) {
      handsRef.current.close();
      handsRef.current = null;
    }
    setIsActive(false);
    setShowCat(false);
    setStatusText('Aktifkan kamera untuk mulai!');
    fistRecentFramesRef.current = 0;
    waveRecentFramesRef.current = 0;
    const canvas = canvasRef.current;
    if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  const handleToggleCamera = useCallback(() => {
    if (isActive) {
      stopCamera();
    } else {
      startCamera();
    }
  }, [isActive, startCamera, stopCamera]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const progressPct = Math.min(
    100,
    (gestureCountRef.current / GESTURE_HOLD_FRAMES) * 100
  );

  return (
    <div style={styles.container}>
      <Header isMobile={isMobile} />

      <div style={{ ...styles.main, ...(isMobile ? styles.mainMobile : {}) }}>
        <CameraView
          videoRef={videoRef}
          canvasRef={canvasRef}
          isActive={isActive}
          statusText={statusText}
          gestureDebug={gestureDebug}
          progressPct={progressPct}
          isMobile={isMobile}
        />

        <SidePanel
          isActive={isActive}
          onToggleCamera={handleToggleCamera}
          isMobile={isMobile}
        />
      </div>

      <CatOverlay isVisible={showCat} onClose={() => setShowCat(false)} />

      {MUSIC_URL && <audio ref={audioRef} src={MUSIC_URL} loop />}
    </div>
  );
}
