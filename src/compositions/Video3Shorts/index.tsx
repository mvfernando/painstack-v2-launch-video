
import { type ReactNode, useMemo, Fragment } from 'react';
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

// --- Transition Helper ---
const Transition = ({ duration, children }: { duration: number; children: ReactNode }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [duration - 10, duration], [1, 0], { extrapolateRight: 'clamp' });
    return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

const Particle = ({ delay, speed, x, y, size }: { delay: number; speed: number; x: number; y: number; size: number }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(Math.sin((frame - delay) / 20), [-1, 1], [0.1, 0.4]);
    const translateY = Math.sin((frame - delay) / speed) * 30; // More vertical movement
    
    return (
        <div style={{
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            width: size,
            height: size,
            borderRadius: '50%',
            background: colors.blue,
            opacity,
            transform: `translateY(${translateY}px)`,
            filter: 'blur(1px)'
        }} />
    );
};

const Vignette = () => (
    <AbsoluteFill style={{ 
        boxShadow: 'inset 0 0 400px rgba(0,0,0,0.85)',
        pointerEvents: 'none',
        zIndex: 5
    }} />
);

// --- Components ---

const PopLogo = ({ 
    delay, 
    x, 
    y, 
    color, 
    label, 
    icon 
}: { 
    delay: number; 
    x: number; 
    y: number; 
    color: string; 
    label: string;
    icon: ReactNode;
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 200 } });
    const float = Math.sin((frame - delay) / 10) * 8;
    const rotate = interpolate(entrance, [0, 1], [-15, 0]);

    if (frame < delay) return null;

    return (
        <div style={{
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            transform: `translate(-50%, -50%) scale(${entrance}) translateY(${float}px) rotate(${rotate}deg)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            zIndex: 0
        }}>
            <div style={{
                width: 120, // Larger for vertical
                height: 120,
                borderRadius: 28,
                background: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 60,
                boxShadow: `0 25px 50px ${color}55`,
                border: '2px solid rgba(255,255,255,0.2)'
            }}>
                {icon}
            </div>
            <div style={{
                color: colors.white,
                fontFamily: fonts.base,
                fontSize: 22,
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                textShadow: '0 4px 15px rgba(0,0,0,0.6)'
            }}>
                {label}
            </div>
        </div>
    );
};

const Scene1Hook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
        delay: Math.random() * 100,
        speed: 30 + Math.random() * 40,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4
    }));
  }, []);

  const punch1 = spring({ frame, fps, config: { damping: 12, stiffness: 200 } });
  const punch2 = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 200 } });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 80, background: colors.bg }}>
      <AbsoluteFill style={{ 
          background: `radial-gradient(circle at 50% 50%, ${colors.blue}33 0%, transparent 70%)`,
          opacity: punch1
      }} />
      {particles.map((p, i) => <Particle key={i} {...p} />)}
      <Vignette />

      <div style={{ textAlign: 'center', zIndex: 10, perspective: 1000 }}>
        <div style={{
          fontSize: 110,
          color: colors.white,
          fontWeight: 900,
          fontFamily: fonts.base,
          opacity: punch1,
          transform: `scale(${interpolate(punch1, [0, 1], [0.5, 1])}) rotateX(${interpolate(punch1, [0, 1], [15, 0])}deg)`,
          marginBottom: 20,
          lineHeight: 1,
          letterSpacing: '-4px'
        }}>
          YOU HAVE<br/>AN IDEA.
        </div>
        <div style={{
          fontSize: 90,
          fontWeight: 900,
          fontFamily: fonts.base,
          background: `linear-gradient(135deg, ${colors.orange}, ${colors.blue})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          opacity: punch2,
          transform: `translateY(${interpolate(punch2, [0, 1], [40, 0])}px) rotateX(${interpolate(punch2, [0, 1], [15, 0])}deg)`,
          lineHeight: 1,
          letterSpacing: '-4px'
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
  const shake = spring({ frame: frame - 10, fps, config: { damping: 10, stiffness: 250 } });
  const shakeOffset = interpolate(shake, [0, 0.1, 1], [0, 12, 0]);
  
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 60, background: colors.bg }}>
      <AbsoluteFill style={{ 
          background: `radial-gradient(circle at 50% 40%, ${colors.orange}22 0%, transparent 70%)`,
          transform: `translate(${Math.random() * shakeOffset}px, ${Math.random() * shakeOffset}px)`
      }} />
      <Vignette />

      <div style={{ 
        width: '100%',
        background: 'rgba(45,129,224,0.15)',
        backdropFilter: 'blur(20px)',
        border: `2px solid ${colors.blue}`,
        borderRadius: 40,
        padding: 50,
        opacity: entrance,
        transform: `scale(${entrance}) rotate(${interpolate(entrance, [0, 1], [-8, 0])}deg)`,
        boxShadow: `0 40px 100px rgba(0,0,0,0.6), 0 0 ${shakeOffset * 10}px ${colors.orange}22`,
        zIndex: 10
      }}>
        <div style={{ fontSize: 56, fontWeight: 900, color: colors.white, fontFamily: fonts.base, marginBottom: 30, lineHeight: 1.2, letterSpacing: '-2px' }}>
          "Spent $40k.<br/> Got 3 users."
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 32, color: colors.orange, fontWeight: 800, fontFamily: fonts.base }}>
            ▲ 2.4k · r/startups
          </div>
          <div style={{ 
            background: colors.orange, 
            color: 'white', 
            padding: '8px 20px', 
            borderRadius: 12, 
            fontSize: 22, 
            fontWeight: 900,
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

  const pulse = Math.sin(frame / 6) * 0.04 + 1;

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 60, background: colors.bg }}>
       <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 50%, ${colors.blue}11 0%, transparent 70%)` }} />
       <Vignette />

       {/* Background Pops */}
       <PopLogo 
            delay={25} 
            x={25} y={20} 
            color="#FF4500" 
            label="Reddit" 
            icon={<span style={{ color: 'white', fontSize: 60 }}>👽</span>}
       />
       <PopLogo 
            delay={55} 
            x={75} y={15} 
            color="#FF6600" 
            label="HN" 
            icon={<span style={{ color: 'white', fontWeight: 950 }}>Y</span>}
       />
       <PopLogo 
            delay={85} 
            x={20} y={80} 
            color="#DA552F" 
            label="PH" 
            icon={<span style={{ color: 'white', fontWeight: 950 }}>P</span>}
       />
       <PopLogo 
            delay={115} 
            x={80} y={85} 
            color="#5865F2" 
            label="Discord" 
            icon={<span style={{ color: 'white', fontSize: 60 }}>🎮</span>}
       />

       {/* Main Input Card */}
       <div style={{ 
          width: '100%',
          background: 'rgba(30, 41, 59, 0.7)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${colors.border}`,
          borderRadius: 32,
          padding: 40,
          boxShadow: '0 50px 120px rgba(0,0,0,0.7)',
          zIndex: 10,
          transform: `scale(${pulse})`
       }}>
          <div style={{
            background: "rgba(15, 23, 42, 0.9)",
            border: `1px solid ${colors.border}`,
            borderRadius: 20,
            padding: 32,
            minHeight: 180,
            color: colors.white,
            fontSize: 28,
            fontFamily: fonts.base,
            lineHeight: 1.5,
            marginBottom: 40
          }}>
             {text.substring(0, charsShown)}
             <span style={{ borderRight: `4px solid ${colors.blue}`, marginLeft: 2, opacity: frame % 30 < 15 ? 1 : 0 }} />
          </div>
          
          <div style={{
            background: colors.blue,
            color: 'white',
            padding: '20px 50px',
            borderRadius: 16,
            fontSize: 32,
            fontWeight: 900,
            textAlign: 'center',
            boxShadow: `0 15px 40px ${colors.blue}66`
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
  
  // Inherit glint logic from shared but keep it vertical-optimized
  const bloom = interpolate(frame, [80, 85, 95], [0, 1, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', background: colors.bg }}>
       <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 50%, ${colors.green}22 0%, transparent 70%)` }} />
       <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 50%, ${colors.green}44 0%, transparent 70%)`, opacity: bloom }} />
       <Vignette />
       
       <div style={{ position: 'relative', width: 550, height: 550, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <div style={{ 
              fontSize: 200, 
              fontWeight: 900, 
              color: colors.white, 
              fontFamily: fonts.base,
              transform: `scale(${1 + bloom * 0.1})`
          }}>
            {Math.round(score)}
          </div>
          <svg style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }} width="550" height="550">
             <circle 
                cx="275" cy="275" r="230" 
                fill="none" 
                stroke="rgba(45, 129, 224, 0.1)" 
                strokeWidth="30" 
             />
             <circle 
                cx="275" cy="275" r="230" 
                fill="none" 
                stroke={colors.green} 
                strokeWidth="30" 
                strokeDasharray={2 * Math.PI * 230} 
                strokeDashoffset={2 * Math.PI * 230 * (1 - (score / 100))}
                strokeLinecap="round"
                style={{ filter: `drop-shadow(0 0 ${interpolate(frame, [80, 100], [15, 40], { extrapolateRight: 'clamp' })}px ${colors.green}88)` }}
             />
          </svg>

          {/* Badge */}
          <div style={{
            position: 'absolute',
            bottom: 40,
            background: colors.green,
            color: 'white',
            padding: '16px 45px',
            borderRadius: 100,
            fontSize: 36,
            fontWeight: 900,
            opacity: badgeEntrance,
            transform: `scale(${badgeEntrance}) translateY(20px)`,
            boxShadow: `0 20px 50px ${colors.green}66`,
            display: 'flex',
            alignItems: 'center',
            gap: 15
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

  const entrance = spring({ frame, fps, config: { damping: 20 } });
  const logoEntrance = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 100 } });
  const pulse = Math.sin(frame / 10) * 0.05 + 1;
  
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 60, background: colors.bg }}>
      <AbsoluteFill style={{ 
          background: `radial-gradient(circle at 50% 50%, ${colors.blue}55 0%, transparent 70%)`,
          opacity: 0.8
      }} />
      <Vignette />

      <div style={{ textAlign: 'center', zIndex: 10, opacity: entrance }}>
        <div style={{ 
            position: 'relative',
            width: 380,
            height: 380,
            margin: '0 auto 60px',
        }}>
          <img 
            src={staticFile('shared/Painstack.ai_logo2.png')} 
            style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
                position: 'relative',
                transform: `scale(${logoEntrance})`,
            }} 
            alt="Logo"
          />
          <div style={{
              position: 'absolute',
              inset: -60,
              background: `radial-gradient(circle, ${colors.blue}44 0%, transparent 70%)`,
              opacity: Math.sin(frame / 6) * 0.3 + 0.4
          }} />
        </div>

        <h2 style={{
            fontFamily: fonts.base,
            fontSize: 84,
            fontWeight: 900,
            color: colors.white,
            marginBottom: 40,
            letterSpacing: '-3px',
            lineHeight: 1
        }}>
            Start building<br/>for real.
        </h2>

        <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 18,
            marginBottom: 60,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
        }}>
            {["Free to start", "No card required", "Results in minutes"].map((item, i) => (
                <Fragment key={item}>
                    <div style={{
                        fontSize: 20,
                        color: colors.muted,
                        fontFamily: fonts.base,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        fontWeight: 500
                    }}>
                        <span style={{ color: colors.green, fontWeight: 900 }}>✓</span> {item}
                    </div>
                    {i < 2 && <div style={{ color: colors.muted, fontSize: 24, fontWeight: 300 }}>.</div>}
                </Fragment>
            ))}
        </div>

        <div style={{
            padding: '28px 80px',
            borderRadius: 100,
            background: `linear-gradient(135deg, ${colors.orange}, #ff7e47)`,
            color: colors.white,
            fontSize: 38,
            fontWeight: 900,
            display: 'inline-block',
            boxShadow: `0 35px 70px ${colors.orange}66`,
            border: '2px solid rgba(255,255,255,0.1)',
            transform: `scale(${pulse})`
        }}>
            TRY IT FREE →
        </div>

        <p style={{ 
            fontFamily: fonts.base, 
            fontSize: 44, 
            color: colors.blue,
            fontWeight: 800,
            marginTop: 50,
            letterSpacing: '-2px'
        }}>
            usepainstackai.com
        </p>
      </div>
    </AbsoluteFill>
  );
};

