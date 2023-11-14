import React, { useState, useEffect, useRef } from "react";
import Animation from "../../../components/GraphRenderer/animate";
import Heapification from "../../../components/AlgorithmSolver/heapmethod";
const width = 600;
const height = 300;
var data = [18, 4, 10, 13, 7, 9, 3, 2, 8, 1];
var dataset = [];
var tdataset = [];
var record = [];
var step = 0;
var deleteindex = -1;

function HeapPage() {
  const svgRef = useRef(null);
  const [resetkey, setResetkey] = useState(0);
  const [state, setState] = useState(0);
  //const [step, setStep] = useState(0);

  useEffect(() => {
    createHeap();
  }, [resetkey]);

  function validdata(xdata) {
    for (const ele of xdata) {
      if (isNaN(ele)) {
        return false;
      }
    }
    return true;
  }

  const nextStep = () => {
    if (step >= record.length) {
      alert("Heap is end!");
    } else {
      if (record[step].e1 == 0) {
        Animation.deleteelement(deleteindex + 1, dataset.length + 1);
      } else {
        const text1 = document.getElementById("t" + record[step].e1);
        const text2 = document.getElementById("t" + record[step].e2);
        Animation.animateExchange(text1, text2);
      }
      step++;
    }
  };

  function reset() {
    step = 0;
    if (state == 0) Animation.createTree(dataset, svgRef);
    else Animation.finalTree(tdataset, svgRef);
  }

  function back() {
    if (step < 1) {
      alert("This is the first step!");
    } else {
      step--;
      if (record[step].e1 == 0) {
        Animation.showelement(deleteindex + 1, dataset.length + 1);
      } else {
        const text1 = document.getElementById("t" + record[step].e1);
        const text2 = document.getElementById("t" + record[step].e2);
        Animation.animateExchange(text1, text2);
      }
    }
  }

  function empty() {
    record = [];
    step = 0;
  }

  function createHeap() {
    dataset = data.map((value, index) => ({
      index: index + 1,
      value: Number(value),
    }));
    empty();
    Animation.createTree(dataset, svgRef);
    Heapification.buildmaxheap(dataset, record);
  }

  function insertheap(idata) {
    empty();
    setState(1);
    data.push(Number(idata[0]));
    dataset.push({ index: data.length, value: Number(idata[0]) });
    tdataset = JSON.parse(JSON.stringify(dataset)); //save data before sort
    Animation.finalTree(dataset, svgRef);
    Heapification.insertheap(dataset, record);
  }

  function deleteheap(i) {
    empty();
    setState(1);
    Animation.finalTree(dataset, svgRef);
    tdataset = JSON.parse(JSON.stringify(dataset)); //save data before sort
    Heapification.deleteheap(i + 1, dataset, record);
    record.push({
      e1: 0,
      e2: dataset.length + 1,
    });
    deleteindex = i;
    console.log(dataset);
    data.splice(dataset[i].index - 1, 1);
  }

  return (
    <div>
      <div>
        <svg key={resetkey} ref={svgRef} width={width} height={height}></svg>
        {/* <button onClick={initializeMaxHeap}>Build Max Heap</button> */}
      </div>
      <div>
        <button onClick={nextStep}>Next Step</button>
        <button onClick={back}>back</button>

        <button onClick={reset}>Reset</button>
        <button
          onClick={() => {
            Animation.finalTree(dataset, svgRef);
            step = record.length;
          }}
        >
          fianl heap
        </button>
        <button>extra heap</button>
      </div>

      <input id="create" placeholder="Enter comma separated numbers" />
      <button
        id="csubmit"
        onClick={() => {
          let cdata = document.getElementById("create").value.split(",");
          if (validdata(cdata)) {
            data = cdata.map((item) => Number(item.trim()));
            createHeap();
            setState(0);
          } else {
            alert("Only numbers and commas can be entered");
          }
        }}
      >
        Create Heap
      </button>

      <input id="insert" placeholder="Insert a number" />
      <button
        id="isubmit"
        onClick={() => {
          let idata = document.getElementById("insert").value.split(",");
          if (validdata(idata) && idata.length === 1) {
            insertheap(idata);
          } else {
            alert(
              idata.length !== 1
                ? "Only insert one number"
                : "Only numbers and commas can be entered",
            );
          }
        }}
      >
        Insert
      </button>
      <input id="delete" placeholder="delete a number" />
      <button
        id="dsubmit"
        onClick={() => {
          let ddata = document.getElementById("delete").value.split(",");
          let t = 0;
          if (validdata(ddata) && ddata.length === 1) {
            for (var i = 0; i < dataset.length; i++) {
              if (dataset[i].value == ddata[0]) {
                deleteheap(i);
                t = 1;
                break;
              }
            }
            if (t == 0) alert(ddata[0] + " is not in heap");
          } else {
            alert(
              ddata.length !== 1
                ? "Only delete one number"
                : "Only numbers and commas can be entered",
            );
          }
        }}
      >
        delete
      </button>
    </div>
  );
}

export default HeapPage;
