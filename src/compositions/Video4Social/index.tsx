import { 
  AbsoluteFill, 
  Sequence, 
  useCurrentFrame, 
  useVideoConfig,
  interpolate, 
  Audio, 
  staticFile
} from 'remotion';
import { colors, fonts } from '../../shared/brand';

// Shared Screens
import { DashboardInputScene } from '../shared/screens/ScreenDashboard';
import { BlueprintScoreScene } from '../shared/screens/ScreenBlueprintScore';
import { ExecutiveTeamScene } from '../shared/screens/ScreenAgents';
import { RoadmapScene } from '../shared/screens/ScreenRoadmap';

// Shared Components
import { BackgroundMusic } from '../../shared/SceneAudio';

// Local Components
import { ImpactText } from './ImpactText';
import { CTAUnderline } from './CTAUnderline';

// --- Visual Helpers ---

const Transition = ({ duration, children }: { duration: number; children: React.ReactNode }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [duration - 15, duration - 5], [1, 0], { extrapolateRight: 'clamp' });
    return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

export const Video4Social = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isVertical = height > width;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.lightBg, overflow: 'hidden' }}>
      <BackgroundMusic volume={0.12} filename="v5_social_beat" />
      
      {/* 1. DASHBOARD ACTION | 0 – 300 (5s) | Typing to Click */}
      <Sequence durationInFrames={300}>
        <Sequence from={40} durationInFrames={220}>
            <Audio src={staticFile('audio/sfx_typing.mp3')} volume={0.15} />
        </Sequence>
        <Sequence from={220} durationInFrames={40}>
          <Audio src={staticFile('audio/sfx_click.mp3')} volume={0.5} />
        </Sequence>
        <Transition duration={300}>
            <DashboardInputScene 
                theme="light" 
                customText="Freelance designers spend 4 hours a week building proposals manually. Most of them are never signed." 
                withInteractions={true}
            />
        </Transition>
      </Sequence>

      {/* 2. BLUEPRINT RESULT | 300 – 600 (5s) | Click Outcome */}
      <Sequence from={300} durationInFrames={300}>
        <Sequence from={20} durationInFrames={60}>
            <Audio src={staticFile('audio/sfx_success_chime.mp3')} volume={0.4} />
        </Sequence>
        <Transition duration={300}>
            <BlueprintScoreScene 
                theme="light" 
                targetScore={84}
                cardWidth={isVertical ? "95%" : "80%"}
                metrics={[
                    { label: "Inefficient Task", val: "PROPOSALS", color: colors.orange, delay: 60 },
                    { label: "Time Wasted", val: "4H / WEEK", color: colors.orange, delay: 75 },
                    { label: "Market Rejection", val: "92% RATE", color: colors.red, delay: 90 },
                    { label: "Validation Signal", val: "STRONG", color: colors.green, delay: 105 },
                ]}
            />
        </Transition>
      </Sequence>

      {/* 3. IMPACT TEXT #1 | 600 – 720 (2s) | Snap to Beat */}
      <Sequence from={600} durationInFrames={120}>
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.15} />
        <Transition duration={120}>
            <ImpactText 
                lines={[
                    { text: "Real evidence.", color: colors.lightText },
                    { text: "Not guesses.", color: colors.lightText, accent: { word: "guesses.", color: colors.orange } }
                ]}
            />
        </Transition>
      </Sequence>

      {/* 4. AI AGENTS TEAM | 720 – 1020 (5s) | Build Engine */}
      <Sequence from={720} durationInFrames={300}>
        <Transition duration={300}>
            <ExecutiveTeamScene theme="light" />
        </Transition>
      </Sequence>

      {/* 5. IMPACT TEXT #2 | 1020 – 1140 (2s) | Beat Sync */}
      <Sequence from={1020} durationInFrames={120}>
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.15} />
        <Transition duration={120}>
            <ImpactText 
                lines={[
                    { text: "4 co-founders.", color: colors.lightText },
                    { text: "Zero salary.", color: colors.lightText, accent: { word: "salary.", color: colors.blue } }
                ]}
            />
        </Transition>
      </Sequence>

      {/* 6. ROADMAP | 1140 – 1440 (5s) | Execution */}
      <Sequence from={1140} durationInFrames={300}>
        <Transition duration={300}>
            <RoadmapScene 
                theme="light"
                title="Execution Roadmap"
                subtitle="90 Days to Market Domination"
                progress={31}
                cardWidth={isVertical ? "95%" : "85%"}
                phases={[
                    { phase: "Week 1-2", title: "Core Scope", weeks: "Active", status: "done", items: ["Proposal automation", "Review loop"], delay: [20, 40] },
                    { phase: "Week 3-8", title: "Build Engine", weeks: "Coming Up", status: "active", items: ["Smart templates", "AI generator"], delay: [35, 55] },
                    { phase: "Week 9-10", title: "Launch High", weeks: "Next", status: "upcoming", items: ["Beta testers", "GTM Strategy"], delay: [50, 70] },
                    { phase: "Week 12+", title: "Scale", weeks: "Future", status: "upcoming", items: ["Public release", "Growth"], delay: [65, 85] },
                ]}
            />
        </Transition>
      </Sequence>

      {/* 7. IMPACT TEXT #3 | 1440 – 1560 (2s) | Punchy Verdict */}
      <Sequence from={1440} durationInFrames={120}>
        <Audio src={staticFile('audio/sfx_whoosh_clean.mp3')} volume={0.15} />
        <Transition duration={120}>
            <ImpactText 
                lines={[
                    { text: "Zero code.", color: colors.lightText, accent: { word: "code.", color: colors.green } },
                    { text: "Zero team.", color: colors.lightText }
                ]}
            />
        </Transition>
      </Sequence>

      {/* 8. FINAL CTA | 1560 – 2100 (9s) | Rich End Card */}
      <Sequence from={1560} durationInFrames={540}>
        <AbsoluteFill style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: isVertical ? 'flex-start' : 'center',
          paddingTop: isVertical ? 240 : 0,
          fontFamily: fonts.base,
          paddingLeft: isVertical ? 40 : 100,
          paddingRight: isVertical ? 40 : 100
        }}>
          <div style={{
            opacity: interpolate(frame - 1560, [0, 20], [0, 1]),
            marginBottom: isVertical ? 60 : 40
          }}>
            <img 
              src={staticFile('shared/Painstack.ai_logo1.png')} 
              style={{ height: isVertical ? 80 : 60, width: 'auto' }} 
              alt="Logo"
            />
          </div>

          <div style={{
            opacity: interpolate(frame - 1560, [10, 30], [0, 1]),
            color: colors.orange,
            fontSize: isVertical ? 20 : 16,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: 20
          }}>
            Your Startup Journey Starts Here.
          </div>
          
          <div style={{
            color: colors.lightText,
            fontSize: isVertical ? 48 : 36,
            fontWeight: 800,
            textAlign: 'center',
            marginBottom: isVertical ? 80 : 60,
            lineHeight: 1.1
          }}>
            Validate your idea free at<br/>
            <span style={{ fontSize: isVertical ? 56 : 52, fontWeight: 900, color: colors.lightText, display: 'block', marginTop: 15 }}>
                usepainstackai.com
            </span>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 15 }}>
                <CTAUnderline width={isVertical ? 360 : 450} delay={1560 + 40} />
            </div>
          </div>

          <div style={{
              display: 'flex',
              flexDirection: isVertical ? 'column' : 'row',
              alignItems: 'center',
              gap: isVertical ? 24 : 40,
              opacity: interpolate(frame - 1560, [60, 80], [0, 1])
          }}>
              {['No code required', 'AI Team from Day 0', 'Real Market Data'].map((tag, i) => (
                  <div key={i} style={{ color: colors.lightMuted, fontSize: isVertical ? 20 : 14, fontWeight: 600 }}>
                      ✓ {tag}
                  </div>
              ))}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Global Final Fade to White */}
      <AbsoluteFill style={{ 
        backgroundColor: 'white', 
        opacity: interpolate(frame, [2080, 2100], [0, 1]),
        pointerEvents: 'none'
      }} />

    </AbsoluteFill>
  );
};
