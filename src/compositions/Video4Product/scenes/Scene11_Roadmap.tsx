import { AbsoluteFill } from 'remotion';
import { DotGrid } from '../components/DotGrid';
import { RoadmapBoard } from '../components/RoadmapBoard';
import { ThoughtCaption } from '../components/ThoughtCaption';
import { COPY } from '../constants/copy';

export const Scene11_Roadmap: React.FC = () => {
  const { header, progress, progressPct, weeks, userThought } = COPY.c11;

  return (
    <AbsoluteFill style={{ backgroundColor: '#F8FAFC' }}>
      <DotGrid opacity={0.1} bgColor="transparent" dotColor="#CBD5E1" />

      {/* Roadmap board centered */}
      <div style={{
        position: 'absolute',
        top: '52%', left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        <RoadmapBoard
          header={header}
          progress={progress}
          progressPct={progressPct}
          weeks={weeks}
          startFrame={0}
        />
      </div>

      {/* Thought above board */}
      <ThoughtCaption
        text={userThought}
        startFrame={100}
        position="top-left"
        color="#64748B"
      />
    </AbsoluteFill>
  );
};
