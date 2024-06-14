// import { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
// import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';

// const SpeechPlayer = ({ text }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [volume, setVolume] = useState(100);
//   const speechRef = useRef(new SpeechSynthesisUtterance());


//   useEffect(() => {
//     speechRef.current.text = text;
//     speechRef.current.volume = volume / 100; 

//     const handleSpeechStart = () => setIsPlaying(true);
//     const handleSpeechEnd = () => setIsPlaying(false);

//     speechRef.current.onstart = handleSpeechStart;
//     speechRef.current.onend = handleSpeechEnd;

//     return () => {
//       speechSynthesis.cancel();
//     };
//   }, [text]);


//   useEffect(() => {
//     speechRef.current.volume = volume / 100;
//   }, [volume]);

//   const togglePlayPause = () => {
//     if (isPlaying) {
//       speechSynthesis.cancel();
//     } else {
//       speechSynthesis.speak(speechRef.current);
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const handleVolumeChange = (e) => {
//     const newVolume = e.target.value;
//     setVolume(newVolume);
//   };

//   return (
//     <div className="flex items-center space-x-4 bg-txt p-4 rounded-xl">
//       <button onClick={togglePlayPause} className="bg-blue-500 text-white p-2 rounded">
//         {isPlaying ? <FaPause /> : <FaPlay />}
//       </button>
//       <FaVolumeUp className="text-lg text-blue-500" />
//       <input
//         type="range"
//         value={volume}
//         step="1"
//         min="0"
//         max="100"
//         className="w-15 h-2 bg-tertiary rounded-lg appearance-none cursor-pointer dark:bg-btn"
//         // className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//         onChange={handleVolumeChange}
//       />
//     </div>
//   );
// };

// SpeechPlayer.propTypes = {
//   text: PropTypes.string.isRequired
// };

// export default SpeechPlayer;



import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';

const SpeechPlayer = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [progress, setProgress] = useState(0);
  const speechRef = useRef(new SpeechSynthesisUtterance());
  const startTimeRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    speechRef.current.text = text;
    speechRef.current.volume = volume / 100; 

    const handleSpeechStart = () => {
      setIsPlaying(true);
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(updateProgress, 100); 
    };

    const handleSpeechEnd = () => {
      setIsPlaying(false);
      clearInterval(timerRef.current);
      setProgress(0);
    };

    speechRef.current.onstart = handleSpeechStart;
    speechRef.current.onend = handleSpeechEnd;

    return () => {
      speechSynthesis.cancel();
      clearInterval(timerRef.current);
    };
  }, [text, volume]);

  useEffect(() => {
    speechRef.current.volume = volume / 100;
  }, [volume]);

  const togglePlayPause = () => {
    if (isPlaying) {
      speechSynthesis.cancel();
    } else {
      speechSynthesis.speak(speechRef.current);
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
  };

  const updateProgress = () => {
    if (!speechRef.current || !startTimeRef.current) return;
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTimeRef.current;

    const estimatedLength = text.length * 50; 
    const progressValue = Math.min(100, (elapsedTime / estimatedLength) * 100);
    setProgress(progressValue);
  };

  return (
    <div className="flex items-center space-x-4 bg-txt p-4 rounded-xl">
      <button onClick={togglePlayPause} className="bg-txt text-white p-2 rounded">
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
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
      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

SpeechPlayer.propTypes = {
  text: PropTypes.string.isRequired
};

export default SpeechPlayer;
