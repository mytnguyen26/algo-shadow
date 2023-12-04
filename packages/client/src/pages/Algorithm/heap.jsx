import React, { useState, useEffect, useRef } from "react";
import { Button, TextField } from '@mui/material';
import { AlgorithmSpace } from "./AlgComponent/algorithmSpace";
import { AnalyzeRuntime } from "./AlgComponent/analyzeRuntime.jsx";
import { SaveInputToLocalStorage } from "./AlgComponent/saveInputToLocalStorage";
import Heapification from "./HeapComponent/heapmethod";
import Animation from "./HeapComponent/animate";
import Common from "./Common/common";
import ResultsTable from "./AlgComponent/tableCreater";

var data = [18, 4, 10, 13, 7, 9, 3, 2, 8, 1];
var dataset = [];
var tdataset = [];
var record = [];
var step = 0;
var deletetest = -1;
var deletegraph = -1;
var totallen = dataset.length;
var state = 0;

function HeapPage() {
  const svgRef = useRef(null);
  const [resetkey, setResetkey] = useState(0);
  const [heapResults, setHeapResults] = useState(() => {
    const savedResults = localStorage.getItem("heapResults");
    return savedResults ? JSON.parse(savedResults) : [];
  });

  const addResult = (newResult) => {
    setHeapResults((prevResults) => {
      const updatedResults = [...prevResults, newResult];
      if (updatedResults.length > 10) {
        updatedResults.shift(); // Remove the oldest result
      }

      // Save updated results to localStorage
      localStorage.setItem("heapResults", JSON.stringify(updatedResults));
      return updatedResults;
    });
  };

  function empty(){
    record = []
    reset()
  }

  function reset() {
    step = 0;
    if (state == 0) Animation.createTree(dataset, svgRef);
    else Animation.fianlTree(tdataset, svgRef);
  }

  useEffect(() => {
    createHeap();
  }, []);

  useEffect(() => {
    SaveInputToLocalStorage;
  }, []);

  function createHeap() {
    dataset = data.map((value, index) => ({
      index: index + 1,
      value: Number(value),
    }));
    state = 0;
    empty();
    const result = AnalyzeRuntime("createHeap", data, () => {
      Heapification.buildmaxheap(dataset, record);
      return dataset;
    });
    totallen = dataset.length
    addResult(result);
  }

  function insertheap(idata) {
    state = 1;
    data.push(Number(idata));
    dataset.push({ index: data.length, value: Number(idata) });
    tdataset = JSON.parse(JSON.stringify(dataset)); //save data before sort
    empty();
    const result = AnalyzeRuntime("insertheap", data, () => {
      Heapification.insertheap(dataset, record);
      return dataset;
    });
    totallen = dataset.length
    setHeapResults(result);
  }
  
  function deleteheap(i){
    state = 1
    tdataset = JSON.parse(JSON.stringify(dataset));//save data before sort
    empty()
    deletetest = tdataset[i].index
    deletegraph = tdataset[tdataset.length-1].index
    Heapification.deleteheap(i+1,dataset,record);
    record.push({
      e1: 0,
      e2: [tdataset[tdataset.length-1].index,tdataset[i].index]
    })
    console.log(deletetest)
    data.splice(dataset[i].index-1, 1); 

  }

  function increasekey(i, kdata) {
    if (kdata < dataset[i].value) {
      alert("new value is smaller than before");
    }
    state = 1;
    dataset[i].value = kdata;
    tdataset = JSON.parse(JSON.stringify(dataset)); //save data before sort
    empty();
    Heapification.increasekey(i + 1, kdata, dataset, record);
  }

  function extraheap() {
    state = 1;
    tdataset = JSON.parse(JSON.stringify(dataset)); //save data before sort
    deletetest = tdataset[0].index - 1;
    deletegraph = tdataset[tdataset.length - 1].index;
    empty();
    Heapification.extraheap(dataset, record);
    record.push({
      e1: 0,
      e2: [tdataset[tdataset.length-1].index,tdataset[0].index-1]
    })
  }
  const useHisInput = (input) => {
    // Assuming `createHeap` is a function that takes an input array to create a heap
    data = input;
    createHeap();
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input id="create" placeholder="Enter comma separated numbers" />
        <button id="csubmit" onClick={() => {
          try {
            let cdata = Common.validData("create");
            data = cdata.map(item => Number(item.trim()))
            createHeap()
          } catch (error) {
            alert("Error: " + error.message);
          }
          }}>Create Heap</button>

        <input id="insert" placeholder="Insert a number" />
        <button id="isubmit" onClick={() => {
          try {
            let idata = Common.validOneData("insert");
            insertheap(idata)
          } catch (error) {
            alert("Error: " + error.message); 
          }
          }}>Insert</button>

        <input id="delete" placeholder="Delete a number" />
        <button id="dsubmit" onClick={() => {
          try {
            let ddata = Common.validOneData("delete");
            const index = Common.findInArray(ddata,dataset);
            deleteheap(index)
          } catch (error) {
            alert("Error: " + error.message); 
          }
          }}>Delete</button>

        <input id="select" placeholder="select a number" />
        <input id="increase" placeholder="increase a number" />
        <button id="ksubmit" onClick={() => {
          try {
            let sdata = Common.validOneData("select");
            let idata = Common.validOneData("increase");
            const index = Common.findInArray(sdata,dataset);
            increasekey(index,idata);
          } catch (error) {
            alert("Error: " + error.message); 
          }
          }}>increase</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <AlgorithmSpace
          svgRef={svgRef}
          width={Common.width}
          height={Common.height}
          resetkey={resetkey}
        >
          {/* the graph will be rendered inside the AlgorithmSpace component */}
        </AlgorithmSpace>

      <div style={{ display: 'flex', justifyContent: 'middle', gap: '10px', marginTop: '10px' }}>
      <button onClick={() => {
            step = Common.nextStep(step, record)}}>Next Step</button>
          <button onClick={() => {
            step = Common.back(step, record)}}>Back</button>
          <button onClick={reset}>Reset</button>

          <button
            onClick={() => {
              Animation.fianlTree(dataset, svgRef);
              step = record.length;
            }}
          >
            Final Heap
          </button>
          <button onClick={extraheap}>extra heap</button>
        </div>
        <ResultsTable results={heapResults} />
      </div>
      <div>
        <SaveInputToLocalStorage
          algorithm="heap"
          inputData={data}
          useHisInput={useHisInput}
        />
      </div>
    </div>
  );
}

export default HeapPage;
