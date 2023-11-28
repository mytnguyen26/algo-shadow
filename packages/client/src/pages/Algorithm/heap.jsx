/**
 * TODO: What is this module
 */
import React, { useState, useEffect, useRef } from "react";
import GraphRenderer from "../../components/GraphRenderer";
import Common from "./Common/common";
import Heapification from "./HeapComponent/heapmethod";
import HeapConcreteStrategy from "../../components/AlgorithmSolver/HeapConcreteStrategy"
import { Button, TextField } from "@mui/material";
import { AlgorithmSpace } from "./AlgComponent/algorithmSpace";
import { AnalyzeRuntime } from "./AlgComponent/analyzeRuntime";
import { SaveInputToLocalStorage } from "./AlgComponent/saveInputToLocalStorage";
import { common } from "@mui/material/colors";

var data = [18, 4, 10, 13, 7, 9, 3, 2, 8, 1];
var dataset = [];
var tdataset = [];
var record = [];
var step = 0;
var deletetest = -1;
var deletegraph = -1;
var totallen = dataset.length;
var state = 0;

const renderer = new GraphRenderer();

/**
 * TODO
 * @param {*} xdata
 * @param {*} dataset
 * @returns
 */
function findInHeap(xdata, dataset) {
  for (var i = 0; i < dataset.length; i++) {
    if (dataset[i].value == xdata) {
      return i;
    }
  }
  throw new Error(xdata + " is not in heap");
}

/**
 * TODO
 */
const nextStep = () => {
  if (step >= record.length) {
    alert("Heap is end!");
  } else {
    if (record[step].e1 == 0) {
      renderer.deleteElement(deletetest + 1, deletegraph);
    } else {
      const text1 = document.getElementById("t" + record[step].e1);
      const text2 = document.getElementById("t" + record[step].e2);
      renderer.animateExchange(text1, text2);
    }
    step++;
  }
};

/**
 * TODO
 */
function back() {
  if (step < 1) {
    alert("This is the first step!");
  } else {
    step--;
    if (record[step].e1 == 0) {
      renderer.showElement(deletetest + 1, deletegraph);
    } else {
      const text1 = document.getElementById("t" + record[step].e1);
      const text2 = document.getElementById("t" + record[step].e2);
      renderer.animateExchange(text1, text2);
    }
  }
}

/**
 * TODO
 * @returns what is it returning
 */
function HeapPage() {
  const svgRef = useRef(null);
  renderer.svgRef = svgRef;
  const [resetkey, setResetkey] = useState(0);
  const [heapResult, setHeapResult] = useState(null);

  /**
   * A Helper function only used in heap
   */
  function empty() {
    record = [];
    step = 0;
    console.log(state);
    if (state == 1) {
      renderer.finalTree();
    } else {
      renderer.renderGraph(dataset);
    }
  }

  /**
   * TODO
   */
  function reset() {
    step = 0;
    if (state == 0) {
      renderer.renderGraph(dataset);
    } else {
      renderer.finalTree();
    }
  }

  useEffect(() => {
    createHeap();
  }, []);

  useEffect(() => {
    SaveInputToLocalStorage;
  }, []);

  /**
   * TODO
   */
  function createHeap() {
    dataset = Common.dataTransform(data);
    renderer.solverStrategy = HeapConcreteStrategy
    state = 0;
    empty();
    const result = AnalyzeRuntime("createHeap", data, () => {
      Heapification.buildmaxheap(dataset, record);
      return dataset;
    });
    setHeapResult(result);
  }

  // function createHeap() {
  //   renderer.solverStrategy = new HeapConcreteStrategy()
  //   const result = renderer.create(data)
  //   setHeapResult(result); // Update state
  // }

  /**
   * TODO
   * @param {*} idata TODO: what is idata?
   */
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
    setHeapResult(result);
  }

  /**
   * TODO
   * @param {*} i TODO: What is i?
   */
  function deleteheap(i) {
    state = 1;
    tdataset = JSON.parse(JSON.stringify(dataset)); //save data before sort
    empty();
    deletetest = i;
    deletegraph = tdataset[tdataset.length - 1].index;
    Heapification.deleteheap(i + 1, dataset, record);
    record.push({
      e1: 0,
      e2: totallen + 1,
    });
    data.splice(dataset[i].index - 1, 1);
  }

  /**
   * TODO
   * @param {*} i what is i?
   * @param {*} kdata
   */
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

  /**
   * TODO
   */
  function extraHeap() {
    state = 1;
    tdataset = JSON.parse(JSON.stringify(dataset)); //save data before sort
    deletetest = tdataset[0].index - 1;
    deletegraph = tdataset[tdataset.length - 1].index;
    empty();
    Heapification.extraHeap(dataset, record);
    record.push({
      e1: 0,
      e2: totallen + 1,
    });
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
        <button
          id="csubmit"
          onClick={() => {
            try {
              let cdata = Common.validData("create");
              data = cdata.map((item) => Number(item.trim()));
              createHeap();
            } catch (error) {
              alert("Error: " + error.message); // 输出错误消息
            }
          }}
        >
          Create Heap
        </button>

        <input id="insert" placeholder="Insert a number" />
        <button
          id="isubmit"
          onClick={() => {
            try {
              let idata = Common.validOneData("insert");
              insertheap(idata);
            } catch (error) {
              alert("Error: " + error.message); // 输出错误消息
            }
          }}
        >
          Insert
        </button>

        <input id="delete" placeholder="Delete a number" />
        <button
          id="dsubmit"
          onClick={() => {
            try {
              let ddata = Common.validOneData("delete");
              const index = Common.findInArray(ddata, dataset);
              deleteheap(index);
            } catch (error) {
              alert("Error: " + error.message); // 输出错误消息
            }
          }}
        >
          Delete
        </button>

        <input id="select" placeholder="select a number" />
        <input id="increase" placeholder="increase a number" />
        <button
          id="ksubmit"
          onClick={() => {
            try {
              let sdata = Common.validOneData("select");
              let idata = Common.validOneData("increase");
              const index = Common.findInArray(sdata, dataset);
              increasekey(index, idata);
            } catch (error) {
              alert("Error: " + error.message); // 输出错误消息
            }
          }}
        >
          increase
        </button>
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

        {heapResult && (
          <div>
            <h3>Heap Result:</h3>
            <div>
              <strong>Input:</strong> [{heapResult.input.join(", ")}]
            </div>
            <div>
              <strong>Output:</strong> [
              {heapResult.output.map((item) => item.value).join(", ")}]
            </div>
            <div>
              <strong>Runtime:</strong> {heapResult.runtime} ms
            </div>
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "middle",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <button onClick={renderer.nextStep}>Next Step</button>
          <button onClick={renderer.back}>Back</button>
          <button onClick={renderer.reset}>Reset</button>
          <button
            onClick={() => {
              renderer.finalTree();
              step = record.length;
            }}
          >
            Final Heap
          </button>
          <button onClick={extraHeap}>extra heap</button>
        </div>
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
