import { useEffect, useState, useRef } from 'react';

/**
 * Allows to play audio files after the first user interaction has happened
 * othwerwise the audio will not be played and an exception will be thrown.
 *   NotAllowedError: The play method is not allowed by the user agent or
 *   the platform in the current context, possibly because the user denied
 *   permission.
 */
const useAudio = (url: string) => {
  const audio = useRef(new Audio(url)).current;
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying((prev) => !prev);
  const play = () => setPlaying(true);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [audio, playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => audio.removeEventListener('ended', () => setPlaying(false));
  }, [audio]);

  return {
    playing,
    toggle,
    play,
  };
};

export default useAudio;
