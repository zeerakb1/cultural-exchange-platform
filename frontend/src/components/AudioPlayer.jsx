// // import { useState, useEffect, useRef } from 'react';
// // import PropTypes from 'prop-types';
// // import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';

// // const AudioPlayer = ({ src }) => {
// //   const [isPlaying, setIsPlaying] = useState(false);
// //   // const [duration, setDuration] = useState(0);
// //   const [progress, setProgress] = useState(0);
// //   const [volume, setVolume] = useState(1);
// //   const audioRef = useRef(new Audio(src));
// //   const { duration } = audioRef.current;
// //   // const audioRef = useRef(null);

// //   useEffect(() => {
// //     // audioRef.current = new Audio(src);
// //     const audio = audioRef.current;

// //     const setAudioData = () => {
// //       // setDuration(audio.duration);
// //       setVolume(audio.volume);
// //     };

// //     const setAudioTime = () => setProgress((audio.currentTime / duration) * 100);

// //     audio.addEventListener('loadedmetadata', setAudioData);
// //     audio.addEventListener('timeupdate', setAudioTime);

// //     return () => {
// //       audio.removeEventListener('loadedmetadata', setAudioData);
// //       audio.removeEventListener('timeupdate', setAudioTime);
// //     };
// //   }, [src]);

// //   useEffect(() => {
// //     isPlaying ? audioRef.current.play() : audioRef.current.pause();
// //   }, [isPlaying]);

// //   useEffect(() => {
// //     audioRef.current.volume = volume;
// //   }, [volume]);

// //   const togglePlayPause = () => {
// //     setIsPlaying(!isPlaying);
// //   };

// //   const handleVolumeChange = (e) => {
// //     setVolume(e.target.value / 100);
// //   };

// //   return (
// //     <div className="flex items-center space-x-4 bg-txt p-4 rounded-xl">
// //       <button onClick={togglePlayPause} className="bg-blue-500 text-white p-2 rounded">
// //         {isPlaying ? <FaPause /> : <FaPlay />}
// //       </button>
// //       <input
// //         type="range"
// //         value={progress}
// //         step="1"
// //         min="0"
// //         max="100"
// //         className="w-full h-2 bg-tertiary rounded-lg appearance-none cursor-pointer dark:bg-blue-700"
// //         onChange={(e) => audioRef.current.currentTime = (duration / 100) * e.target.value}
// //         disabled={duration === 0}
// //       />
// //       <FaVolumeUp className="text-lg text-blue-500" />
// //       <input
// //         type="range"
// //         value={volume * 100}
// //         step="1"
// //         min="0"
// //         max="100"
// //         className="w-15 h-2 bg-tertiary rounded-lg appearance-none cursor-pointer dark:bg-btn"
// //         onChange={handleVolumeChange}
// //       />
// //     </div>
// //   );
// // };

// // AudioPlayer.propTypes = {
// //   src: PropTypes.string.isRequired
// // };

// // export default AudioPlayer;

// import { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
// import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';

// const AudioPlayer = ({ src }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [volume, setVolume] = useState(1);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     if (!audioRef.current) {
//       audioRef.current = new Audio(src);
//     } else {
//       audioRef.current.src = src;
//     }

//     const audio = audioRef.current;
//     const setAudioData = () => setVolume(audio.volume);
//     const setAudioTime = () => setProgress((audio.currentTime / audio.duration) * 100);

//     audio.addEventListener('loadedmetadata', setAudioData);
//     audio.addEventListener('timeupdate', setAudioTime);

//     return () => {
//       audio.removeEventListener('loadedmetadata', setAudioData);
//       audio.removeEventListener('timeupdate', setAudioTime);
//     };
//   }, [src]);

//   useEffect(() => {
//     isPlaying ? audioRef.current.play() : audioRef.current.pause();
//   }, [isPlaying]);

//   useEffect(() => {
//     audioRef.current.volume = volume;
//   }, [volume]);

//   const togglePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const handleVolumeChange = (e) => {
//     setVolume(e.target.value / 100);
//   };

//   return (
//     <div className="flex items-center space-x-4 bg-txt p-4 rounded-xl">
//       <button onClick={togglePlayPause} className="bg-blue-500 text-white p-2 rounded">
//         {isPlaying ? <FaPause /> : <FaPlay />}
//       </button>
//       <input
//         type="range"
//         value={progress}
//         step="1"
//         min="0"
//         max="100"
//         className="w-full h-2 bg-tertiary rounded-lg appearance-none cursor-pointer dark:bg-blue-700"
//         onChange={(e) => audioRef.current.currentTime = (audioRef.current.duration / 100) * e.target.value}
//         disabled={!audioRef.current.duration}
//       />
//       <FaVolumeUp className="text-lg text-blue-500" />
//       <input
//         type="range"
//         value={volume * 100}
//         step="1"
//         min="0"
//         max="100"
//         className="w-15 h-2 bg-tertiary rounded-lg appearance-none cursor-pointer dark:bg-btn"
//         onChange={handleVolumeChange}
//       />
//     </div>
//   );
// };

// AudioPlayer.propTypes = {
//   src: PropTypes.string.isRequired
// };

// export default AudioPlayer;

import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';

const AudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100); // Set initial volume as a percentage
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize audio object and attach event listeners
    const audio = new Audio(src);
    audioRef.current = audio;
    audio.volume = volume / 100; // Convert volume to scale used by audio element (0 to 1)

    const setAudioData = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const setAudioTime = () => setProgress((audio.currentTime / audio.duration) * 100);

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    // Play and pause handling
    if (isPlaying) {
      audio.play().catch(error => console.log('Error playing audio:', error));
    }

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.pause();
    };
  }, [src, isPlaying, volume]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e) => {
    const newProgress = e.target.value;
    audioRef.current.currentTime = (audioRef.current.duration / 100) * newProgress;
    setProgress(newProgress);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume / 100;
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
        onChange={handleProgressChange}
      />
      <FaVolumeUp className="text-lg text-blue-500" />
      <input
        type="range"
        value={volume}
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
