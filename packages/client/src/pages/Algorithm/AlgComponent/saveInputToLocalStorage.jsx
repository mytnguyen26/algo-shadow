import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Paper,
  List,
  ListItem,
  ClickAwayListener,
  InputAdornment,
} from "@mui/material";

export const SaveInputToLocalStorage = ({
  algorithm,
  inputData,
  useHisInput,
}) => {
  const storageKey = `${algorithm}_recentInputs`;

  const [inputValue, setInputValue] = useState("");
  const [recentInputs, setRecentInputs] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedInput, setSelectedInput] = useState("");

  const saveInput = () => {
    const existingInputs = JSON.parse(localStorage.getItem(storageKey)) || [];
    existingInputs.unshift(JSON.stringify(inputData));
    const updatedInputs = existingInputs.slice(0, 5);
    localStorage.setItem(storageKey, JSON.stringify(updatedInputs));
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
    const inputString = JSON.stringify(input); // Convert the 2D array to a string
    setInputValue(inputString);
    setSelectedInput(inputString);
  };

  const handleUseHisInput = () => {
    if (typeof selectedInput === "string") {
      const inputArray = JSON.parse(selectedInput);
      useHisInput(inputArray);
      setShowHistory(false);
    } else {
      console.error("Selected input is not a string:", selectedInput);
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: "relative", width: "300px" }}>
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
            endAdornment: selectedInput && (
              <InputAdornment position="end">
                <Button onClick={handleUseHisInput}>Use This</Button>
              </InputAdornment>
            ),
          }}
        />
        {showHistory && (
          <Paper
            sx={{
              position: "absolute",
              width: "100%",
              maxHeight: "300px",
              overflow: "auto",
              zIndex: 2,
              mt: 1,
            }}
          >
            <List component="nav" aria-label="recent inputs">
              {recentInputs.map((input, index) => (
                <ListItem
                  key={index}
                  onClick={() => handleListItemClick(JSON.parse(input))}
                >
                  {input}
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
