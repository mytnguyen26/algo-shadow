const SaveInputToLocalStorage = ({ algorithm, inputData }) => {
  // Prefix for the local storage key to distinguish between different algorithms
  const storageKey = `${algorithm}_recentInputs`;

  const saveInput = () => {
    // Retrieve existing inputs or initialize to an empty array
    const existingInputs = JSON.parse(localStorage.getItem(storageKey)) || [];
    // Add new input at the beginning of the array
    existingInputs.unshift(inputData);
    // Slice array to keep only the last 5 inputs
    const recentInputs = existingInputs.slice(0, 5);
    // Save back to local storage
    localStorage.setItem(storageKey, JSON.stringify(recentInputs));
  };

  return (
    <button onClick={saveInput}>Save Input</button>
  );
};

export default SaveInputToLocalStorage;
