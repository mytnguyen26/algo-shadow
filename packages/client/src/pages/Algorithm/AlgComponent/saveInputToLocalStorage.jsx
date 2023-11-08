import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'; // Ensure you have this icon imported


export const SaveInputToLocalStorage = ({ algorithm, inputData }) => {
  const storageKey = `${algorithm}_recentInputs`;

  const [inputValue, setInputValue] = useState('');
  const [recentInputs, setRecentInputs] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const saveInput = () => {
    // Retrieve existing inputs or initialize to an empty array
    const existingInputs = JSON.parse(localStorage.getItem(storageKey)) || [];
    // Add new input at the beginning of the array
    existingInputs.unshift(inputData);
    // Slice array to keep only the last 5 inputs
    const updatedInputs = existingInputs.slice(0, 5);
    // Save back to local storage
    localStorage.setItem(storageKey, JSON.stringify(updatedInputs));
    // Update the state
    setRecentInputs(updatedInputs);
  };

  useEffect(() => {
    const loadedInputs = JSON.parse(localStorage.getItem(storageKey)) || [];
    setRecentInputs(loadedInputs);
  }, [storageKey]);

  const handleClickAway = () => {
    setShowHistory(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: 'relative', width: '300px' }}>
        <Button variant="contained" onClick={saveInput} sx={{ mb: 1 }}>
          Save Input
        </Button>
        <TextField
          fullWidth
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setShowHistory(true)}
          placeholder="history..."
        />
        {showHistory && (
          <Paper sx={{ position: 'absolute', width: '100%', maxHeight: '300px', overflow: 'auto', zIndex: 2, mt: 1 }}>
            <List component="nav" aria-label="recent inputs">
              {recentInputs.map((input, index) => (
                <ListItem
                  key={index}
                  onClick={() => {
                    setInputValue(input);
                    setShowHistory(false);
                  }}
                >
                  {input.join(',')}
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default SaveInputToLocalStorage;
