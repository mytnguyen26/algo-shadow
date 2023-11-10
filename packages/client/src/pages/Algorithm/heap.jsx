import React, { useState, useEffect , useRef} from "react";
import Animation from "./HeapComponent/animate";
import Heapification from "./HeapComponent/heapmethod";
import { Button, TextField } from '@mui/material';
import { AlgorithmSpace } from "./AlgComponent/algorithmSpace";
import { analyzeRuntime } from './AlgComponent/RuntimeAnalysis';

const width = 900;
const height = 300;
var data = [18, 4, 10, 13, 7, 9, 3, 2, 8, 1]
var dataset = []
var tdataset = []
var record = []
var step = 0
var deletetest = -1;
var deletegraph=  -1;
var totallen = data.length;

function validdata(xdata) {
  for (const ele of xdata) {
    if (isNaN(ele)) {
      return false;
    }
  }
  return true;
}

function validonedata(xdata){
  if (validdata(xdata) && xdata.length === 1) {
    return true
  } else {
      alert(xdata.length !== 1 ? "Only select one number" : "Only numbers and commas can be entered");
  }

}

const nextStep = () => {
  if(step>=record.length)
  {
    alert("Heap is end!")
  }
  else
  {
    if(record[step].e1==0){
      Animation.deleteelement(deletetest+1,deletegraph)
    }
    else{
      const text1 = document.getElementById("t" + record[step].e1);
      const text2 = document.getElementById("t" + record[step].e2);
      Animation.animateExchange(text1,text2);
    }
    step++
  }
}


function back() {
  if(step<1)
  {
    alert("This is the first step!")
  }
  else
  {
    step--
    if(record[step].e1==0){
      Animation.showelement(deletetest+1,deletegraph)
    }
    else{
    const text1 = document.getElementById("t" + record[step].e1);
    const text2 = document.getElementById("t" + record[step].e2);
    Animation.animateExchange(text1,text2);
    }
  }
}

function empty(){
  record = []
  step = 0
  tdataset = []
}

function HeapPage() {
  const svgRef = useRef(null);
  const [resetkey,setResetkey] = useState(0);
  const [state, setState] = useState(0);
  const [heapResult, setHeapResult] = useState(null);

  useEffect(() => {
    createHeap()
    
  },[resetkey]);

  function createHeap(){
    dataset = data.map((value, index) => ({ index: index + 1, value: Number(value) }));
    empty()
    setState(0)
    Animation.createTree(dataset,svgRef);
    const result = analyzeRuntime('createHeap', data, () => {
      Heapification.buildmaxheap(dataset, record);
      return dataset;
    });
    setHeapResult(result);
  }
  
  function insertheap(idata){
    empty() 
    setState(1)
    totallen++
    data.push(Number(idata[0]))
    dataset.push({index:totallen,value:Number(idata[0])})
    tdataset = JSON.parse(JSON.stringify(dataset));//save data before sort
    Animation.fianlTree(dataset,svgRef);
    const result = analyzeRuntime('insertheap', data, () => {
      Heapification.insertheap(dataset,record)
      return dataset;
    });
    setHeapResult(result);
  }
  
  function deleteheap(i){
    empty()
    setState(1)
    Animation.fianlTree(dataset,svgRef);
    tdataset = JSON.parse(JSON.stringify(dataset));//save data before sort
    deletetest = i
    deletegraph = tdataset[tdataset.length-1].index

    Heapification.deleteheap(i+1,dataset,record);
    record.push({
      e1: 0,
      e2: totallen+1
    })
    data.splice(dataset[i].index-1, 1); 
  }

  function reset() {
    step = 0
    if(state==0)
      Animation.createTree(dataset,svgRef)
    else
      Animation.fianlTree(tdataset,svgRef)
  }

  function increasekey(i,kdata){
    empty()
    if (kdata < dataset[i].value) {
      alert("new value is smaller than before");
    }
    setState(1)
    dataset[i].value = kdata;
    Animation.fianlTree(dataset,svgRef);
    tdataset = JSON.parse(JSON.stringify(dataset));//save data before sort

    Heapification.increasekey(i+1,kdata,dataset,record)
  }

  function extraheap(){
    empty()
    setState(1)
    Animation.fianlTree(dataset,svgRef);
    tdataset = JSON.parse(JSON.stringify(dataset));//save data before sort
    console.log(tdataset)
    deletetest = tdataset[0].index-1
    deletegraph = tdataset[tdataset.length-1].index
    Heapification.extraheap(dataset, record)
    record.push({
      e1: 0,
      e2: totallen+1
    })
    console.log(record)
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input id="create" placeholder="Enter comma separated numbers" />
          <button id="csubmit" onClick={() => {
              let cdata = document.getElementById("create").value.split(",");
              if (validdata(cdata)) {
                  data = cdata.map(item => Number(item.trim()))
                  createHeap();
              } else {
                  alert("Only numbers and commas can be entered");
              }
          }}>Create Heap</button>

          <input id="insert" placeholder="Insert a number" />
          <button id="isubmit" onClick={() => {
              let idata = document.getElementById("insert").value.split(",");
              if (validdata(idata) && idata.length === 1) {
                  insertheap(idata);
              } else {
                  alert(idata.length !== 1 ? "Only insert one number" : "Only numbers and commas can be entered");
              }
          }}>Insert</button>

          <input id="delete" placeholder="Delete a number" />
          <button id="dsubmit" onClick={() => {
              let ddata = document.getElementById("delete").value.split(",");
              let t = 0;
              if (validonedata(ddata)) {
                  for (var i = 0; i < dataset.length; i++) {
                      if (dataset[i].value == ddata[0]) {
                        deleteheap(i);
                        t = 1;
                        break;
                      }
                  }
                  if (t == 0) {
                      alert(ddata[0] + " is not in heap");
                  }
              }
          }}>Delete</button>

          <input id="select" placeholder="select a number" />
          <input id="increase" placeholder="increase it to" />
          <button onClick={()=>{
            let sdata = document.getElementById("select").value.split(",");
            let kdata = document.getElementById("increase").value.split(",");
              let t = 0;
              if (validdata(sdata) && validdata(kdata) &&sdata.length === 1 &&kdata.length === 1) {
                  for (var i = 0; i < dataset.length; i++) {
                      if (dataset[i].value == sdata[0]) {
                          increasekey(i,kdata[0]);
                          t = 1;
                          break;
                      }
                  }
                  if (t == 0) {
                      alert(sdata[0] + " is not in heap");
                  }
              } else {
                  alert(sdata.length !== 1 ? "Only select one number" : "Only numbers and commas can be entered");
              }
          }}>increase key</button>
          

      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <AlgorithmSpace svgRef={svgRef} width={width} height={height} resetkey={resetkey}> 
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
          <button onClick={nextStep}>Next Step</button>
          <button onClick={back}>Back</button>
          <button onClick={reset}>Reset</button>
          <button onClick={() => {
              Animation.fianlTree(dataset, svgRef);
              step = record.length;
          }}>Final Heap</button>
          <button onClick={extraheap}>extra heap</button>
      </div>
      </div>
  </div>
);
}

export default HeapPage;