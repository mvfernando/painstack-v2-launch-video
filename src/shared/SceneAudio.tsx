import React from 'react';
import { Audio, staticFile } from 'remotion';

// Wrapper para áudio ElevenLabs — usa staticFile() para servir de public/audio/
// O volume pode ser ajustado por cena se necessário

interface SceneAudioProps {
  filename: string;       // ex: "v1_s1_hook" — sem extensão
  startFrom?: number;     // offset em frames dentro do clip (default 0)
  volume?: number;        // 0–1 (default 1)
  endAt?: number;         // corta o áudio neste frame
}

export const SceneAudio: React.FC<SceneAudioProps> = ({
  filename,
  startFrom = 0,
  volume = 1,
  endAt,
}) => {
  return (
    <Audio
      src={staticFile(`audio/${filename}.mp3`)}
      startFrom={startFrom}
      endAt={endAt}
      volume={volume}
    />
  );
};

// Música de fundo ambient (opcional)
// Coloca um ficheiro public/audio/bg_ambient.mp3 para ativar
interface BackgroundMusicProps {
  volume?: number;
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ volume = 0.05 }) => {
  return (
    <Audio
      src={staticFile('audio/percussion.wav')}
      volume={volume}
      loop
    />
  );
};
