import React, { useState, useEffect } from 'react';
import {
    Box, Button, TextField, Paper, List, ListItem,
    ClickAwayListener, InputAdornment
  } from '@mui/material';


export const SaveInputToLocalStorage = ({ algorithm, inputData, useHisInput }) => {
  const storageKey = `${algorithm}_recentInputs`;

  const [inputValue, setInputValue] = useState('');
  const [recentInputs, setRecentInputs] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedInput, setSelectedInput] = useState('');


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

  const handleListItemClick = (input) => {
    const inputString = input.join(','); // Assuming 'input' is an array of numbers
    setInputValue(inputString);
    setSelectedInput(inputString); // Save the selected input as a string
  };
  
  // Handler when "Use This" is clicked
  const handleUseHisInput = () => {
    if (typeof selectedInput === 'string') {
      useHisInput(selectedInput.split(',').map(Number)); // Convert string to array of numbers
      setShowHistory(false); // Optionally close the history dropdown
    } else {
      // Handle the error or initialize selectedInput as a string to prevent this
      console.error('Selected input is not a string:', selectedInput);
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setShowHistory(false)}>
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
          placeholder="Use saved input..."
          InputProps={{
            endAdornment: (
              selectedInput && (
                <InputAdornment position="end">
                  <Button onClick={handleUseHisInput}>
                    Use This
                  </Button>
                </InputAdornment>
              )
            ),
          }}
        />
        {showHistory && (
          <Paper sx={{ position: 'absolute', width: '100%', maxHeight: '300px', overflow: 'auto', zIndex: 2, mt: 1 }}>
            <List component="nav" aria-label="recent inputs">
              {recentInputs.map((input, index) => (
                <ListItem
                  key={index}
                  onClick={() => handleListItemClick(input)}
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
