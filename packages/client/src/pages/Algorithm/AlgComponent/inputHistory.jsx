// InputHistory.jsx
import React, { useEffect, useState } from 'react';

export const InputHistory = ({ algorithm, useInputFunction }) => {
  // State for the selected input
  const [selectedInput, setSelectedInput] = useState(null);
  const [savedInputs, setSavedInputs] = useState([]);

  // Prefix for the local storage key to distinguish between different algorithms
  const storageKey = `${algorithm}_recentInputs`;

  // Function to update saved inputs from local storage
  const updateSavedInputs = () => {
    const inputs = JSON.parse(localStorage.getItem(storageKey)) || [];
    setSavedInputs(inputs);
  };

  useEffect(() => {
    updateSavedInputs();
  }, [algorithm]); // Dependency array to re-run the effect if the algorithm changes

  // Handle the input selection
  const handleSelectInput = (input) => {
    setSelectedInput(input);
  };

  // Handle using the selected input
  const handleUseInput = () => {
    if (selectedInput && useInputFunction) {
      useInputFunction(selectedInput);
    }
  };

  // Function to render saved inputs list
  const renderSavedInputsList = () => (
    savedInputs.map((input, index) => (
      <li key={index}>
        {input.join(', ')}
        <button onClick={() => handleSelectInput(input)}>Select</button>
      </li>
    ))
  );

  return (
    <div>
      <h3>Saved Inputs:</h3>
      <ul>{renderSavedInputsList()}</ul>
      {selectedInput && (
        <div>
          <button onClick={handleUseInput}>Use This Input</button>
        </div>
      )}
    </div>
  );
};

export default InputHistory;
