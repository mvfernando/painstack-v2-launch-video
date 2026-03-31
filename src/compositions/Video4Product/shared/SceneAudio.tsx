import { Audio, staticFile, Sequence } from 'remotion';

interface BackgroundMusicProps {
  volume?: number;
}

export const BackgroundMusic = ({
  volume = 0.10,
}: BackgroundMusicProps) => {
  const src = staticFile('audio/v1_music.wav');
  return <Audio src={src} volume={volume} loop />;
};

interface SceneAudioProps {
  filename: string;
  startFrom?: number;
}

export const SceneAudio = ({
  filename,
  startFrom = 0,
}: SceneAudioProps) => {
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
