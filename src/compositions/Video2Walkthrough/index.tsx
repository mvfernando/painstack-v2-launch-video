
import React from 'react';
import { 
  AbsoluteFill, 
  Sequence, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring,
  Audio,
  staticFile
} from 'remotion';
import { colors, fonts } from '../../shared/brand';
import { SceneAudio, BackgroundMusic } from '../../shared/SceneAudio';

// Shared Screens
import { DashboardInputScene } from '../shared/screens/ScreenDashboard';
import { EvidenceCardsScene } from '../shared/screens/ScreenEvidence';
import { BlueprintScoreScene } from '../shared/screens/ScreenBlueprintScore';
import { RoadmapScene } from '../shared/screens/ScreenRoadmap';
import { DataRoomScene } from '../shared/screens/ScreenDataroom';

// --- Transition Helper ---
const Transition = ({ duration, children }: { duration: number; children: React.ReactNode }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [duration - 10, duration], [1, 0], { extrapolateRight: 'clamp' });
    return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

// --- Components ---

const FadeSlide = ({ 
  delay = 0, 
  children, 
  style 
}: { delay?: number; children: React.ReactNode; style?: React.CSSProperties }) => {
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
}: { children: React.ReactNode; bg?: string }) => (
  <AbsoluteFill style={{ 
    background: bg, 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center' 
  }}>
    {children}
  </AbsoluteFill>
);

// --- Individual Scenes ---

