// Clock.js

import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './clock.css';

const Clock = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            if (timerLabel === 'Session') {
              setTimerLabel('Break');
              setTimeLeft(breakLength * 60);
            } else {
              setTimerLabel('Session');
              setTimeLeft(sessionLength * 60);
            }
            audioRef.current.play();
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isRunning, timerLabel, breakLength, sessionLength]);

  const handleBreakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength((prevLength) => prevLength - 1);
    }
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength((prevLength) => prevLength + 1);
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength((prevLength) => prevLength - 1);
      if (!isRunning) {
        setTimeLeft((prevTime) => prevTime - 1); 
      }
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength((prevLength) => prevLength + 1);
      if (!isRunning) {
        setTimeLeft((prevTime) => prevTime + 1); 
      }
    }
  };

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimerLabel('Session');
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="pomodoro-clock">
      <div className="labels">
        <div id="break-label" className="label">
          Break Length
        </div>
        <div id="session-label" className="label">
          Session Length
        </div>
      </div>
      <div className="length-controls">
        <button id="break-decrement" className="btn btn-light" onClick={handleBreakDecrement}>
          -
        </button>
        <div id="break-length" className="length">
          {breakLength}
        </div>
        <button id="break-increment" className="btn btn-light" onClick={handleBreakIncrement}>
          +
        </button>
        <button id="session-decrement" className="btn btn-light" onClick={handleSessionDecrement}>
          -
        </button>
        <div id="session-length" className="length">
          {sessionLength}
        </div>
        <button id="session-increment" className="btn btn-light" onClick={handleSessionIncrement}>
          +
        </button>
      </div>
      <div id="timer-label" className="timer-label">
        {timerLabel}
      </div>
      <div id="time-left" className="time-left">
        {formatTime(timeLeft)}
      </div>
      <div className="controls">
        <button id="start_stop" className="btn btn-success" onClick={handleStartStop}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button id="reset" className="btn btn-danger" onClick={handleReset}>
          Reset
        </button>
      </div>
      <audio id="beep" ref={audioRef} src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
  );
};

export default Clock;
