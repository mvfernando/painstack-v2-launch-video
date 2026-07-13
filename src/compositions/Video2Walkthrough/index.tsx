
import React, { type ReactNode, type CSSProperties, useMemo } from 'react';
import { 
  AbsoluteFill, 
  Sequence, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring,
  Audio,
  staticFile,
} from 'remotion';
import { colors, fonts } from '../../shared/brand';
import { SceneAudio, BackgroundMusic } from '../../shared/SceneAudio';

// Shared Screens
import { DashboardInputScene } from '../shared/screens/ScreenDashboard';
import { EvidenceCardsScene } from '../shared/screens/ScreenEvidence';
import { BlueprintScoreScene } from '../shared/screens/ScreenBlueprintScore';
import { DataRoomScene } from '../shared/screens/ScreenDataroom';

// --- Transition Helper ---
const Transition = ({ duration, children }: { duration: number; children: ReactNode }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [duration - 10, duration], [1, 0], { extrapolateRight: 'clamp' });
    return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

const Particle = ({ delay, speed, x, y, size }: { delay: number; speed: number; x: number; y: number; size: number }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(Math.sin((frame - delay) / 20), [-1, 1], [0.1, 0.3]);
    const translateY = Math.sin((frame - delay) / speed) * 15;
    
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
        boxShadow: 'inset 0 0 300px rgba(0,0,0,0.7)',
        pointerEvents: 'none',
        zIndex: 5
    }} />
);

// --- Components ---

const FadeSlide = ({ 
  delay = 0, 
  children, 
  style 
}: { delay?: number; children: ReactNode; style?: CSSProperties }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const spr = spring({ 
    frame: frame - delay, 
    fps, 
    config: { damping: 20, stiffness: 60 } 
  });
  
  const opacity = interpolate(spr, [0, 1], [0, 1]);
  const y = interpolate(spr, [0, 1], [20, 0]);

  return (
    <div style={{ 
      opacity, 
      transform: `translateY(${y}px)`, 
      ...style 
    }}>
      {children}
    </div>
  );
};

const SceneContainer = ({ 
  children, 
  bg = colors.bg 
}: { children: ReactNode; bg?: string }) => (
  <AbsoluteFill style={{ 
    background: bg, 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    overflow: 'hidden'
  }}>
    {children}
  </AbsoluteFill>
);

// --- Individual Scenes ---