const SceneA = () => (
  <SceneContainer>
    <FadeSlide style={{ textAlign: 'center' }}>
      <h1 style={{ 
        fontFamily: fonts.base, 
        fontSize: 90, 
        color: colors.white, 
        fontWeight: 800,
        letterSpacing: '-2px',
        marginBottom: 10
      }}>
        From idea to <span style={{ color: colors.blue }}>launched</span>.
      </h1>
      <p style={{ 
        fontFamily: fonts.base, 
        fontSize: 42, 
        color: colors.muted,
        fontWeight: 300,
        margin: 0
      }}>
        Your AI team, from day zero.
      </p>
    </FadeSlide>
  </SceneContainer>
);

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

  return (
    <SceneContainer>
      <FadeSlide style={{ textAlign: 'center', position: 'relative', zIndex: 100, marginTop: -200 }}>
        <h2 style={{ 
          fontFamily: fonts.base, 
          fontSize: 120, 
          color: colors.orange, 
          fontWeight: 800,
          marginBottom: 30,
          textShadow: '0 0 40px rgba(249, 100, 38, 0.4)'
        }}>
          90% Fail.
        </h2>
        <div style={{ 
          fontFamily: fonts.base, 
          fontSize: 48, 
          color: colors.white,
          maxWidth: 900,
          margin: '0 auto',
          lineHeight: 1.4,
          fontWeight: 400
        }}>
          Most founders build<br/>
          <span style={{ color: colors.muted }}>the wrong product.</span>
        </div>
      </FadeSlide>
      
      {/* Cards BELOW text */}
      <AbsoluteFill style={{ pointerEvents: 'none', justifyContent: 'flex-end', paddingBottom: 100 }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: 40,
          padding: '0 100px',
        }}>
          {reasons.map((r, i) => {
            const entrance = spring({ frame: frame - r.delay, fps, config: { damping: 15 } });
            return (
              <div key={i} style={{ 
                background: colors.bgCard, 
                border: `1px solid ${colors.border}`, 
                borderRadius: 20, 
                padding: '24px',
                opacity: entrance,
                transform: `scale(${entrance}) translateY(${interpolate(entrance, [0, 1], [30, 0])}px)`,
                boxShadow: '0 15px 45px rgba(0,0,0,0.4)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: colors.orange, marginBottom: 4 }}>{r.stat}</div>
                <div style={{ fontSize: 13, color: colors.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{r.label}</div>
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
    
    // Content animations relative to card entrance
    const iconScale = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 160 } });
    const textOpacity = interpolate(frame, [delay + 5, delay + 15], [0, 1], { extrapolateRight: 'clamp' });
    const btnEntrance = spring({ frame: frame - delay - 20, fps, config: { damping: 18, stiffness: 120 } });
    const badgeOpacity = interpolate(frame, [delay + 5, delay + 15], [0, 1], { extrapolateRight: 'clamp' });

    // Active state (35 frames duration)
    const activeStart = delay + 30;
    const activeProgress = interpolate(frame, [activeStart, activeStart + 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    
    const highlightOpacity = interpolate(activeProgress, [0, 1], [0.3, 0.6]);
    const glowIntensity = interpolate(activeProgress, [0, 1], [0, 24]);

    return (
        <div style={{
            background: colors.bgCard,
            borderRadius: 16,
            padding: 28,
            border: `1px solid ${accent}`,
            opacity: entrance,
            transform: `translateY(${interpolate(entrance, [0, 1], [30, 0])}px)`,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `0 0 ${glowIntensity}px ${accent}${Math.floor(highlightOpacity * 255).toString(16).padStart(2, '0')}`,
            display: 'flex',
            flexDirection: 'column',
            gap: 16
        }}>
            {/* Active Badge */}
            <div style={{
                position: 'absolute',
                top: 20,
                right: 20,
                opacity: badgeOpacity,
                background: 'rgba(34,197,94,0.12)',
                border: '1px solid rgba(34,197,94,0.3)',
                borderRadius: 100,
                padding: '3px 10px',
                fontSize: 11,
                fontWeight: 600,
                color: '#22c55e'
            }}>
                Active
            </div>

            <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: bgIcon,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                transform: `scale(${iconScale})`,
                color: accent
            }}>
                {icon}
            </div>

            <div style={{ opacity: textOpacity }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: colors.white, marginBottom: 4 }}>{name}</div>
                <div style={{ fontSize: 13, color: colors.muted, lineHeight: 1.4, height: 40 }}>{desc}</div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, opacity: textOpacity }}>
                {tags.map((t, i) => (
                    <div key={i} style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 100,
                        fontSize: 10,
                        color: colors.muted,
                        padding: '4px 12px'
                    }}>
                        {t}
                    </div>
                ))}
            </div>

            <div style={{
                marginTop: 'auto',
                background: colors.blue,
                borderRadius: 10,
                padding: '10px',
                textAlign: 'center',
                color: colors.white,
                fontSize: 12,
                fontWeight: 700,
                opacity: btnEntrance,
                transform: `translateY(${interpolate(btnEntrance, [0, 1], [10, 0])}px)`
            }}>
                {btnText}
            </div>

            {/* Progress Bar */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: 3,
                width: `${activeProgress * 100}%`,
                background: accent
            }} />
        </div>
    );
};

