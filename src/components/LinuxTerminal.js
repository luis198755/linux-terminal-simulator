import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Volume2, VolumeX } from 'lucide-react';

const LinuxTerminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [currentSoundEffect, setCurrentSoundEffect] = useState(1);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const audioRef = useRef(null);

  const soundEffects = [
    '/keyboard-sound-1.mp3',
    '/keyboard-sound-2.mp3',
    '/keyboard-sound-3.mp3',
    '/keyboard-sound-4.mp3'
  ];

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    // Preload audio
    audioRef.current = new Audio(soundEffects[currentSoundEffect - 1]);
    audioRef.current.preload = 'auto';
  }, [currentSoundEffect]);

  const playKeySound = () => {
    if (isSoundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Error playing audio:", e));
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    playKeySound();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand();
    } else {
      playKeySound();
    }
  };

  const handleCommand = () => {
    if (input.trim() === '') return;

    const newOutput = [...output, { type: 'input', text: input }];
    setOutput(newOutput);

    // Simulate command processing
    setTimeout(() => {
      const response = processCommand(input.trim());
      setOutput(prev => [...prev, { type: 'output', text: response }]);
      setInput('');
    }, 100);
  };

  const processCommand = (command) => {
    const parts = command.toLowerCase().split(' ');
    const mainCommand = parts[0];

    switch (mainCommand) {
      case 'help':
        return `Available commands:
  help - Show this help message
  date - Display current date and time
  date +FORMAT - Display date in specified format
  clear - Clear the terminal
  echo [text] - Display a line of text
  fortune - Display a random quote or piece of wisdom
  sound - Toggle keyboard sound effects
  soundeffect [1-4] - Switch between different keyboard sound effects`;
      case 'date':
        if (parts.length === 1) {
          return new Date().toString();
        } else if (parts[1].startsWith('+')) {
          return formatDate(parts[1].slice(1));
        } else {
          return "Invalid date format. Use 'date +FORMAT'.";
        }
      case 'clear':
        setOutput([]);
        return '';
      case 'echo':
        return parts.slice(1).join(' ');
      case 'fortune':
        return getFortune();
      case 'sound':
        setIsSoundEnabled(!isSoundEnabled);
        return `Sound effects ${isSoundEnabled ? 'disabled' : 'enabled'}.`;
      case 'soundeffect':
        if (parts.length === 2 && ['1', '2', '3', '4'].includes(parts[1])) {
          const newEffect = parseInt(parts[1]);
          setCurrentSoundEffect(newEffect);
          return `Switched to sound effect ${newEffect}.`;
        } else {
          return "Invalid syntax. Use 'soundeffect [1-3]'.";
        }
      default:
        return `Command not found: ${command}`;
    }
  };

  const formatDate = (format) => {
    const now = new Date();
    const formatMap = {
      '%Y': now.getFullYear(),
      '%m': (now.getMonth() + 1).toString().padStart(2, '0'),
      '%d': now.getDate().toString().padStart(2, '0'),
      '%H': now.getHours().toString().padStart(2, '0'),
      '%M': now.getMinutes().toString().padStart(2, '0'),
      '%S': now.getSeconds().toString().padStart(2, '0'),
      '%a': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][now.getDay()],
      '%b': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][now.getMonth()],
    };

    return format.replace(/%[YmdHMSab]/g, match => formatMap[match]);
  };

  const getFortune = () => {
    const fortunes = [
      "The best way to predict the future is to create it. - Peter Drucker",
      "Stay hungry, stay foolish. - Steve Jobs",
      "The only way to do great work is to love what you do. - Steve Jobs",
      "Innovation distinguishes between a leader and a follower. - Steve Jobs",
      "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
      "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
      "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
      "Life is what happens to you while you're busy making other plans. - John Lennon",
      "In the end, it's not the years in your life that count. It's the life in your years. - Abraham Lincoln",
      "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt"
    ];
    return fortunes[Math.floor(Math.random() * fortunes.length)];
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="max-w-2xl mx-auto my-8 bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <div className="flex items-center">
          <Terminal className="w-5 h-5 text-gray-400 mr-2" />
          <h2 className="text-gray-300 font-semibold">Terminal</h2>
        </div>
        <button 
          onClick={() => setIsSoundEnabled(!isSoundEnabled)} 
          className="text-gray-300 hover:text-white focus:outline-none"
        >
          {isSoundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>
      <div 
        ref={terminalRef}
        className="h-96 overflow-y-auto p-4 font-mono text-sm text-gray-300"
      >
        {output.map((item, index) => (
          <div key={index} className={item.type === 'input' ? 'text-green-400' : 'text-gray-300'}>
            {item.type === 'input' ? '$ ' : ''}
            {item.text}
          </div>
        ))}
        <div className="mt-2 flex">
          <span className="text-green-400 mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-transparent outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default LinuxTerminal;