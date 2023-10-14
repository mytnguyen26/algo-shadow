import { useState } from 'react';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';

export const ControlArea = () => {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div sx={{ display: 'flex', alignItems: 'center' }}>
      <Button
        onClick={() => setIsRunning(!isRunning)}
        variant="contained"
        sx={{
          padding: '10px 20px',
          marginRight: '20px',
          fontSize: '16px',
          backgroundColor: isRunning ? 'orange' : 'blue',
          color: 'white',
          '&:hover': {
            backgroundColor: isRunning ? 'darkorange' : 'darkblue',
          }
        }}
      >
        {isRunning ? "Pause" : "Start"}
      </Button>

      <Button
        variant="contained"
        sx={{
          padding: '10px 20px',
          marginRight: '20px',
          fontSize: '16px',
          backgroundColor: 'red',
          color: 'white',
          '&:hover': {
            backgroundColor: 'darkred',
          }
        }}
      >
        Reset
      </Button>

      <Slider 
        defaultValue={1}
        step={0.1}
        marks
        min={0.5}
        max={2}
        valueLabelDisplay="auto"
        sx={{ width: '100px' }}
      />
    </div>
  );
};
