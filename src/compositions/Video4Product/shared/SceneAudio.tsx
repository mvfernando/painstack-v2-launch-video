import { Audio, staticFile, useCurrentFrame, Sequence } from 'remotion';

interface BackgroundMusicProps {
  volume?: number;
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
  volume = 0.10,
}) => {
  const frame = useCurrentFrame();
  
  // Audio Ducking Logic
  // Define intervals where someone is speaking (based on new durations)
  // For V4.2, nearly the entire video is dialogue. 
  // We duck whenever isSpeaking is true (calculated in PainstackVideo)
  // or we can use a simpler heuristic here if we don't pass props.
  const speakingIntervals = [
    [20, 5800], // Generic ducking for the whole video
  ];

  // For a generic "lower when speaking" logic:
  // If frame is in any interval, lower volume.
  const isSpeaking = speakingIntervals.some(([start, end]) => frame >= start && frame <= end);
  const targetVolume = isSpeaking ? volume * 0.4 : volume; // drop to 40% when speaking

  const src = staticFile('audio/v1_music.wav');
  return <Audio src={src} volume={targetVolume} loop />;
};

interface SceneAudioProps {
  filename: string;
  startFrom?: number;
}

export const SceneAudio: React.FC<SceneAudioProps> = ({
  filename,
  startFrom = 0,
}) => {
  const src = staticFile(`audio/${filename}.mp3`);
  
  // startFrom here is used as a DELAY in the sequence
  if (startFrom > 0) {
    return (
      <Sequence from={startFrom}>
        <Audio src={src} />
      </Sequence>
    );
  }

  return <Audio src={src} />;
};
