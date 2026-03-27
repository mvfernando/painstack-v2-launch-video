import { useCurrentFrame } from 'remotion';
import React from 'react';

interface TypewriterTextV2Props {
  text: string;
  startFrame: number;
  pauseAfterPunctuation?: number; // frames to pause after . , ? !
  cursorColor?: string;
}

export const TypewriterTextV2: React.FC<TypewriterTextV2Props> = ({
  text,
  startFrame,
  pauseAfterPunctuation = 15,
  cursorColor = '#3B82F6',
}) => {
  const frame = useCurrentFrame();
  
  const currentFrame = frame - startFrame;
  if (currentFrame < 0) return null;

  let currentText = "";
  let frameTicker = 0;
  let charIndex = 0;

  // Manual loop to calculate displayed text based on variable delays
  while (charIndex < text.length && frameTicker <= currentFrame) {
    const char = text[charIndex];
    currentText += char;
    
    // Default frames per char (fast Typing)
    let delay = 1.2; // slow down slightly for human feel
    
    if (char === '.' || char === '?' || char === '!') {
      delay = pauseAfterPunctuation;
    } else if (char === ',') {
      delay = Math.floor(pauseAfterPunctuation / 2);
    }
    
    frameTicker += delay;
    charIndex++;
  }

  // Blinking cursor logic
  const cursorOpacity = Math.floor(frame / 6) % 2 === 0 ? 1 : 0;
  const isFinished = charIndex >= text.length;

  return (
    <span>
      {currentText}
      {(!isFinished || frame % 60 < 30) && (
        <span style={{ 
          display: 'inline-block', 
          width: 3, 
          height: '1.2em', 
          backgroundColor: cursorColor, 
          marginLeft: 2,
          verticalAlign: 'middle',
          opacity: isFinished ? (frame % 30 < 15 ? 1 : 0) : 1
        }} />
      )}
    </span>
  );
};
