// src/components/ControlArea.jsx

import { useState } from "react";

export const ControlArea = () => {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="control-area">
      <button className={isRunning ? 'pause' : 'start'} onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button className="reset">Reset</button>
      <input type="range" min="0.5" max="2" step="0.1" defaultValue="1" />
    </div>
  );
};
