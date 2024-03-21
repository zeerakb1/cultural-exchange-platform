// import { useState, useEffect, useRef } from 'react';
// import { FaPlay, FaPause, FaVolumeUp, FaVolumeDown } from 'react-icons/fa';
// import 'tailwindcss/tailwind.css';

// const AudioPlayer = ({ src }) => {
//     const audioRef = useRef(null);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [volume, setVolume] = useState(1);
//     const [currentTime, setCurrentTime] = useState(0);

//     useEffect(() => {
//         audioRef.current = new Audio(src);
//         const audio = audioRef.current;

//         const updateTime = () => {
//             setCurrentTime(audio.currentTime);
//         };

//         audio.addEventListener('timeupdate', updateTime);

//         return () => {
//             audio.removeEventListener('timeupdate', updateTime);
//         };
//     }, [src]);

//     useEffect(() => {
//         isPlaying ? audioRef.current.play() : audioRef.current.pause();
//     }, [isPlaying]);

//     useEffect(() => {
//         audioRef.current.volume = volume;
//     }, [volume]);

//     const togglePlayPause = () => {
//         setIsPlaying(!isPlaying);
//     };

//     const increaseVolume = () => {
//         setVolume(Math.min(volume + 0.1, 1));
//     };

//     const decreaseVolume = () => {
//         setVolume(Math.max(volume - 0.1, 0));
//     };

//     return (
//         <div className="flex items-center space-x-4">
//             <button onClick={togglePlayPause} className="text-blue-500">
//                 {isPlaying ? <FaPause /> : <FaPlay />}
//             </button>
//             <button onClick={increaseVolume} className="text-blue-500">
//                 <FaVolumeUp />
//             </button>
//             <button onClick={decreaseVolume} className="text-blue-500">
//                 <FaVolumeDown />
//             </button>
//             <div className="w-full bg-tertiary rounded-full h-2.5">
//                 <div className="bg-btn h-2.5 rounded-full" style={{ width: 'Math.floor(currentTime) * 100%' }}>
//                     <span className="text-txt text-sm">{Math.floor(currentTime)} s</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AudioPlayer;



import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';

const AudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  // const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(new Audio(src));
  const { duration } = audioRef.current;
  // const audioRef = useRef(null);

  useEffect(() => {
    // audioRef.current = new Audio(src);
    const audio = audioRef.current;

    const setAudioData = () => {
      // setDuration(audio.duration);
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
    <div className="flex items-center space-x-4 bg-txt p-4 rounded-xl">
      <button onClick={togglePlayPause} className="bg-blue-500 text-white p-2 rounded">
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <input
        type="range"
        value={progress}
        step="1"
        min="0"
        max="100"
        className="w-full h-2 bg-tertiary rounded-lg appearance-none cursor-pointer dark:bg-blue-700"
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
        className="w-15 h-2 bg-tertiary rounded-lg appearance-none cursor-pointer dark:bg-btn"
        onChange={handleVolumeChange}
      />
    </div>
  );
};

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired
};

export default AudioPlayer;
