import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';

const AudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
    const audio = audioRef.current;

    const setAudioData = () => {
      setDuration(audio.duration);
      setVolume(audio.volume);
    };

    const setAudioTime = () => setProgress((audio.currentTime / duration) * 100);

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, [src]);

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value / 100);
  };

  return (
    <div className="flex items-center space-x-4">
      <button onClick={togglePlayPause} className="bg-blue-500 text-white p-2 rounded">
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <input
        type="range"
        value={progress}
        step="1"
        min="0"
        max="100"
        className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-blue-700"
        onChange={(e) => audioRef.current.currentTime = (duration / 100) * e.target.value}
        disabled={duration === 0}
      />
      <FaVolumeUp className="text-lg text-blue-500" />
      <input
        type="range"
        value={volume * 100}
        step="1"
        min="0"
        max="100"
        className="w-20 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-blue-700"
        // className= "w-20 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-blue-700"
        onChange={handleVolumeChange}
      />
    </div>
  );
};

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired
};

export default AudioPlayer;
