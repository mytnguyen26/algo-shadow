import React, { useState, useEffect , useRef} from "react";
import Animation from "./HeapComponent/animate";
import Heapification from "./HeapComponent/heapmethod";
const width = 600;
const height = 300;
let data = [18, 4, 10, 13, 7, 9, 3, 2, 8, 1]
let dataset = []
let record = []

function HeapPage() {
  const svgRef = useRef(null);
  //const [record, setRecord] = useState([]);
  const [step, setStep] = useState(0);
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
    }
    setStep(step+1)
  }

  function reset() {
    setStep(0)
    Animation.createTree(dataset,svgRef);
  }

  function createHeap(){
    dataset = dataTran(data)
    console.log(data)
    record = []
    setStep(0)
    Animation.createTree(dataset,svgRef);
    let result = Heapification.buildmaxheap(dataset,record);
    record = result.record
  }

  function insertHeap(newValue) {
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
          let newData = tdata.map(item => Number(item.trim()));
          setData(newData);
          setRecord([]);
          setDataset(dataTran(newData)); 
        } else {
          alert("Only numbers and commas can be entered");
        }
        }}>Create Heap</button>
    
      <input id="insert" placeholder="Insert a number" />
      <button id="isubmit" onClick={() => {
        let tdata = document.getElementById("insert").value.split(",");
        if (validdata(tdata) && tdata.length === 1) {

        } else {
          alert(tdata.length !== 1 ? "Only insert one number" : "Only numbers and commas can be entered");
        }
      }}>Insert</button>

      <button id="reset" onClick={reset}>Reset</button>
    </div>
  );
}

export default HeapPage;
