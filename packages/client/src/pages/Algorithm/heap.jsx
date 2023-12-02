/**
 * TODO: What is this module
 */
import React, { useState, useEffect, useRef } from "react";
import GraphRenderer from "../../components/GraphRenderer";
import HeapConcreteStrategy from "../../components/AlgorithmSolver/HeapConcreteStrategy";
import { Button, TextField } from '@mui/material';
import { AlgorithmSpace } from "./AlgComponent/algorithmSpace";
import { AnalyzeRuntime } from "./AlgComponent/analyzeRuntime";
import { SaveInputToLocalStorage } from "./AlgComponent/saveInputToLocalStorage";
import Heapification from "./HeapComponent/heapmethod";
import Animation from "../../components/GraphRenderer/animate";
import Common from "./Common/common";
import { common } from "@mui/material/colors";
import { TreeAnimationData, Node } from "../../components/AlgorithmSolver/GraphData";

var data = [18, 4, 10, 13, ] //7, 9, 3, 2, 8, 1]
var animationData = null
var tdataset = null
var record = []
var step = 0
var deletegraph=  -1;
var totallen = data.length
var state = 0

function HeapPage() {
  const svgRef = useRef(null);
  const [resetkey, setResetkey] = useState(0);
  const [heapResult, setHeapResult] = useState(null);

  function empty(){
    record = []
    reset()
  }

  function reset() {
    step = 0;
    if (state == 0) GraphRenderer.renderGraph(animationData, svgRef);
    else GraphRenderer.renderGraph(tdataset, svgRef);
  }

  useEffect(() => {
    createHeap()
  },[]);

  useEffect(() => {
    SaveInputToLocalStorage
  },[]);

  function createHeap(){
    animationData = new TreeAnimationData(data, "position")
    state = 0
    empty() // render tree before maxheap
    const result = AnalyzeRuntime('createHeap', data, () => {
      Heapification.buildMaxHeap(animationData.dataset, record);
      return animationData.dataset;
    });
    totallen = animationData.dataset.length
    setHeapResult(result);
  }
  
  function insertHeap(idata){
    state = 1
    data.push(Number(idata))
    animationData.push(new Node(data.length, idata))
    tdataset = JSON.parse(JSON.stringify(animationData));  //save data before sort
    empty()
    const result = AnalyzeRuntime('insertHeap', data, () => {
      Heapification.insertHeap(animationData.dataset,record)
      return animationData.dataset;
    });
    totallen = animationData.dataset.length
    setHeapResult(result);
  }
  
  /**
   * TODO
   * @param {*} i 
   */
  function deleteHeap(i){
    state = 1
    tdataset = JSON.parse(JSON.stringify(animationData)); //save data before sort
    empty()
    data.splice((animationData.dataset[i].index)-1, 1);   // delete 1 element from data
    deletegraph = tdataset.dataset[tdataset.dataset.length-1].index
    Heapification.deleteHeap(i+1, animationData.dataset, record);
    record.push({
      e1: 0,
      e2: [tdataset.dataset[tdataset.dataset.length-1].index, tdataset.dataset[i].index]
    })

  }

  function increaseKey(i,kdata){
    if (kdata < animationData.dataset[i].value) {
      alert("new value is smaller than before");
    }
    state = 1
    animationData.dataset[i].value = kdata;
    tdataset = JSON.parse(JSON.stringify(animationData));//save data before sort
    empty()
    Heapification.increaseKey(i+1, kdata, animationData.dataset, animationData.record)
  }

  function extraHeap(){
    state = 1
    tdataset = JSON.parse(JSON.stringify(animationData));//save data before sort
    deletegraph = tdataset.dataset[tdataset.dataset.length-1].index
    empty()
    Heapification.extraHeap(animationData.dataset, record)
    record.push({
      e1: 0,
      e2: [tdataset.dataset[tdataset.dataset.length-1].index,tdataset.dataset[0].index-1]
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
            insertHeap(idata)
          } catch (error) {
            alert("Error: " + error.message); 
          }
          }}>Insert</button>

        <input id="delete" placeholder="Delete a number" />
        <button id="dsubmit" onClick={() => {
          try {
            let ddata = Common.validOneData("delete");
            const index = Common.findInArray(ddata, animationData.dataset);
            deleteHeap(index)
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
            const index = Common.findInArray(sdata, animationData.dataset);
            increaseKey(index,idata);
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
            step = Common.nextStep(step, record)}}>Next Step</button>
          <button onClick={() => {
            step = Common.back(step, record)}}>Back</button>
          <button onClick={reset}>Reset</button>
          <button onClick={() => {
              GraphRenderer.renderGraph(animationData, svgRef);
              step = record.length;
          }}>Final Heap</button>
          <button onClick={extraHeap}>Extra Heap</button>
      </div>
    </div>
    <div><SaveInputToLocalStorage algorithm="heap" inputData={data} useHisInput={useHisInput}/>    
    </div>
  </div>
);
}

export default HeapPage;