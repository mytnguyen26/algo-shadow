import React, { useState, useRef } from "react";
import "../../assets/style/hash.table.style.css"
import { djb2Hash, hashFunc } from "../../utils/algorithm-solver/hashTableSolver";
import ResultsTable from "./algo-component/TableCreater.jsx";
import { getBarchartData } from "../../utils/barchart-analyze/getBarchartData.js";
import { BarChart } from "./analyze-graph/BarChart.jsx";
import useTableData from "./algo-component/useTableData.jsx";


const MAX = 20;
const HashTablePage = () => {
  const { tableData, addTableRow } = useTableData("HashResults");
  const [cells, setCells] = useState(Array(MAX).fill(null));
  const [inputValue, setInputValue] = useState("");
  const [currentSize, setCurrentSize] = useState(0);

  /**
   * A helper function to animate the cell if an element
   * is inserted, deleted, or selected from the hash table
   * @param {*} index 
   * @returns 
   */
  const animateCell = async (index) => {
    return new Promise((resolve) => {
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

  /**
   * Insert an element to the hash table.
   * @returns 
   */
  const insert = async () => {
    const value = parseInt(inputValue);
    if (isNaN(value) || value < 0 || value > 99) {
      alert("Please enter a significant digit between 0 and 99!");
      setInputValue("");
      return;
    }

    if (currentSize >= MAX) {
      alert("The hash table is full and can't be inserted anymore!");
      setInputValue("");
      return;
    }

    if (cells.some((cell) => cell && cell.value === value)) {
      alert("The number already exists in the hash table!");
      setInputValue("");
      return;
    }

    let startTime = performance.now();
    let hashedValue = hashFunc(value, MAX);
    let endTime = performance.now();
    addTableRow({
      operation: "Insert new number",
      input: value,
      output: "Number Position " + hashedValue,
      runtime: startTime - endTime,
    });
    let attempt = 1;
    while (cells[hashedValue] && attempt < MAX) {
      if (cells[hashedValue].deleted) {
        break;
      }
      await animateCell(hashedValue);
      hashedValue = (hashFunc(value, MAX) + attempt * attempt) % MAX;
      attempt++;
    }

    if (attempt >= MAX) {
      alert(
        " Unable to find a suitable location for insertion due to conflict! ",
      );
      setInputValue("");
      addTableRow({
        operation: "Insert new number",
        input: value,
        output: "Number Position " + hashedValue,
        runtime: 'N/A',
      });
      return;
    }

    await animateCell(hashedValue);
    const newCells = [...cells];
    newCells[hashedValue] = { value, isAnimating: false };
    setCells(newCells);
    setCurrentSize(currentSize + 1);
    setInputValue("");
  };

  /**
   * Search for an element in the hash table.
   * @returns 
   */
  const search = async () => {
    const value = parseInt(inputValue);
    if (isNaN(value) || value < 0 || value > 99) {
      alert("Please enter a significant digit between 0 and 99!");
      setInputValue("");
      return;
    }

    
    let hashedValue = hashFunc(value, MAX);
    let attempt = 1;
    while (cells[hashedValue] && attempt < MAX) {
      if (cells[hashedValue] && cells[hashedValue].deleted) {
        hashedValue = (hashFunc(value, MAX) + attempt * attempt) % MAX;
        attempt++;
        continue;
      }

      let startTime = performance.now(); // Start the timer
      if (cells[hashedValue] && cells[hashedValue].value === value) {
        let endTime = performance.now();
        addTableRow({
          operation: "Search number",
          input: value,
          output: "Number Position " + hashedValue,
          runtime: endTime - startTime,
        });

        await animateCell(hashedValue);
        alert("Value found!");
        setInputValue("");
        return;
      }


      hashedValue = (hashFunc(value, MAX) + attempt * attempt) % MAX;
      attempt++;
    }

    alert("Value not found!");
    setInputValue("");

  };

  /**
   * Delete an element from the hash table.
   * @returns 
   */
  const deleteValue = async () => {
    const value = parseInt(inputValue);
    if (isNaN(value) || value < 0 || value > 99) {
      alert("Please enter a significant digit between 0 and 99!");
      setInputValue("");
      return;
    }

    let startTime = performance.now();
    let hashedValue = hashFunc(value, MAX);
    let endTime = performance.now();
    let attempt = 1;
    while (cells[hashedValue] && attempt < MAX) {
      if (cells[hashedValue] && cells[hashedValue].deleted) {
        // startTime = performance.now();
        hashedValue = (hashFunc(value, MAX) + attempt * attempt) % MAX;
        // endTime = performance.now();
        attempt++;
        continue;
      }

      if (cells[hashedValue] && cells[hashedValue].value === value) {
        await animateCell(hashedValue);
        const newCells = [...cells];
        newCells[hashedValue] = { deleted: true }; //deleted ius true
        addTableRow({
          operation: "Delete number",
          input: value,
          output: "Number Position " + hashedValue,
          runtime: 'N/A',
        });
        setCells(newCells);
        setCurrentSize(currentSize - 1);
        alert("Value deleted!");
        setInputValue("");
        return;
      }

      hashedValue = (hashFunc(value, MAX) + attempt * attempt) % MAX;
      attempt++;
    }

    alert("Value not found!");
    setInputValue("");
  };
 
  return (
    <div className="container">
      <h1>Hash</h1>
      <div id="hashTable">
        {cells.map((cell, index) => (
          <div
            key={index}
            className={`cell ${
              cell && cell.isAnimating ? "pulse-animation" : ""
            }`}
          >
            {cell ? cell.value : ""}
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
      <div>
          <ResultsTable tableData={tableData} />
          <BarChart data={getBarchartData(tableData).reverse()} />
      </div>
    </div>
  );
};

export default HashTablePage;
