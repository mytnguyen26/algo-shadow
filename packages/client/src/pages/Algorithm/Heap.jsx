import React, { useState, useEffect , useRef} from "react";
import Animation from "./HeapComponent/animate";
import Heapification from "./HeapComponent/heapmethod";
const width = 600;
const height = 300;
var data = [18, 4, 10, 13, 7, 9, 3, 2, 8, 1]
var dataset = []
var record = []
var step = 0
function HeapPage() {
  const svgRef = useRef(null);
  const [resetkey,setResetkey] = useState(0);

  useEffect(() => {
    createHeap()
  },[resetkey]);

  function dataTran(data) {
    return data.map((value, index) => ({ index: index + 1, value: Number(value) }));
  }

  function validdata(tdata) {
    for (const ele of tdata) {
      if (isNaN(ele)) {
        return false;
      }
    }
    return true;
  }

  const nextStep = () => {
    if(step>=record.length)
    {
      alert("Heap is end!")
    }
    else
    {
      const text1 = document.getElementById("t" + record[step].e1);
      const text2 = document.getElementById("t" + record[step].e2);
      Animation.animateExchange(text1,text2);
      step++
    }
  }

  function reset() {
    step = 0
    Animation.createTree(dataset,svgRef);
    let result = Heapification.buildmaxheap(dataset,record);
    record = result.record
    dataset = result.dataset
  }

  function back() {
    if(step<1)
    {
      alert("This is the first step!")
    }
    else
    {
      step--
      console.log(record)
      console.log(step)
      const text1 = document.getElementById("t" + record[step].e1);
      const text2 = document.getElementById("t" + record[step].e2);
      Animation.animateExchange(text1,text2);
    }
  }

  function createHeap(){
    dataset = dataTran(data)
    record = []
    step = 0
    Animation.createTree(dataset,svgRef);
    Heapification.buildmaxheap(dataset,record);
  }

  return (
    <div>
      <div>
      <svg key={resetkey} ref={svgRef} width={width} height={height}></svg>
      {/* <button onClick={initializeMaxHeap}>Build Max Heap</button> */}
      </div>
      <button onClick={()=>{nextStep()}}>Next Step</button>
      <input id="create" placeholder="Enter comma separated numbers" />
      <button id="csubmit" onClick={() => {
        let tdata = document.getElementById("create").value.split(",");
        if (validdata(tdata)) {
          data = tdata.map(item => Number(item.trim()))
          createHeap()
        } else {
          alert("Only numbers and commas can be entered");
        }
        }}>Create Heap</button>

      <button id="final" onClick={() => {
          console.log("final")
          Animation.fianlTree(dataset,svgRef);
        }}>fianl heap</button>

      <input id="insert" placeholder="Insert a number" />
      <button id="isubmit" onClick={() => {
          let tdata = document.getElementById("insert").value.split(",");
          if (validdata(tdata) && tdata.length === 1) {
            data.push(Number(tdata[0]))
            dataset.push({index:data.length,value:Number(tdata[0])})
            step = record.length-1
            Animation.fianlTree(dataset,svgRef);
            Heapification.insertheap(dataset,record)
          } else {
            alert(tdata.length !== 1 ? "Only insert one number" : "Only numbers and commas can be entered");
          }
        }}>Insert</button>

      <button id="reset" onClick={reset}>Reset</button>
      <button id="reset" onClick={back}>back</button>
    </div>
  );
}

export default HeapPage;
