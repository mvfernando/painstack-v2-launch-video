import { Audio, staticFile } from 'remotion';

interface SceneAudioProps {
  id: string; // e.g., 'v3_s1_open'
  volume?: number;
  startFrom?: number;
}

export const SceneAudio: React.FC<SceneAudioProps> = ({
  id,
  volume = 1,
  startFrom = 0,
}) => {
  return (
    <Audio
      src={staticFile(`audio/${id}.mp3`)}
      volume={volume}
      startFrom={startFrom}
    />
  );
};
