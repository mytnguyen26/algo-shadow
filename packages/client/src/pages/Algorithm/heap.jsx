import React, { useState, useEffect, useRef } from "react";
import { Button, TextField } from '@mui/material';
import { AlgorithmSpace } from "./AlgComponent/algorithmSpace";
import { AnalyzeRuntime } from './AlgComponent/runtimeAnalysis';
import { SaveInputToLocalStorage } from "./AlgComponent/saveInputToLocalStorage";
import Heapification from "./HeapComponent/heapmethod";
import Animation from "./HeapComponent/animate";
import Common from "./Common/common";

var data = [18, 4, 10, 13, 7, 9, 3, 2, 8, 1]
var dataset = []
var tdataset = []
var record = []
var step = 0
var deletetest = -1;
var deletegraph=  -1;
var totallen = dataset.length
var state = 0

function HeapPage() {
  const svgRef = useRef(null);
  const [resetkey,setResetkey] = useState(0);
  const [heapResult, setHeapResult] = useState(null);

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
    createHeap()
  },[]);

  useEffect(() => {
    SaveInputToLocalStorage
  },[]);

  function createHeap(){
    dataset = data.map((value, index) => ({ index: index + 1, value: Number(value) }));
    state = 0
    empty()
    const result = AnalyzeRuntime('createHeap', data, () => {
      Heapification.buildmaxheap(dataset, record);
      return dataset;
    });
    setHeapResult(result);
  }
  
  function insertheap(idata){
    state = 1
    data.push(Number(idata))
    dataset.push({index:data.length,value:Number(idata)})
    tdataset = JSON.parse(JSON.stringify(dataset));//save data before sort
    empty()
    const result = AnalyzeRuntime('insertheap', data, () => {
      Heapification.insertheap(dataset,record)
      return dataset;
    });
    setHeapResult(result);
  }
  
  function deleteheap(i){
    state = 1
    tdataset = JSON.parse(JSON.stringify(dataset));//save data before sort
    empty()
    deletetest = i
    deletegraph = tdataset[tdataset.length-1].index
    Heapification.deleteheap(i+1,dataset,record);
    record.push({
      e1: 0,
      e2: totallen+1
    })
    data.splice(dataset[i].index-1, 1); 

  }

  function increasekey(i,kdata){
    if (kdata < dataset[i].value) {
      alert("new value is smaller than before");
    }
    state = 1
    dataset[i].value = kdata;
    tdataset = JSON.parse(JSON.stringify(dataset));//save data before sort
    empty()
    Heapification.increasekey(i+1,kdata,dataset,record)
  }

  function extraheap(){
    state = 1
    tdataset = JSON.parse(JSON.stringify(dataset));//save data before sort
    deletetest = tdataset[0].index-1
    deletegraph = tdataset[tdataset.length-1].index
    empty()
    Heapification.extraheap(dataset, record)
    record.push({
      e1: 0,
      e2: totallen+1
    })
  }
  const useHisInput = (input) => {
    // Assuming `createHeap` is a function that takes an input array to create a heap
    data = input
    createHeap();
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input id="create" placeholder="Enter comma separated numbers" />
        <button id="csubmit" onClick={() => {
          try {
            let cdata = Common.validdata("create");
            data = cdata.map(item => Number(item.trim()))
            createHeap()
          } catch (error) {
            alert("Error: " + error.message);
          }
          }}>Create Heap</button>

        <input id="insert" placeholder="Insert a number" />
        <button id="isubmit" onClick={() => {
          try {
            let idata = Common.validonedata("insert");
            insertheap(idata)
          } catch (error) {
            alert("Error: " + error.message); 
          }
          }}>Insert</button>

        <input id="delete" placeholder="Delete a number" />
        <button id="dsubmit" onClick={() => {
          try {
            let ddata = Common.validonedata("delete");
            const index = Common.findinarray(ddata,dataset);
            deleteheap(index)
          } catch (error) {
            alert("Error: " + error.message); 
          }
          }}>Delete</button>

        <input id="select" placeholder="select a number" />
        <input id="increase" placeholder="increase a number" />
        <button id="ksubmit" onClick={() => {
          try {
            let sdata = Common.validonedata("select");
            let idata = Common.validonedata("increase");
            const index = Common.findinarray(sdata,dataset);
            increasekey(index,idata);
          } catch (error) {
            alert("Error: " + error.message); 
          }
          }}>increase</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <AlgorithmSpace svgRef={svgRef} width={Common.width} height={Common.height} resetkey={resetkey}> 
        {/* the graph will be rendered inside the AlgorithmSpace component */}
      </AlgorithmSpace>
          
      {heapResult && (
        <div>
          <h3>Heap Result:</h3>
          <div>
            <strong>Input:</strong> [{heapResult.input.join(", ")}]
          </div>
          <div>
            <strong>Output:</strong> [{heapResult.output.map((item) => item.value).join(", ")}]
          </div>
          <div>
            <strong>Runtime:</strong> {heapResult.runtime} ms
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'middle', gap: '10px', marginTop: '10px' }}>
      <button onClick={() => {
            step = Common.nextStep(step, record,deletetest,deletegraph)}}>Next Step</button>
          <button onClick={() => {
            step = Common.back(step, record,deletetest,deletegraph)}}>Back</button>
          <button onClick={reset}>Reset</button>
          <button onClick={() => {
              Animation.fianlTree(dataset, svgRef);
              step = record.length;
          }}>Final Heap</button>
          <button onClick={extraheap}>extra heap</button>
      </div>
    </div>
    <div><SaveInputToLocalStorage algorithm="heap" inputData={data} useHisInput={useHisInput}/>    
    </div>
  </div>
);
}

export default HeapPage;
