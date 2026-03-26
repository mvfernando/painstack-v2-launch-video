import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { colors } from '../constants/colors';

interface DataroomStackProps {
  topLabel: string;
  topPreview: string;
  topBadge: string;
  stackLabels: string[];
  footer: string;
  accentColor?: string;
  startFrame?: number;
}

const DataroomItem: React.FC<{
  textLabel: string;
  color?: string;
  textColor?: string;
  startFrame?: number;
}> = ({
  textLabel,
  color,
  textColor,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #F1F5F9',
      opacity: interpolate(frame - startFrame, [0, 10], [0, 1], { extrapolateLeft: 'clamp' }),
      backgroundColor: 'white'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ 
          width: 32, height: 32, borderRadius: 8, 
          backgroundColor: color || '#F1F5F9', 
          display: 'flex', alignItems: 'center', justifyContent: 'center' 
        }}>
           <div style={{ width: 16, height: 2, backgroundColor: '#CBD5E1' }} />
        </div>
        <span style={{ fontSize: 16, fontWeight: 500, color: textColor || '#1E293B' }}>{textLabel}</span>
      </div>
      <div style={{ 
        fontSize: 10, fontWeight: 700, color: '#94A3B8', 
        backgroundColor: '#F8FAFC', padding: '4px 8px', borderRadius: 4, 
        border: '1px solid #E2E8F0' 
      }}>GEN</div>
    </div>
  );
}

export const DataroomStack: React.FC<DataroomStackProps> = ({
  topLabel,
  topPreview,
  topBadge,
  stackLabels,
  footer,
  accentColor = '#818CF8',
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: { stiffness: 60, damping: 15 },
  });

  const listItems = [
    "Problem Statement",
    "GTM Overview",
    "Market Analysis",
    "SWOT Analysis",
    "Financial Projections",
    "Pitch Deck Outline",
  ];

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 1100,
      height: 600,
      fontFamily: 'Inter, sans-serif',
      opacity: interpolate(entrance, [0, 1], [0, 1]),
    }}>
      <div style={{ position: 'relative', width: 800, height: 500 }}>
         
         {/* Background List (Fully Visible as soon as the scene opens) */}
         <div style={{
           position: 'absolute',
           top: 60,
           right: 0,
           width: 500,
           backgroundColor: '#FFFFFF',
           borderRadius: 20,
           boxShadow: '0 4px 32px rgba(0,0,0,0.06)',
           border: '1px solid #E2E8F0',
           overflow: 'hidden',
           zIndex: 1,
           transform: `scale(${interpolate(entrance, [0, 1], [0.98, 1])}) translateX(40px)`,
         }}>
           <div style={{ 
             padding: '16px 24px', 
             fontSize: 11, 
             fontWeight: 700, 
             color: '#94A3B8', 
             borderBottom: '1px solid #F1F5F9', 
             letterSpacing: '0.1em',
             backgroundColor: '#F8FAFC'
           }}>FULL DOCUMENT LIST</div>
           {listItems.map((item, i) => (
             <DataroomItem key={i} textLabel={item} startFrame={0} />
           ))}
         </div>

         {/* Executive Summary Hero Card (In Front) */}
         <div style={{
           position: 'absolute',
           top: 0,
           left: 0,
           width: 480,
           height: 380,
           backgroundColor: '#FFFFFF',
           borderRadius: 28,
           padding: '40px',
           display: 'flex',
           flexDirection: 'column',
           boxShadow: '0 40px 100px rgba(0,0,0,0.1)',
           zIndex: 10,
           border: '1px solid #E1E7EF',
           transform: `scale(${interpolate(entrance, [0, 1], [0.95, 1])}) translateY(-20px)`,
         }}>
           <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 24 }}>
             <div style={{ 
               width: 56, height: 56, borderRadius: 14, 
               backgroundColor: '#EBF3FF', color: '#3B82F6',
               display: 'flex', alignItems: 'center', justifyContent: 'center',
               fontSize: 22, fontWeight: 700
             }}>ES</div>
             <div>
               <div style={{ fontSize: 24, fontWeight: 700, color: '#0F172A' }}>{topLabel}</div>
               <div style={{ fontSize: 14, color: '#64748B' }}>{topBadge}</div>
             </div>
           </div>
           
           <div style={{ width: '100%', height: 1, backgroundColor: '#F1F5F9', marginBottom: 24 }} />

           <div style={{ 
             fontSize: 17, color: '#334155', lineHeight: 1.6, 
             fontWeight: 400, marginBottom: 'auto' 
           }}>
             {topPreview}
           </div>

           <div style={{ 
             marginTop: 24,
             display: 'inline-flex', alignItems: 'center', gap: 8,
             backgroundColor: '#F3F4F6', color: '#4B5563',
             padding: '8px 16px', borderRadius: 99, fontSize: 12, fontWeight: 600,
             border: '1px solid #E5E7EB'
           }}>
              AI Generated · English
           </div>
         </div>
      </div>
    </div>
  );
};
