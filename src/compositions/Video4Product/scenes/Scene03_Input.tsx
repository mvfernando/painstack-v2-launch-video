import { AbsoluteFill, useCurrentFrame, Audio, staticFile, interpolate, spring, useVideoConfig } from 'remotion';
import { UserCaption } from '../components/UserCaption';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';
import { TypewriterTextV2 } from '../components/TypewriterTextV2';
import { MouseCursor } from '../components/MouseCursor';
import { LandingHero } from '../components/LandingHero';

export const Scene03_Input: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { typewriter, userCaption } = COPY.c03;

  // Timings (Extended for V4.2)
  const T_ZOOM_START = 60;
  const T_ZOOM_END = 120;
  const T_TYPE_START = T_ZOOM_END + 20;
  // TypewriterV2 uses variable delays, so we estimate end time
  const T_TYPE_END = T_TYPE_START + 250; 
  const T_MOUSE_START = T_TYPE_END + 40;
  const T_CLICK = T_MOUSE_START + 60;

  // Zoom Animation: Scale 1.0 -> 1.8 (Recalibrated as per user request)
  const zoomSpring = spring({
    frame: frame - T_ZOOM_START,
    fps,
    config: { stiffness: 45, damping: 14 },
  });
  
  const scale = interpolate(zoomSpring, [0, 1], [1, 1.8]);
  // Offset to center the input target, but not too aggressively
  const translateY = interpolate(zoomSpring, [0, 1], [0, -180]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#F8FAFC', overflow: 'hidden' }}>
      <SceneAudio filename="v4_s3_input" />
      {frame === T_CLICK && <Audio src={staticFile('audio/sfx_click.mp3')} volume={0.6} />}
      
      <div style={{
        width: '100%', height: '100%',
        transform: `scale(${scale}) translateY(${translateY}px)`,
        transformOrigin: '50% 50%',
      }}>
        <LandingHero />

        {/* Sarah's dynamic human typing */}
        <div style={{
          position: 'absolute',
          top: '38.5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '580px',
          padding: '12px 20px',
          fontSize: '20px',
          color: '#fff',
          fontFamily: 'Inter, sans-serif',
          zIndex: 10,
          background: 'transparent',
          opacity: interpolate(frame, [T_TYPE_START - 10, T_TYPE_START], [0, 1]),
        }}>
          <TypewriterTextV2 text={typewriter} startFrame={T_TYPE_START} pauseAfterPunctuation={20} />
          {/* Subtle cursor indicator could go here */}
        </div>
      </div>

      <MouseCursor 
        startFrame={T_MOUSE_START} 
        startX={800} startY={800} 
        endX={1050} endY={780}    
        clickFrame={T_CLICK}
      />

      <UserCaption text={userCaption} startFrame={T_ZOOM_START} dark />
    </AbsoluteFill>
  );
};
