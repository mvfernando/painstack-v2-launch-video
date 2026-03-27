import { AbsoluteFill, useCurrentFrame, Audio, staticFile, interpolate, spring, useVideoConfig } from 'remotion';
import { SceneAudio } from '../shared/SceneAudio';
import { MouseCursor } from '../components/MouseCursor';
import { LandingHero } from '../components/LandingHero';

export const Scene03_Input: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timings matching LandingHero
  const T_ZOOM_START = 60;
  const T_ZOOM_END = 120;
  const T_TYPE_START = T_ZOOM_END + 20; // 140
  const T_TYPE_END = T_TYPE_START + 250; 
  const T_MOUSE_START = T_TYPE_END + 40;
  const T_CLICK = T_MOUSE_START + 60;

  const zoomSpring = spring({
    frame: frame - T_ZOOM_START,
    fps,
    config: { stiffness: 45, damping: 14 },
  });
  
  const scale = interpolate(zoomSpring, [0, 1], [1, 1.8]);
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
        <LandingHero isTyping={frame >= T_TYPE_START} />
        
        {/* Mouse for Click */}
        <MouseCursor 
          startFrame={T_MOUSE_START} 
          clickFrame={T_CLICK}
          targetX={100} 
          targetY={300}
        />
      </div>
    </AbsoluteFill>
  );
};