const SceneEAgents = () => {
    const frame = useCurrentFrame();
    
    const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
    const subOpacity = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <SceneContainer>
            {/* Solid background first, then gradient overlay to avoid transparency */}
            <AbsoluteFill style={{ backgroundColor: colors.bg }} />
            <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 40%, rgba(45,129,224,0.12) 0%, transparent 70%)` }} />
            
            <div style={{ width: 1000, display: 'flex', flexDirection: 'column', gap: 40, zIndex: 1 }}>
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{
                        fontFamily: fonts.base,
                        fontSize: 48,
                        fontWeight: 800,
                        color: colors.white,
                        letterSpacing: '-1.5px',
                        marginBottom: 10,
                        opacity: titleOpacity
                    }}>
                        Your AI Executive Team
                    </h2>
                    <p style={{
                        fontFamily: fonts.base,
                        fontSize: 18,
                        color: colors.muted,
                        opacity: subOpacity
                    }}>
                        Select a co-founder to start working on your blueprint.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 16
                }}>
                    <AgentCard 
                        name="AI CTO"
                        icon="</>"
                        desc="From MVP scope to launch-ready build plan."
                        tags={["Define MVP scope", "Jump to PRPs"]}
                        btnText="Open AI CTO workspace →"
                        accent="#22c55e"
                        bgIcon="rgba(34,197,94,0.12)"
                        delay={30}
                    />
                    <AgentCard 
                        name="AI CEO"
                        icon="💼"
                        desc="Strategic roadmap, fundraising, and north-star metrics."
                        tags={["Generate 90-day roadmap", "Define metrics"]}
                        btnText="Open AI CEO workspace →"
                        accent="#2d81e0"
                        bgIcon="rgba(45,129,224,0.12)"
                        delay={45}
                    />
                    <AgentCard 
                        name="AI CMO"
                        icon="📣"
                        desc="Go-to-market strategy, positioning, and launch plan."
                        tags={["Clarify positioning", "Draft launch plan"]}
                        btnText="Open AI CMO workspace →"
                        accent="#f96426"
                        bgIcon="rgba(249,100,38,0.12)"
                        delay={55}
                    />
                    <AgentCard 
                        name="Market Agent"
                        icon="📈"
                        desc="Market signals, competitor landscape, and demand validation."
                        tags={["Scan discussion level", "Map solutions"]}
                        btnText="Open Market Agent workspace →"
                        accent="#a78bfa"
                        bgIcon="rgba(167,139,250,0.12)"
                        delay={65}
                    />
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 12,
                    opacity: interpolate(frame, [160, 175], [0, 1], { extrapolateRight: 'clamp' })
                }}>
                    <div style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: colors.blue,
                        opacity: Math.round(frame / 15) % 2 === 0 ? 1 : 0.3
                    }} />
                    <div style={{ fontSize: 14, color: colors.muted, fontFamily: fonts.base }}>
                        Analysing 847 community posts across 12 subreddits...
                    </div>
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
            background: `radial-gradient(circle at 50% 50%, ${colors.blue}44 0%, transparent 70%)`,
            opacity: interpolate(entrance, [0, 1], [0, 1])
        }} />
        
        <AbsoluteFill style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexDirection: 'column'
        }}>
            <div style={{ 
                textAlign: 'center',
                opacity: entrance,
                transform: `scale(${interpolate(entrance, [0, 1], [0.95, 1])})`
            }}>
                <div style={{ 
                    position: 'relative',
                    width: 260,
                    height: 260,
                    margin: '0 auto 40px',
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
                </div>
                
                <h2 style={{
                    fontFamily: fonts.base,
                    fontSize: 80,
                    fontWeight: 900,
                    color: colors.white,
                    marginBottom: 20,
                    letterSpacing: '-3px',
                    lineHeight: 1
                }}>
                    Start building for real.
                </h2>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 20,
                    marginBottom: 40,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {["Free to start", "No card required", "Results in minutes"].map((item, i) => (
                        <React.Fragment key={item}>
                            <div style={{
                                fontSize: 22,
                                color: colors.muted,
                                fontFamily: fonts.base,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8
                            }}>
                                <span style={{ color: colors.green, fontWeight: 900 }}>✓</span> {item}
                            </div>
                            {i < 2 && <div style={{ color: colors.muted, fontSize: 24, fontWeight: 300 }}>.</div>}
                        </React.Fragment>
                    ))}
                </div>

                <div style={{
                    padding: '24px 70px',
                    borderRadius: 100,
                    background: `linear-gradient(135deg, ${colors.orange}, #ff7e47)`,
                    color: colors.white,
                    fontSize: 32,
                    fontWeight: 900,
                    display: 'inline-block',
                    boxShadow: `0 25px 50px ${colors.orange}44`,
                    border: '2px solid rgba(255,255,255,0.1)'
                }}>
                    TRY IT FREE →
                </div>
                <p style={{ 
                    fontFamily: fonts.base, 
                    fontSize: 32, 
                    color: colors.blue,
                    fontWeight: 600,
                    marginTop: 30,
                    letterSpacing: '-1px'
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

      {/* Hero (0-156) | Audio: 126 frames + 30 buffer */}
      <Sequence durationInFrames={156}>
        <SceneA />
        <SceneAudio filename="v2_sa_hero" />
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.15} />
      </Sequence>

      {/* S2: Problem (156-433) | Audio: 247 frames + 30 buffer */}
      <Sequence from={156} durationInFrames={277}>
        <Transition duration={277}>
          <SceneB />
        </Transition>
        <SceneAudio filename="v2_sb_problem" />
        <Sequence from={60} durationInFrames={160}>
            {/* POP sounds for reasons */}
            {[0, 15, 30, 45, 60, 75].map((d, i) => (
                <Sequence key={i} from={d} durationInFrames={15}>
                    <Audio src={staticFile('audio/sfx_pop_soft.mp3')} volume={0.15} />
                </Sequence>
            ))}
        </Sequence>
      </Sequence>

      {/* S3: Dashboard Input (433-721) | Audio: 258 frames + 30 buffer */}
      <Sequence from={433} durationInFrames={288}>
        <Transition duration={288}>
            <DashboardInputScene withInteractions />
        </Transition>
        <SceneAudio filename="v2_sc_input" />
        <Sequence from={20} durationInFrames={120}>
          <Audio src={staticFile('audio/sfx_typing.mp3')} volume={0.15} />
        </Sequence>
        <Sequence from={258} durationInFrames={20}>
          <Audio src={staticFile('audio/sfx_click.mp3')} volume={0.4} />
        </Sequence>
      </Sequence>

      {/* S4: Evidence (721-1066) | Audio: 315 frames + 30 buffer */}
      <Sequence from={721} durationInFrames={345}>
        <Transition duration={345}>
            <EvidenceCardsScene />
        </Transition>
        <SceneAudio filename="v2_sd_evidence" />
        <Sequence from={25} durationInFrames={60}>
          <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.2} />
        </Sequence>
        {[40, 55, 70].map((d, i) => (
          <Sequence key={i} from={d} durationInFrames={30}>
            <Audio src={staticFile('audio/sfx_pop_soft.mp3')} volume={0.15} />
          </Sequence>
        ))}
      </Sequence>

      {/* S5: Agents (1066-1323) | Audio: 227 frames + 30 buffer */}
      <Sequence from={1066} durationInFrames={257}>
        <SceneEAgents />
        <SceneAudio filename="v2_se_agents" volume={1} />
      </Sequence>

      {/* S6: Blueprint Score (1323-1651) | Audio: 298 frames + 30 buffer */}
      <Sequence from={1323} durationInFrames={328}>
        <BlueprintScoreScene />
        <SceneAudio filename="v2_sf_blueprint" />
        <Sequence from={20} durationInFrames={70}>
          <Audio src={staticFile('audio/sfx_power_up.mp3')} volume={0.2} />
        </Sequence>
        <Sequence from={90} durationInFrames={30}>
          <Audio src={staticFile('audio/sfx_success_chime.mp3')} volume={0.3} />
        </Sequence>
      </Sequence>

      {/* S6c: Dataroom (1651-1934) | Audio: 253 frames + 30 buffer */}
      <Sequence from={1651} durationInFrames={283}>
        <DataRoomScene />
        <SceneAudio filename="v2_sh_dataroom" />
        <Sequence from={20} durationInFrames={60}>
          <Audio src={staticFile('audio/sfx_ui_glitch.mp3')} volume={0.1} />
        </Sequence>
      </Sequence>

      {/* S7: CTA (1934-2200) | Audio: 166 frames + huge buffer for end screen */}
      <Sequence from={1934} durationInFrames={266}>
        <SceneG />
        <SceneAudio filename="v2_sg_cta" />
        <Sequence from={15} durationInFrames={60}>
          <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.25} />
        </Sequence>
      </Sequence>
    </AbsoluteFill>
  );
};