const SceneA = () => {
    const particles = useMemo(() => {
        return Array.from({ length: 12 }).map((_, i) => ({
            delay: Math.random() * 100,
            speed: 40 + Math.random() * 30,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 2 + Math.random() * 3
        }));
    }, []);

    return (
        <SceneContainer>
            <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 50%, rgba(45,129,224,0.08) 0%, transparent 80%)` }} />
            {particles.map((p, i) => <Particle key={i} {...p} />)}
            <Vignette />
            
            <FadeSlide style={{ textAlign: 'center', zIndex: 10 }}>
                <h1 style={{ 
                    fontFamily: fonts.base, 
                    fontSize: 100, 
                    color: colors.white, 
                    fontWeight: 900,
                    letterSpacing: '-4px',
                    marginBottom: 15,
                    lineHeight: 1
                }}>
                    From idea to <span style={{ color: colors.blue }}>launched</span>.
                </h1>
                <p style={{ 
                    fontFamily: fonts.base, 
                    fontSize: 42, 
                    color: colors.muted,
                    fontWeight: 400,
                    margin: 0,
                    letterSpacing: '-1px'
                }}>
                    Your AI Executive Team, from day zero.
                </p>
            </FadeSlide>
        </SceneContainer>
    );
};

const SceneB = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const reasons = [
    { label: "No Market Need", stat: "42%", delay: 60 },
    { label: "Ran Out of Cash", stat: "38%", delay: 75 },
    { label: "Wrong Team", stat: "23%", delay: 90 },
    { label: "Poor Product-Fit", stat: "19%", delay: 105 },
    { label: "Too Late", stat: "15%", delay: 120 },
    { label: "High Burn", stat: "12%", delay: 135 }
  ];

  // Screen shake on major stat discovery
  const shake = spring({ frame: frame - 60, fps, config: { damping: 10, stiffness: 200 } });
  const shakeOffset = interpolate(shake, [0, 0.1, 1], [0, 6, 0]);

  return (
    <SceneContainer>
      <AbsoluteFill style={{ 
          background: `radial-gradient(circle at 50% 40%, rgba(249,100,38,0.1) 0%, transparent 70%)`,
          transform: `translate(${Math.random() * shakeOffset}px, ${Math.random() * shakeOffset}px)`
      }} />
      <Vignette />

      <FadeSlide style={{ textAlign: 'center', position: 'relative', zIndex: 100, marginTop: -200 }}>
        <h2 style={{ 
          fontFamily: fonts.base, 
          fontSize: 130, 
          color: colors.orange, 
          fontWeight: 900,
          marginBottom: 30,
          letterSpacing: '-6px',
          textShadow: `0 0 50px ${colors.orange}66, 0 0 30px rgba(0,0,0,0.8)`
        }}>
          90% Fail.
        </h2>
        <div style={{ 
          fontFamily: fonts.base, 
          fontSize: 52, 
          color: colors.white,
          maxWidth: 900,
          margin: '0 auto',
          lineHeight: 1.3,
          fontWeight: 500,
          letterSpacing: '-2px'
        }}>
          Most founders build<br/>
          <span style={{ color: colors.muted }}>the wrong product.</span>
        </div>
      </FadeSlide>
      
      {/* Cards BELOW text with drift */}
      <AbsoluteFill style={{ pointerEvents: 'none', justifyContent: 'flex-end', paddingBottom: 100 }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: 40,
          padding: '0 100px',
        }}>
          {reasons.map((r, i) => {
            const entrance = spring({ frame: frame - r.delay, fps, config: { damping: 15 } });
            const drift = Math.sin((frame - r.delay) / 25) * 8;
            return (
              <div key={i} style={{ 
                background: 'rgba(30, 41, 59, 0.6)', 
                backdropFilter: 'blur(12px)',
                border: `1px solid ${colors.border}`, 
                borderRadius: 20, 
                padding: '28px',
                opacity: entrance,
                transform: `scale(${entrance}) translateY(${interpolate(entrance, [0, 1], [40, 0]) + drift}px)`,
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 40, fontWeight: 900, color: colors.orange, marginBottom: 4 }}>{r.stat}</div>
                <div style={{ fontSize: 13, color: colors.muted, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>{r.label}</div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </SceneContainer>
  );
};

const AgentCard = ({ 
    icon, 
    name, 
    desc, 
    tags, 
    btnText, 
    accent, 
    delay, 
    bgIcon 
}: { 
    icon: string; 
    name: string; 
    desc: string; 
    tags: string[]; 
    btnText: string; 
    accent: string; 
    delay: number;
    bgIcon: string;
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 120 } });
    
    // Pulse on active
    const pulse = Math.sin(frame / 6) * 0.05 + 1;
    const isActive = frame > delay + 30 && frame < delay + 70;

    return (
        <div style={{
            background: colors.bgCard,
            borderRadius: 20,
            padding: 32,
            border: `1px solid ${isActive ? accent : colors.border}`,
            opacity: entrance,
            transform: `translateY(${interpolate(entrance, [0, 1], [30, 0])}px) scale(${isActive ? pulse : 1})`,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: isActive ? `0 0 40px ${accent}44` : '0 20px 60px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            transition: 'border 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease-out'
        }}>
            <div style={{
                position: 'absolute',
                top: 20,
                right: 20,
                background: isActive ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${isActive ? '#22c55e' : colors.border}`,
                borderRadius: 100,
                padding: '4px 12px',
                fontSize: 11,
                fontWeight: 700,
                color: isActive ? '#22c55e' : colors.muted
            }}>
                {isActive ? 'Processing...' : 'Ready'}
            </div>

            <div style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: bgIcon,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                color: accent,
                boxShadow: isActive ? `0 0 20px ${accent}66` : 'none'
            }}>
                {icon}
            </div>

            <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: colors.white, marginBottom: 6 }}>{name}</div>
                <div style={{ fontSize: 14, color: colors.muted, lineHeight: 1.5, height: 42 }}>{desc}</div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {tags.map((t, i) => (
                    <div key={i} style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: `1px solid ${colors.border}`,
                        borderRadius: 100,
                        fontSize: 11,
                        color: colors.muted,
                        padding: '6px 14px',
                        fontWeight: 500
                    }}>
                        {t}
                    </div>
                ))}
            </div>

            <div style={{
                marginTop: 'auto',
                background: isActive ? accent : colors.blue,
                borderRadius: 12,
                padding: '14px',
                textAlign: 'center',
                color: colors.white,
                fontSize: 14,
                fontWeight: 900,
                boxShadow: `0 10px 20px ${isActive ? accent : colors.blue}44`
            }}>
                {btnText}
            </div>
        </div>
    );
};

