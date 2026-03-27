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
    
    // Human-like typing (thinks, speaks, types)
    let delay = 1.0; 
    
    if (char === '.' || char === '?' || char === '!') {
      delay = 30; // Pauses 1 sec at punctuation
    } else if (char === ',') {
      delay = 10;
    }
    
    frameTicker += delay;
    charIndex++;
  }

  // Blinking cursor logic
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
