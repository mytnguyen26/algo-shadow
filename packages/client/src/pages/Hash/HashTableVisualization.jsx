import React, { useState } from 'react';
import './HashTableVisualization.css';

const MAX = 20;

const HashTableVisualization = () => {
  const [cells, setCells] = useState(Array(MAX).fill(null));
  const [inputValue, setInputValue] = useState("");
  const [currentSize, setCurrentSize] = useState(0);

  const djb2Hash = (str) => {
    const len = str.length;
    let hash = 6518;
    for (let i = 0; i < len; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i) | 0;
    }
    return hash >>> 0;
  };

  const hashFunc = (value) => {
    return djb2Hash(value.toString()) % MAX;
  };

  const animateCell = async (index) => {
    return new Promise(resolve => {
      const newCells = [...cells];
      newCells[index] = { ...newCells[index], isAnimating: true };
      setCells(newCells);
      setTimeout(() => {
        newCells[index] = { ...newCells[index], isAnimating: false };
        setCells(newCells);
        resolve();
      }, 1000);
    });
  };

  const insert = async () => {
    const value = parseInt(inputValue);
    if (isNaN(value) || value < 0 || value > 99) {
      alert('Please enter a significant digit between 0 and 99!');
      setInputValue('');
      return;
    }

    if (currentSize >= MAX) {
      alert("The hash table is full and can't be inserted anymore!");
      setInputValue('');
      return;
    }

    if (cells.some(cell => cell && cell.value === value)) {
      alert('The number already exists in the hash table!');
      setInputValue('');
      return;
    }

    let hashedValue = hashFunc(value);
    let attempt = 1;
    while (cells[hashedValue] && attempt < MAX) {
      await animateCell(hashedValue);
      hashedValue = (hashFunc(value) + attempt * attempt) % MAX;
      attempt++;
    }

    if (attempt >= MAX) {
      alert(' Unable to find a suitable location for insertion due to conflict! ');
      setInputValue('');
      return;
    }

    await animateCell(hashedValue);
    const newCells = [...cells];
    newCells[hashedValue] = { value, isAnimating: false };
    setCells(newCells);
    setCurrentSize(currentSize + 1);
    setInputValue('');
  };

  const search = async () => {
    const value = parseInt(inputValue);
    if (isNaN(value) || value < 0 || value > 99) {
      alert('Please enter a significant digit between 0 and 99!');
      setInputValue('');
      return;
    }

    let hashedValue = hashFunc(value);
    let attempt = 1;
    while ((cells[hashedValue] && cells[hashedValue].value !== value) && attempt < MAX) {
      await animateCell(hashedValue);
      hashedValue = (hashFunc(value) + attempt * attempt) % MAX;
      attempt++;
    }

    if (cells[hashedValue] && cells[hashedValue].value === value) {
      await animateCell(hashedValue);
    } else {
      alert('Value not found!');
    }
    setInputValue('');
  };

  const deleteValue = async () => {
    const value = parseInt(inputValue);
    if (isNaN(value) || value < 0 || value > 99) {
      alert('Please enter a significant digit between 0 and 99!');
      setInputValue('');
      return;
    }

    let hashedValue = hashFunc(value);
    let attempt = 1;
    while ((cells[hashedValue] && cells[hashedValue].value !== value) && attempt < MAX) {
      await animateCell(hashedValue);
      hashedValue = (hashFunc(value) + attempt * attempt) % MAX;
      attempt++;
    }

    if (cells[hashedValue] && cells[hashedValue].value === value) {
      await animateCell(hashedValue);
      const newCells = [...cells];
      newCells[hashedValue] = null;
      setCells(newCells);
      setCurrentSize(currentSize - 1);
    } else {
      alert('Value not found!');
    }
    setInputValue('');
  };

  return (
    <div className="container">
      <h1>Hash</h1>
      <div id="hashTable">
        {cells.map((cell, index) => (
          <div key={index} className={`cell ${cell && cell.isAnimating ? 'pulse-animation' : ''}`}>
            {cell ? cell.value : ''}
          </div>
        ))}
      </div>
      <input
        type="number"
        id="input"
        placeholder="Enter a number (0-99)"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={insert}>Insert</button>
      <button onClick={search}>Search</button>
      <button onClick={deleteValue}>Delete</button>
    </div>
  );
};

export default HashTableVisualization;