import React, { useState, useEffect, useRef } from "react";
import { Button, TextField } from "@mui/material";
import { AlgorithmSpace } from "./AlgComponent/algorithmSpace";
import { AnalyzeRuntime } from "./AlgComponent/analyzeRuntime.jsx";
import { SaveInputToLocalStorage } from "./AlgComponent/saveInputToLocalStorage";
import HeapConcreteStrategy from "../../algorithm-solver/heapsolver.js";
import Common from "./Common/common";
import TreeGraphRenderer from "./Common/treerenderer.js";
import { TreeAnimationData, Node } from "./Common/animationdata.js"
import ResultsTable from "./AlgComponent/tableCreater";

var data = [18, 4, 10, 13, 7, 9, 3, 2, 8, 1];
var animationData = null;
var tDataset = null;
var record = [];
var step = 0;
var deleteGraph = -1;
var totallen = data.length;
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

  function empty() {
    record = [];
    reset();
  }

  function reset() {
    step = 0;
    if (state == 0) TreeGraphRenderer.renderGraph(animationData, svgRef);
    else TreeGraphRenderer.renderGraph(tDataset, svgRef);
  }

  useEffect(() => {
    createHeap();
  }, []);

  useEffect(() => {
    SaveInputToLocalStorage;
  }, []);

  function createHeap() {
    animationData = new TreeAnimationData(data, "position")
    tDataset = new TreeAnimationData(data, "position")
    state = 0;
    empty();    // render tree before maxheap
    const result = AnalyzeRuntime("createHeap", data, () => {
      HeapConcreteStrategy.buildMaxHeap(animationData.dataset, record);
      return animationData.dataset;
    });
    totallen = animationData.dataset.length;
    addResult(result);
  }

  function insertNewNodeToHeap(idata) {
    state = 1;
    data.push(Number(idata));
    animationData.dataset.push(new Node(data.length, idata));
    tDataset.dataset = JSON.parse(JSON.stringify(animationData.dataset)); // save data before sort
    empty();
    const result = AnalyzeRuntime("insertNewNodeToHeap", data, () => {
      HeapConcreteStrategy.insert(animationData.dataset, record);
      return animationData.dataset;
    });
    totallen = animationData.dataset.length;
    addResult(result);
  }

  function deleteNodeFromHeap(i) {
    state = 1;
    tDataset.dataset = JSON.parse(JSON.stringify(animationData.dataset)); //save data before sort
    empty();                                              // render graphs before removing node from heap
    deleteGraph = tDataset.dataset[tDataset.dataset.length - 1].index;
    HeapConcreteStrategy.delete(i + 1, animationData.dataset, record);
    record.push({
      e1: 0,
      e2: [tDataset.dataset[tDataset.dataset.length - 1].index, tDataset.dataset[i].index],
    });
    data.splice(animationData.dataset[i].index - 1, 1);  // delete 1 element from data
  }

  function increaseKey(i, kdata) {
    if (kdata < animationData.dataset[i].value) {
      alert("new value is smaller than before");
    }
    state = 1;
    animationData.dataset[i].value = kdata;
    tDataset.dataset = JSON.parse(JSON.stringify(animationData.dataset)); //save data before sort
    empty();
    HeapConcreteStrategy.increaseKey(i + 1, kdata, animationData.dataset, record);
  }

  function extraHeap() {
    state = 1;
    tDataset.dataset = JSON.parse(JSON.stringify(animationData.dataset)); //save data before sort
    deleteGraph = tDataset.dataset[tDataset.dataset.length - 1].index;
    empty();
    HeapConcreteStrategy.extraHeap(animationData.dataset, record);
    record.push({
      e1: 0,
      e2: [tDataset.dataset[tDataset.dataset.length - 1].index, tDataset.dataset[0].index - 1],
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
              alert("Error: " + error.message);
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
              insertNewNodeToHeap(idata);
            } catch (error) {
              alert("Error: " + error.message);
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
              const index = Common.findInArray(ddata, animationData.dataset);
              deleteNodeFromHeap(index);
            } catch (error) {
              alert("Error: " + error.message);
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
              const index = Common.findInArray(sdata, animationData.dataset);
              increaseKey(index, idata);
            } catch (error) {
              alert("Error: " + error.message);
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

        <div
          style={{
            display: "flex",
            justifyContent: "middle",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <button
            onClick={() => {
              step = Common.next(step, record);
            }}
          >
            Next Step
          </button>
          <button
            onClick={() => {
              step = Common.back(step, record);
            }}
          >
            Back
          </button>
          <button onClick={reset}>Reset</button>

          <button
            onClick={() => {
              TreeGraphRenderer.renderGraph(animationData, svgRef);
              step = record.length;
            }}
          >
            Final Heap
          </button>
          <button onClick={extraHeap}>extra heap</button>
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
