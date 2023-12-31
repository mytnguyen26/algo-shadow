/**
 * `SaveInputToLocalStorage` is a React component that provides functionality to save and retrieve input values associated with a specific algorithm to/from the local storage. It allows the user to store the current input, view a list of recent inputs, and select from these inputs.

 * Props:
 * - `algorithm`: A string identifier for the algorithm. Used as a part of the key to store and retrieve data from localStorage.
 * - `inputData`: The current input value that needs to be stored in the local storage.
 * - `useHisInput`: A function that is called with the selected input value when the user chooses to use a historical input.

 * The component provides a text field for input, a button to save the current input, and a dropdown list to display and select from recent inputs. It maintains an internal state to manage the current input value, the list of recent inputs, and the visibility of the history dropdown.

 * The recent inputs are stored in the local storage in an array format, with a maximum of 5 recent entries kept.
 */

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
    // Add new input at the beginning of the array
    existingInputs.unshift(JSON.stringify(inputData));
    // Slice array to keep only the last 5 inputs
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
          Retrieve Past Inputs
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
