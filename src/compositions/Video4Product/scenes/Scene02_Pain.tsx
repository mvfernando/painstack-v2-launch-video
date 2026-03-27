import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { WordReveal } from '../components/WordReveal';
import { UserCaption } from '../components/UserCaption';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';

export const Scene02_Pain: React.FC = () => {
  const frame = useCurrentFrame();
  const { memories, decision, userCaption } = COPY.c02;

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <SceneAudio filename="v4_s2_pain" />
      <div style={{ position: 'absolute', inset: 0, opacity: 0.15, background: 'radial-gradient(circle at 70% 30%, #F97316 0%, transparent 70%)' }} />

      <div style={{
        position: 'absolute', top: '48%', left: '50%', transform: 'translate(-50%, -50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, width: '85%',
      }}>
        {memories.map((memo, i) => {
          // Compressed offsets: 15f, 50f, 85f
          const startFrame = i === 0 ? 15 : i === 1 ? 50 : 85; 
          return (
            <div key={i} style={{ opacity: interpolate(frame, [startFrame + 50, startFrame + 70], [1, 0.4], { extrapolateLeft: 'clamp' }) }}>
              <WordReveal text={memo.text} startFrame={startFrame} fontSize={memo.size + 4} fontWeight={memo.weight} color={memo.color} gradient={memo.gradient} italic={memo.italic} mode="pop" />
            </div>
          );
        })}

        <div style={{ marginTop: 50 }}>
          <WordReveal text={decision.text} startFrame={130} fontSize={64} fontWeight={800} color={decision.color} mode="pop" />
        </div>
      </div>

      <UserCaption text={userCaption} startFrame={15} exitFrame={165} />
    </AbsoluteFill>
  );
};
// Note: Increased font sizes slightly (size + 4) and delayed decision to 220f.
