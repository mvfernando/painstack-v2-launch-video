import { useCurrentFrame } from 'remotion';

interface TypewriterTextV2Props {
  text: string;
  startFrame: number;
  pauseAfterPunctuation?: number; // frames to pause after . , ? !
}

export const TypewriterTextV2: React.FC<TypewriterTextV2Props> = ({
  text,
  startFrame,
  pauseAfterPunctuation = 15,
}) => {
  // The original line `const { typewriter, startFrame, pauseAfterPunctuation = 15 } = props;` was incorrect
  // as `props` was not defined and it was trying to destructure props that were already destructured from the component arguments.
  // The instruction to "Remove unused fps" is not applicable as 'fps' is not present in this component.
  // The instruction to "Add dark prop to captions" refers to components (UserCaption, ProductCaption) not present in this file.
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
    
    // Default 1 frame per char (fast Typing)
    let delay = 1.5; // slow down slightly for human feel
    
    if (char === '.' || char === '?' || char === '!') {
      delay = pauseAfterPunctuation;
    } else if (char === ',') {
      delay = Math.floor(pauseAfterPunctuation / 2);
    }
    
    frameTicker += delay;
    charIndex++;
  }

  return <span>{currentText}</span>;
};
