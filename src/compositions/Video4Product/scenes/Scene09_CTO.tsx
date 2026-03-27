import { AbsoluteFill, useCurrentFrame, Img, staticFile } from 'remotion';
import React from 'react';
import { AgentCard } from '../components/AgentCard';
import { BrowserMockup } from '../components/BrowserMockup';
import { UserCaption } from '../components/UserCaption';
import { FeatureLabel } from '../components/FeatureLabel';
import { SceneAudio } from '../shared/SceneAudio';
import { COPY } from '../constants/copy';

export const Scene09_CTO: React.FC = () => {
  const frame = useCurrentFrame();
  const { cto, userCaption } = COPY.c09;

  const images = [
    'images/tools/media__1774625675290.png', // Assuming lovable is this one
    'images/tools/media__1774625675273.png',
    'images/tools/media__1774625675332.png',
    'images/tools/media__1774625675350.png',
    'images/tools/media__1774625675353.png'
  ];
  
  // Fast carousel: 20 frames per image (approx 0.6 seconds at 30 fps)
  const imageIndex = Math.floor(frame / 20) % images.length;
  const currentImage = images[imageIndex];

  // Cycing URLs to match mockup feeling
  const urls = ['lovable.dev', 'bolt.new', 'sunbird.ai', 'v0.dev', 'cursor.sh'];
  const currentUrl = urls[imageIndex];

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 15% 85%, rgba(56,189,248,0.1), transparent 60%)' }} />
      <SceneAudio filename="v4_s9_cto" />
      <FeatureLabel text="Technical Infrastructure" startFrame={0} position="top-left" />

      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        display: 'flex', gap: 40, width: '100%', justifyContent: 'center', alignItems: 'center'
      }}>
        <AgentCard agentLabel={cto.label} accentColor={cto.accentColor} lines={cto.lines} startFrame={0} style={{ flex: 1 }} />
        
        <div style={{ flex: 1.2 }}>
          <BrowserMockup url={currentUrl} startFrame={30} width={720} height={460}>
            {/* Carousel Container */}
            <div style={{ 
              width: '100%', height: '100%', 
              backgroundColor: '#0F172A', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <Img 
                src={staticFile(currentImage)} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain' // Ensures the image fits fully inside without cropping
                }} 
              />
            </div>
          </BrowserMockup>
        </div>
      </div>

      <UserCaption text={userCaption} startFrame={120} />
    </AbsoluteFill>
  );
};
