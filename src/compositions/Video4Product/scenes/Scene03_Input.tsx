import { AbsoluteFill, useCurrentFrame, Audio, staticFile, interpolate, spring, useVideoConfig } from 'remotion';
import React from 'react';
import { SceneAudio } from '../shared/SceneAudio';
import { LandingHero } from '../components/LandingHero';
import { UserCaption } from '../components/UserCaption';
import { COPY } from '../constants/copy';

export const Scene03_Input: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { userCaption } = COPY.c03;

  // Timings matching LandingHero logic - Compressed for 92s
  const T_ZOOM_START = 20;
  
  const T_TYPE_START = 30; 
  const T_CLICK = 250;
  const T_MOUSE_START = 220;

  const zoomSpring = spring({
    frame: frame - T_ZOOM_START,
    fps,
    config: { stiffness: 60, damping: 14 },
  });
  
  const scale = interpolate(zoomSpring, [0, 1], [1, 1.8]);
  const translateY = interpolate(zoomSpring, [0, 1], [0, -180]);

  // Click Sound - MORE NOTORIOUS
  const isClickFrame = frame === T_CLICK;

  return (
    <AbsoluteFill style={{ backgroundColor: '#F8FAFC', overflow: 'hidden' }}>
      {/* Sarah Voiceover for this scene */}
      <SceneAudio filename="v4_s3_input" />
      
      {/* NOTORIOUS CLICK SFX */}
      {isClickFrame && <Audio src={staticFile('audio/sfx_click.mp3')} volume={1.0} />}
      {isClickFrame && <Audio src={staticFile('audio/sfx_success_chime.mp3')} volume={0.4} />}
      
      <div style={{
        width: '100%', height: '100%',
        transform: `scale(${scale}) translateY(${translateY}px)`,
        transformOrigin: '50% 50%',
      }}>
        <LandingHero 
          isTyping={frame >= T_TYPE_START} 
          typingStart={T_TYPE_START}
          clickFrame={T_CLICK}
          mouseStart={T_MOUSE_START}
        />
      </div>

      {/* SYNCED CAPTION */}
      <UserCaption text={userCaption} startFrame={10} exitFrame={267} dark />
    </AbsoluteFill>
  );
};