// --- Main Composition ---

export const Video3Shorts = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <BackgroundMusic volume={0.12} />

      {/* S1: Hook (0-83) | Speech: 68 + 15 buffer */}
      <Sequence durationInFrames={83}>
        <Scene1Hook />
        <SceneAudio filename="v3_s1_hook" />
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.2} />
      </Sequence>

      {/* S2: Problem (83-219) | Speech: 121 + 15 buffer */}
      <Sequence from={83} durationInFrames={136}>
        <Transition duration={136}>
            <Scene2Problem />
        </Transition>
        <SceneAudio filename="v3_s2_problem" />
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.1} />
        <Sequence from={10} durationInFrames={30}>
          <Audio src={staticFile('audio/sfx_glitch.mp3')} volume={0.15} />
        </Sequence>
      </Sequence>

      {/* S3: Solution (219-383) | Speech: 149 + 15 buffer */}
      <Sequence from={219} durationInFrames={164}>
        <Transition duration={164}>
            <Scene3Input />
        </Transition>
        <SceneAudio filename="v3_s3_solution" />
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.15} />
        <Sequence from={10} durationInFrames={150}>
            {/* POP sounds for logos */}
            {[15, 45, 75, 105].map((d, i) => (
                <Sequence key={i} from={d} durationInFrames={15}>
                    <Audio src={staticFile('audio/sfx_ui_pop.mp3')} volume={0.4} />
                </Sequence>
            ))}
            <Audio src={staticFile('audio/sfx_typing.mp3')} volume={0.2} />
        </Sequence>
      </Sequence>

      {/* S4: Result (383-485) | Speech: 87 + 15 buffer */}
      <Sequence from={383} durationInFrames={102}>
        <Transition duration={102}>
            <Scene4Score />
        </Transition>
        <SceneAudio filename="v3_s4_result" />
        <Sequence from={15} durationInFrames={70}>
          <Audio src={staticFile('audio/sfx_power_up.mp3')} volume={0.25} />
        </Sequence>
        <Sequence from={80} durationInFrames={30}>
          <Audio src={staticFile('audio/sfx_success_chime.mp3')} volume={0.4} />
        </Sequence>
      </Sequence>

      {/* S5: CTA (485-632) | Speech: 91 + 56 buffer */}
      <Sequence from={485} durationInFrames={147}>
        <Scene5CTA />
        <SceneAudio filename="v3_s5_cta" />
        <Sequence from={15} durationInFrames={60}>
            <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.3} />
        </Sequence>
      </Sequence>
    </AbsoluteFill>
  );
};
