
import { 
  AbsoluteFill, 
  Sequence, 
  useCurrentFrame, 
  interpolate, 
} from 'remotion';
import { colors, fonts } from '../../shared/brand';

// Shared Screens
import { DashboardInputScene } from '../shared/screens/ScreenDashboard';
import { BlueprintScoreScene } from '../shared/screens/ScreenBlueprintScore';
import { ExecutiveTeamScene } from '../shared/screens/ScreenAgents';
import { RoadmapScene } from '../shared/screens/ScreenRoadmap';

// Local Components
import { ImpactText } from './ImpactText';
import { CTAUnderline } from './CTAUnderline';

export const Video4Social = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.lightBg, overflow: 'hidden' }}>
      
      {/* CENA 1 | F0–F180 | UI — Dashboard Empty */}
      <Sequence from={0} durationInFrames={180}>
        <DashboardInputScene theme="light" customText="" />
      </Sequence>

      {/* CENA 2 | F180–F540 | UI — Typewriter input (B2B Example) */}
      <Sequence from={180} durationInFrames={360}>
        <DashboardInputScene 
          theme="light" 
          customText="Freelance designers spend 4 hours a week building proposals manually. Most of them are never signed." 
          withInteractions={true}
        />
      </Sequence>

      {/* CENA 3 | F540–F840 | UI — Blueprint resultado (Light theme) */}
      <Sequence from={540} durationInFrames={300}>
        <BlueprintScoreScene 
          theme="light" 
          targetScore={81}
          cardWidth="80%"
          metrics={[
            { label: "Inefficient Task", val: "PROPOSALS", color: colors.orange, delay: 60 },
            { label: "Time Wasted", val: "4H / WEEK", color: colors.orange, delay: 75 },
            { label: "Market Rejection", val: "92% RATE", color: colors.red, delay: 90 },
            { label: "Validation Signal", val: "STRONG", color: colors.green, delay: 105 },
          ]}
        />
      </Sequence>

      {/* CENA 4 | F840–F960 | TEXTO IMPACTO #1 */}
      <Sequence from={840} durationInFrames={120}>
        <ImpactText 
          lines={[
            { text: "Real evidence.", color: colors.lightText },
            { text: "Not guesses.", color: colors.lightText, accent: { word: "guesses.", color: colors.orange } }
          ]}
        />
      </Sequence>

      {/* CENA 5 | F960–F1260 | UI — AI Executive Team (Light theme) */}
      <Sequence from={960} durationInFrames={300}>
        <ExecutiveTeamScene theme="light" />
      </Sequence>

      {/* CENA 6 | F1260–F1380 | TEXTO IMPACTO #2 */}
      <Sequence from={1260} durationInFrames={120}>
        <ImpactText 
          lines={[
            { text: "4 co-founders.", color: colors.lightText },
            { text: "Zero salary.", color: colors.lightText, accent: { word: "salary.", color: colors.blue } }
          ]}
        />
      </Sequence>

      {/* CENA 7 | F1380–F1680 | UI — Roadmap (Light theme) */}
      <Sequence from={1380} durationInFrames={300}>
        <RoadmapScene 
          theme="light"
          title="Execution Roadmap"
          subtitle="90 Days to Market Domination"
          progress={23}
          cardWidth="85%"
          phases={[
            { phase: "Week 1-2", title: "Core Scope", weeks: "Active", status: "done", items: ["Proposal automation", "Review loop"], delay: [20, 40] },
            { phase: "Week 3-8", title: "Build Engine", weeks: "Coming Up", status: "active", items: ["Smart templates", "AI generator"], delay: [35, 55] },
            { phase: "Week 9-10", title: "Launch High", weeks: "Next", status: "upcoming", items: ["Beta testers", "GTM Strategy"], delay: [50, 70] },
            { phase: "Week 12+", title: "Scale", weeks: "Future", status: "upcoming", items: ["Public release", "Growth"], delay: [65, 85] },
          ]}
        />
      </Sequence>

      {/* CENA 8 | F1680–F1800 | TEXTO IMPACTO #3 */}
      <Sequence from={1680} durationInFrames={120}>
        <ImpactText 
          lines={[
            { text: "Zero code.", color: colors.lightText, accent: { word: "code.", color: colors.green } },
            { text: "Zero team.", color: colors.lightText }
          ]}
        />
      </Sequence>

      {/* CENA 9 | F1800–F2100 | CTA FINAL */}
      <Sequence from={1800} durationInFrames={300}>
        <AbsoluteFill style={{ 
          backgroundColor: colors.lightBg, 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          fontFamily: fonts.base
        }}>
          <div style={{
            opacity: interpolate(frame - 1800, [0, 20], [0, 1]),
            color: '#94A3B8',
            fontSize: 14,
            fontWeight: 300,
            marginBottom: 20
          }}>
            Your first blueprint is free.
          </div>
          
          <div style={{
            color: colors.lightText,
            fontSize: 32,
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: 40
          }}>
            Start validating at<br/>
            <span style={{ fontSize: 48, fontWeight: 900, color: colors.orange, display: 'block', marginTop: 10 }}>
                usepainstackai.com
            </span>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: -5 }}>
                <CTAUnderline width={340} delay={1835 + 20} />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Global Final Fade to White */}
      <AbsoluteFill style={{ 
        backgroundColor: 'white', 
        opacity: interpolate(frame, [2090, 2100], [0, 1]),
        pointerEvents: 'none'
      }} />

    </AbsoluteFill>
  );
};
