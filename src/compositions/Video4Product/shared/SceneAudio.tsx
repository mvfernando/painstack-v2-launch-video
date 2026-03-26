import { Audio, staticFile } from 'remotion';

interface SceneAudioProps {
  filename: string;
  volume?: number;
  startFrom?: number;
}

export const SceneAudio: React.FC<SceneAudioProps> = ({
  filename,
  volume = 0.85,
  startFrom = 0,
}) => {
  const src = staticFile(`audio/${filename}.mp3`);
  return <Audio src={src} volume={volume} startFrom={startFrom} />;
};

interface BackgroundMusicProps {
  volume?: number;
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
  volume = 0.07,
}) => {
  const src = staticFile('audio/percussion.wav');
  return <Audio src={src} volume={volume} loop />;
};
