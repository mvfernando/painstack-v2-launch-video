
import React from 'react';
import { 
  AbsoluteFill, 
  Sequence, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring, 
  staticFile,
  Audio 
} from 'remotion';
import { colors, fonts } from '../../shared/brand';
import { SceneAudio, BackgroundMusic } from '../../shared/SceneAudio';

// --- Components ---

const Scene1Hook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const punch1 = spring({ frame, fps, config: { damping: 12, stiffness: 200 } });
  const punch2 = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 200 } });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 80, background: colors.bg }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: 100,
          color: colors.white,
          fontWeight: 900,
          fontFamily: fonts.base,
          opacity: punch1,
          transform: `scale(${interpolate(punch1, [0, 1], [0.5, 1])})`,
          marginBottom: 20,
          lineHeight: 1
        }}>
          YOU HAVE<br/>AN IDEA.
        </div>
        <div style={{
          fontSize: 80,
          fontWeight: 900,
          fontFamily: fonts.base,
          background: `linear-gradient(135deg, ${colors.orange}, ${colors.blue})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          opacity: punch2,
          transform: `translateY(${interpolate(punch2, [0, 1], [40, 0])}px)`,
          lineHeight: 1
        }}>
          IS IT WORTH<br/> BUILDING?
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene2Problem = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 15 } });
  
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 60, background: colors.bg }}>
      <div style={{ 
        width: '100%',
        background: 'rgba(45,129,224,0.1)',
        border: `2px solid ${colors.blue}`,
        borderRadius: 32,
        padding: 40,
        opacity: entrance,
        transform: `scale(${entrance})`,
        boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
      }}>
        <div style={{ fontSize: 48, fontWeight: 900, color: colors.white, fontFamily: fonts.base, marginBottom: 20, lineHeight: 1.2 }}>
          "Spent $40k.<br/> Got 3 users."
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 28, color: colors.orange, fontWeight: 700, fontFamily: fonts.base }}>
            ▲ 2.4k · r/startups
          </div>
          <div style={{ 
            background: colors.orange, 
            color: 'white', 
            padding: '6px 16px', 
            borderRadius: 8, 
            fontSize: 20, 
            fontWeight: 800,
            fontFamily: fonts.base
          }}>
            HIGH PAIN
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene3Input = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const text = "An AI tool that helps founders validate their ideas...";
  const charsShown = Math.floor(interpolate(frame, [20, 70], [0, text.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  const pulse = Math.sin(frame / 5) * 0.05 + 1;

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 60, background: colors.bg }}>
       <div style={{ 
          width: '100%',
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: 24,
          padding: 30,
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
       }}>
          <div style={{
            background: "rgba(15, 23, 42, 0.6)",
            border: `1px solid ${colors.border}`,
            borderRadius: 16,
            padding: 24,
            minHeight: 120,
            color: colors.white,
            fontSize: 24,
            fontFamily: fonts.base,
            lineHeight: 1.4,
            marginBottom: 30
          }}>
             {text.substring(0, charsShown)}
             <span style={{ borderRight: `3px solid ${colors.blue}`, marginLeft: 2, opacity: frame % 30 < 15 ? 1 : 0 }} />
          </div>
          
          <div style={{
            background: colors.blue,
            color: 'white',
            padding: '16px 40px',
            borderRadius: 12,
            fontSize: 24,
            fontWeight: 800,
            textAlign: 'center',
            transform: `scale(${pulse})`,
            boxShadow: `0 10px 30px ${colors.blue}44`
          }}>
            VALIDATE
          </div>
       </div>
    </AbsoluteFill>
  );
};

const Scene4Score = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const score = interpolate(frame, [20, 80], [0, 87], { extrapolateRight: 'clamp' });
  const badgeEntrance = spring({ frame: frame - 85, fps, config: { damping: 10, stiffness: 200 } });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', background: colors.bg }}>
       <div style={{ position: 'relative', width: 450, height: 450, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 160, fontWeight: 900, color: colors.white, fontFamily: fonts.base }}>
            {Math.round(score)}
          </div>
          <svg style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }} width="450" height="450">
             <circle 
                cx="225" cy="225" r="200" 
                fill="none" 
                stroke="rgba(45, 129, 224, 0.1)" 
                strokeWidth="24" 
             />
             <circle 
                cx="225" cy="225" r="200" 
                fill="none" 
                stroke={colors.blue} 
                strokeWidth="24" 
                strokeDasharray={2 * Math.PI * 200} 
                strokeDashoffset={2 * Math.PI * 200 * (1 - (score / 100))}
                strokeLinecap="round"
             />
          </svg>

          {/* Badge */}
          <div style={{
            position: 'absolute',
            bottom: 40,
            background: colors.orange,
            color: 'white',
            padding: '12px 30px',
            borderRadius: 100,
            fontSize: 28,
            fontWeight: 900,
            opacity: badgeEntrance,
            transform: `scale(${badgeEntrance}) translateY(20px)`,
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            BUILD ✓
          </div>
       </div>
    </AbsoluteFill>
  );
};

const Scene5CTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoEntrance = spring({ frame, fps });
  
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 60, background: colors.bg }}>
      <img 
        src={staticFile('shared/Painstack.ai_logo2.png')} 
        style={{ width: 180, height: 180, borderRadius: 36, marginBottom: 50, opacity: logoEntrance, transform: `scale(${logoEntrance})`, objectFit: 'contain' }} 
        alt="Logo"
      />
      <div style={{ fontSize: 36, color: colors.white, fontWeight: 800, textAlign: 'center', lineHeight: 1.2, marginBottom: 60, fontFamily: fonts.base }}>
        usepainstackai.com
      </div>
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        border: `1px solid ${colors.border}`,
        padding: '20px 40px',
        borderRadius: 100,
        color: colors.orange,
        fontSize: 28,
        fontWeight: 800,
        fontFamily: fonts.base
      }}>
        Free to start →
      </div>
    </AbsoluteFill>
  );
};

// --- Main Composition ---

export const Video3Shorts = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <BackgroundMusic volume={0.12} />

      {/* S1: 0-110 */}
      <Sequence durationInFrames={110}>
        <Scene1Hook />
        <SceneAudio filename="v3_s1_hook" />
      </Sequence>

      {/* S2: 110-220 */}
      <Sequence from={110} durationInFrames={110}>
        <Scene2Problem />
        <SceneAudio filename="v3_s2_problem" />
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.1} />
        <Sequence from={10} durationInFrames={30}>
          <Audio src={staticFile('audio/sfx_glitch.mp3')} volume={0.1} />
        </Sequence>
      </Sequence>

      {/* S3: 220-330 */}
      <Sequence from={220} durationInFrames={110}>
        <Scene3Input />
        <SceneAudio filename="v3_s3_solution" />
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.1} />
        <Sequence from={10} durationInFrames={60}>
          <Audio src={staticFile('audio/sfx_typing.mp3')} volume={0.15} />
        </Sequence>
      </Sequence>

      {/* S4: 330-440 */}
      <Sequence from={330} durationInFrames={110}>
        <Scene4Score />
        <SceneAudio filename="v3_s4_result" />
        <Sequence from={15} durationInFrames={70}>
          <Audio src={staticFile('audio/sfx_power_up.mp3')} volume={0.2} />
        </Sequence>
      </Sequence>

      {/* S5: 440-550 */}
      <Sequence from={440} durationInFrames={110}>
        <Scene5CTA />
        <SceneAudio filename="v3_s5_cta" />
      </Sequence>
    </AbsoluteFill>
  );
};
