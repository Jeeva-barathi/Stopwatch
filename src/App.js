import './App.css';
// Import necessary React hooks
import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(0);// State to track the elapsed time (in milliseconds)
  const [running, setRunning] = useState(false); // State to track whether the stopwatch is running or paused

  useEffect(() => { // useEffect handles the interval logic for updating time
    let interval;
    // If stopwatch is running, start updating time every 10ms
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10)
      }, 10);
       // If not running, clear the interval
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);  // Cleanup interval when component unmounts or running state changes
  }, [running]);// Re-run effect when `running` changes
  return (
    <div className='container'>
      <h1>StopWatch</h1>
      <div className='time-display'>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div className='button-group'>
        {running ? (
          <button onClick={() => { setRunning(false) }}>Stop</button>
        ) : (
          <button onClick={() => { setRunning(true) }}>Start</button>)
        }
        <button onClick={() => { setTime(0) }}>Reset</button>
      </div>
    </div>
  );
}

export default App;
