import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../constants/colors';

interface FlowNode {
  icon?: string;
  label: string;
  color: string;
}

interface FlowDiagramProps {
  nodes: FlowNode[];
  startFrame?: number;
}

export const FlowDiagram: React.FC<FlowDiagramProps> = ({
  nodes,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Zoom out: scale 1.8→1.0
  const zoomSpring = spring({
    frame: frame - startFrame,
    fps,
    config: { stiffness: 50, damping: 14, mass: 1.2 },
  });
  const zoomScale = interpolate(zoomSpring, [0, 1], [1.8, 1.0]);

  return (
    <div style={{
      transform: `scale(${zoomScale})`,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'Inter, sans-serif',
      position: 'relative',
    }}>
      {nodes.map((node, i) => {
        const nodeStart = startFrame + i * 10;
        const nodeSpring = spring({
          frame: frame - nodeStart,
          fps,
          config: { stiffness: 80, damping: 12, mass: 1 },
        });
        const nodeOpacity = interpolate(nodeSpring, [0, 0.15], [0, 1]);
        const nodeScale = interpolate(nodeSpring, [0, 1], [0.8, 1.0]);

        // Last node glow pulse
        const isLast = i === nodes.length - 1;
        const pulseScale = isLast
          ? interpolate(
              frame,
              [nodeStart + 20, nodeStart + 35, nodeStart + 50],
              [1.0, 1.08, 1.0],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
            )
          : 1;

        // Line connecting to next node
        const hasLine = i < nodes.length - 1;
        const lineStart = nodeStart + 5;
        const lineFill = hasLine
          ? interpolate(frame, [lineStart, lineStart + 12], [0, 1], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            })
          : 0;

        return (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Node */}
            <div style={{
              opacity: nodeOpacity,
              transform: `scale(${nodeScale * pulseScale})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: colors.bgSurface,
              border: `1px solid ${node.color}40`,
              borderRadius: 12,
              padding: '16px 32px',
              boxShadow: isLast
                ? `0 0 30px ${node.color}30`
                : `0 8px 20px rgba(0,0,0,0.3)`,
              minWidth: 320,
            }}>
              <span style={{
                fontSize: 14, fontWeight: 500,
                color: colors.textWhite,
              }}>
                {node.label}
              </span>
            </div>

            {/* Connecting line */}
            {hasLine && (
              <div style={{
                width: 2,
                height: 30,
                background: `linear-gradient(180deg, ${node.color}, ${nodes[i + 1].color})`,
                opacity: lineFill,
                margin: '8px 0',
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
};