const SceneEAgents = () => {
    
    return (
        <SceneContainer>
            <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 40%, rgba(45,129,224,0.15) 0%, transparent 80%)` }} />
            <Vignette />
            
            <div style={{ width: 1100, display: 'flex', flexDirection: 'column', gap: 50, zIndex: 10 }}>
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{
                        fontFamily: fonts.base,
                        fontSize: 56,
                        fontWeight: 900,
                        color: colors.white,
                        letterSpacing: '-2px',
                        marginBottom: 10,
                    }}>
                        Your AI Executive Team
                    </h2>
                    <p style={{
                        fontFamily: fonts.base,
                        fontSize: 22,
                        color: colors.muted,
                        fontWeight: 400
                    }}>
                        A world-class board specialized in validating and scaling your vision.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 24
                }}>
                    <AgentCard 
                        name="AI CTO" icon="</>" accent="#22c55e" bgIcon="rgba(34,197,94,0.12)"
                        desc="From MVP scope to launch-ready build plan."
                        tags={["Define MVP scope", "Jump to PRPs"]}
                        btnText="AI CTO Active →" delay={30}
                    />
                    <AgentCard 
                        name="AI CEO" icon="💼" accent="#2d81e0" bgIcon="rgba(45,129,224,0.12)"
                        desc="Strategic roadmap, fundraising, and north-star metrics."
                        tags={["Generate 90-day roadmap", "Define metrics"]}
                        btnText="Open AI CEO workspace →" delay={45}
                    />
                    <AgentCard 
                        name="AI CMO" icon="📣" accent="#f96426" bgIcon="rgba(249,100,38,0.12)"
                        desc="Go-to-market strategy, positioning, and launch plan."
                        tags={["Clarify positioning", "Draft launch plan"]}
                        btnText="Open AI CMO workspace →" delay={60}
                    />
                    <AgentCard 
                        name="Market Agent" icon="📈" accent="#a78bfa" bgIcon="rgba(167,139,250,0.12)"
                        desc="Market signals, competitor landscape, and demand validation."
                        tags={["Scan discussion level", "Map solutions"]}
                        btnText="Open Market Agent workspace →" delay={75}
                    />
                </div>
            </div>
        </SceneContainer>
    );
};

const SceneG = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entrance = spring({ frame, fps, config: { damping: 20 } });
    const logoEntrance = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 100 } });

    return (
    <AbsoluteFill style={{ background: colors.bg }}> 
        <AbsoluteFill style={{ 
            background: `radial-gradient(circle at 50% 50%, ${colors.blue}55 0%, transparent 70%)`,
            opacity: interpolate(entrance, [0, 1], [0, 1])
        }} />
        <Vignette />
        
        <AbsoluteFill style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexDirection: 'column',
            zIndex: 10
        }}>
            <div style={{ 
                textAlign: 'center',
                opacity: entrance,
                transform: `scale(${interpolate(entrance, [0, 1], [0.95, 1])})`
            }}>
                <div style={{ 
                    position: 'relative',
                    width: 280,
                    height: 280,
                    margin: '0 auto 50px',
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
                      inset: -40,
                      background: `radial-gradient(circle, ${colors.blue}44 0%, transparent 70%)`,
                      opacity: Math.sin(frame / 10) * 0.3 + 0.4
                  }} />
                </div>
                
                <h2 style={{
                    fontFamily: fonts.base,
                    fontSize: 90,
                    fontWeight: 900,
                    color: colors.white,
                    marginBottom: 30,
                    letterSpacing: '-4px',
                    lineHeight: 1
                }}>
                    Start building for real.
                </h2>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 20,
                    marginBottom: 50,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {["Free to start", "No card required", "Results in minutes"].map((item, i) => (
                        <React.Fragment key={item}>
                            <div style={{
                                fontSize: 24,
                                color: colors.muted,
                                fontFamily: fonts.base,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                fontWeight: 500
                            }}>
                                <span style={{ color: colors.green, fontWeight: 900 }}>✓</span> {item}
                            </div>
                            {i < 2 && <div style={{ color: colors.muted, fontSize: 28, fontWeight: 300 }}>.</div>}
                        </React.Fragment>
                    ))}
                </div>

                <div style={{
                    padding: '28px 80px',
                    borderRadius: 100,
                    background: `linear-gradient(135deg, ${colors.orange}, #ff7e47)`,
                    color: colors.white,
                    fontSize: 36,
                    fontWeight: 900,
                    display: 'inline-block',
                    boxShadow: `0 30px 60px ${colors.orange}55`,
                    border: '2px solid rgba(255,255,255,0.1)'
                }}>
                    GET STARTED FREE →
                </div>
                <p style={{ 
                    fontFamily: fonts.base, 
                    fontSize: 38, 
                    color: colors.blue,
                    fontWeight: 700,
                    marginTop: 40,
                    letterSpacing: '-1.5px'
                }}>
                    usepainstackai.com
                </p>
            </div>
        </AbsoluteFill>
    </AbsoluteFill>
    );
};

