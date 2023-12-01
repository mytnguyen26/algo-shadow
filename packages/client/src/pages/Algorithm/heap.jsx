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
var tdataset = []
var record = []
var step = 0
var deletetest = -1;
var deletegraph=  -1;
var totallen = data.length
var state = 0

const renderer = new GraphRenderer();

function HeapPage() {
  const svgRef = useRef(null);
  renderer.svgRef = svgRef;
  const [resetkey, setResetkey] = useState(0);
  const [heapResult, setHeapResult] = useState(null);

  function empty(){
    record = []
    reset()
  }

  function reset() {
    step = 0;
    if (state == 0) renderer.renderGraph(animationData);
    // if (state == 0) Animation.createTree(animationData.dataset, svgRef);
    else Animation.createTree(tdataset, svgRef);
    // else renderer.renderGraph(animationData);
  }

  useEffect(() => {
    createHeap()
  },[]);

  useEffect(() => {
    SaveInputToLocalStorage
  },[]);

  function createHeap(){
    animationData = new TreeAnimationData(data, "position")
    // dataset = data.map((value, index) => ({ index: index + 1, value: Number(value), position: index + 1 }));
    state = 0
    console.log("dataset pre max heap", animationData.dataset)
    empty() // render tree before maxheap
    const result = AnalyzeRuntime('createHeap', data, () => {
      Heapification.buildmaxheap(animationData.dataset, record);
      return animationData.dataset;
    });
    console.log("dataset after max heap", animationData.dataset)
    totallen = animationData.dataset.length
    setHeapResult(result);
  }
  
  function insertheap(idata){
    state = 1
    data.push(Number(idata))
    animationData.push(new Node(data.length, idata))
    tdataset = JSON.parse(JSON.stringify(animationData.dataset));//save data before sort
    empty()
    const result = AnalyzeRuntime('insertheap', data, () => {
      Heapification.insertheap(animationData.dataset,record)
      return animationData.dataset;
    });
    totallen = animationData.dataset.length
    console.log("dataset", animationData.dataset)
    console.log("tdataset", tdataset)
    setHeapResult(result);
  }
  
  function deleteheap(i){
    state = 1
    tdataset = JSON.parse(JSON.stringify(animationData.dataset));//save data before sort
    empty()
    deletetest = tdataset[i].index
    deletegraph = tdataset[tdataset.length-1].index
    Heapification.deleteheap(i+1,animationData.dataset,record);
    record.push({
      e1: 0,
      e2: [tdataset[tdataset.length-1].index,tdataset[i].index]
    })
    console.log(deletetest)
    data.splice(animationData.dataset[i].index-1, 1); 

  }

  function increasekey(i,kdata){
    if (kdata < animationData.dataset[i].value) {
      alert("new value is smaller than before");
    }
    state = 1
    animationData.dataset[i].value = kdata;
    tdataset = JSON.parse(JSON.stringify(animationData.dataset));//save data before sort
    empty()
    Heapification.increasekey(i+1, kdata, animationData.dataset, animationData.record)
  }

  function extraheap(){
    state = 1
    tdataset = JSON.parse(JSON.stringify(animationData.dataset));//save data before sort
    deletetest = tdataset[0].index-1
    deletegraph = tdataset[tdataset.length-1].index
    empty()
    Heapification.extraheap(animationData.dataset, record)
    record.push({
      e1: 0,
      e2: [tdataset[tdataset.length-1].index,tdataset[0].index-1]
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
            const index = Common.findinarray(ddata, animationData.dataset);
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
            const index = Common.findinarray(sdata, animationData.dataset);
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
            step = Common.nextStep(step, record)}}>Next Step</button>
          <button onClick={() => {
            step = Common.back(step, record)}}>Back</button>
          <button onClick={reset}>Reset</button>
          <button onClick={() => {
              Animation.createTree(animationData.dataset, svgRef);
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