// --- Walkthrough Composition ---

export const Video2Walkthrough = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <BackgroundMusic volume={0.06} />

      {/* Hero (0-246) | Speech: 226 frames + 20 buffer */}
      <Sequence durationInFrames={246}>
        <SceneA />
        <SceneAudio filename="v2_sa_hero" />
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.15} />
      </Sequence>

      {/* S2: Problem (246-554) | Speech: 288 frames + 20 buffer */}
      <Sequence from={246} durationInFrames={308}>
        <Transition duration={308}>
          <SceneB />
        </Transition>
        <SceneAudio filename="v2_sb_problem" />
        <Sequence from={60} durationInFrames={160}>
            {/* POP sounds for reasons */}
            {[0, 15, 30, 45, 60, 75].map((d, i) => (
                <Sequence key={i} from={d} durationInFrames={15}>
                    <Audio src={staticFile('audio/sfx_ui_pop.mp3')} volume={0.15} />
                </Sequence>
            ))}
        </Sequence>
      </Sequence>

      {/* S3: Dashboard Input (554-800) | Speech: 226 frames + 20 buffer */}
      <Sequence from={554} durationInFrames={246}>
        <Transition duration={246}>
            <DashboardInputScene withInteractions />
        </Transition>
        <SceneAudio filename="v2_sc_input" />
        <Sequence from={20} durationInFrames={120}>
          <Audio src={staticFile('audio/sfx_typing.mp3')} volume={0.15} />
        </Sequence>
        <Sequence from={154} durationInFrames={20}>
          <Audio src={staticFile('audio/sfx_click.mp3')} volume={0.4} />
        </Sequence>
      </Sequence>

      {/* S4: Evidence (800-1098) | Speech: 278 frames + 20 buffer */}
      <Sequence from={800} durationInFrames={298}>
        <Transition duration={298}>
            <EvidenceCardsScene />
        </Transition>
        <SceneAudio filename="v2_sd_evidence" />
        <Sequence from={25} durationInFrames={60}>
          <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.2} />
        </Sequence>
        {[40, 55, 70].map((d, i) => (
          <Sequence key={i} from={d} durationInFrames={30}>
            <Audio src={staticFile('audio/sfx_ui_pop.mp3')} volume={0.15} />
          </Sequence>
        ))}
      </Sequence>

      {/* S5: Agents (1098-1416) | Speech: 298 frames + 20 buffer */}
      <Sequence from={1098} durationInFrames={318}>
        <SceneEAgents />
        <SceneAudio filename="v2_se_agents" volume={1} />
      </Sequence>

      {/* S6: Blueprint Score (1416-1711) | Speech: 275 frames + 20 buffer */}
      <Sequence from={1416} durationInFrames={295}>
        <BlueprintScoreScene />
        <SceneAudio filename="v2_sf_blueprint" />
        <Sequence from={20} durationInFrames={70}>
          <Audio src={staticFile('audio/sfx_power_up.mp3')} volume={0.2} />
        </Sequence>
        <Sequence from={90} durationInFrames={30}>
          <Audio src={staticFile('audio/sfx_success_chime.mp3')} volume={0.3} />
        </Sequence>
      </Sequence>

      {/* S6c: Dataroom (1711-2000) | Speech: 269 frames + 20 buffer */}
      <Sequence from={1711} durationInFrames={289}>
        <DataRoomScene />
        <SceneAudio filename="v2_sh_dataroom" />
        <Sequence from={20} durationInFrames={60}>
          <Audio src={staticFile('audio/sfx_ui_glitch.mp3')} volume={0.1} />
        </Sequence>
      </Sequence>

      {/* S7: CTA (2000-2213) | Speech: 163 frames + huge buffer for end screen */}
      <Sequence from={2000} durationInFrames={213}>
        <SceneG />
        <SceneAudio filename="v2_sg_cta" />
        <Sequence from={15} durationInFrames={60}>
          <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.25} />
        </Sequence>
      </Sequence>
    </AbsoluteFill>
  );
};
