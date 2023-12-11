import React, { useState, useEffect, useRef } from "react";
import { AlgorithmSpace } from "./algo-component/AlgorithmSpace.jsx";
import { AnalyzeRuntime } from "../../utils/algorithm-solver/analyzeRuntime.js";
import { SaveInputToLocalStorage } from "./algo-component/SaveInputToLocalStorage.jsx";
import HeapConcreteStrategy from "../../utils/algorithm-solver/heapSolver.js";
import Common from "../../utils/renderer/common";
import TreeGraphRenderer from "../../utils/renderer/treeRenderer.js";
import { TreeAnimationData, Node } from "../../utils/renderer/animationData.js";
import ResultsTable from "./algo-component/TableCreater.jsx";

import { BarChart } from "./analyze-graph/BarChart.jsx";
import useTableData from "./algo-component/useTableData.jsx";
import { getBarchartData } from "../../utils/barchart-analyze/getBarchartData.js";
import { Box, Stack, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";

let data = [18, 4, 10, 13, 7, 9, 3, 2, 8, 1];
let animationData = null;
let tDataset = null;
let record = [];
let step = 0;
let deleteGraph = -1;
let totalLength = data.length;
let state = 0;

function HeapPage() {
  const svgRef = useRef(null);
  const [resetKey] = useState(0);
  const { tableData, addTableRow } = useTableData("heapResults");

  function empty() {
    record = [];
    reset();
  }

  function reset() {
    step = 0;
    if (state === 0) TreeGraphRenderer.renderGraph(animationData, svgRef);
    else TreeGraphRenderer.renderGraph(tDataset, svgRef);
  }

  useEffect(() => {
    createHeap();
  }, []);

  useEffect(() => {
    SaveInputToLocalStorage;
  }, []);

  function createHeap() {
    animationData = new TreeAnimationData(data, "position");
    tDataset = new TreeAnimationData(data, "position");
    state = 0;
    empty(); // render tree before maxheap
    const result = AnalyzeRuntime("createHeap", data, () => {
      HeapConcreteStrategy.buildMaxHeap(animationData.dataset, record);
      return animationData.dataset;
    });

    totalLength = animationData.dataset.length;

    // addTableRow('Create new tree', result.input, result.output, result.runtime);

    addTableRow({
      operation: "Create new tree",
      input: result.input,
      output: result.output,
      runtime: result.runtime,
    });
  }

  function insertNewNodeToHeap(idata) {
    state = 1;
    data.push(Number(idata));
    animationData.dataset.push(new Node(data.length, idata));
    tDataset.dataset = JSON.parse(JSON.stringify(animationData.dataset)); // save data before sort
    empty();
    const result = AnalyzeRuntime("insertNewNodeToHeap", idata, () => {
      HeapConcreteStrategy.insert(animationData.dataset, record);
      return animationData.dataset;
    });
    totalLength = animationData.dataset.length;
    // Find the position of the inserted node
    const insertedNodePosition =
      animationData.dataset[animationData.dataset.length - 1].position;

    // console.log("Position of newly inserted node:", insertedNodePosition);

    addTableRow({
      operation: "Insert new node",
      input: idata,
      output: "Node Position " + insertedNodePosition,
      runtime: result.runtime,
    });

    // addResult(result);
  }

  function deleteNodeFromHeap(i, ddata) {
    state = 1;
    tDataset.dataset = JSON.parse(JSON.stringify(animationData.dataset)); //save data before sort
    empty(); // render graphs before removing node from heap
    deleteGraph = tDataset.dataset[tDataset.dataset.length - 1].index;
    const result = AnalyzeRuntime("deleteNodeFromHeap", ddata, () => {
      HeapConcreteStrategy.delete(i + 1, animationData.dataset, record);
      record.push({
        e1: 0,
        e2: [
          tDataset.dataset[tDataset.dataset.length - 1].index,
          tDataset.dataset[i].index,
        ],
      });
      return animationData.dataset;
    });

    data.splice(animationData.dataset[i].index - 1, 1); // delete 1 element from data

    addTableRow({
      operation: "Delete node",
      input: ddata,
      output: "Delete Node inital position " + i,
      runtime: result.runtime,
    });
  }

  function increaseKey(i, kdata) {
    if (kdata < animationData.dataset[i].value) {
      alert("new value is smaller than before");
    }
    state = 1;
    animationData.dataset[i].value = kdata;
    tDataset.dataset = JSON.parse(JSON.stringify(animationData.dataset)); //save data before sort
    empty();
    HeapConcreteStrategy.increaseKey(
      i + 1,
      kdata,
      animationData.dataset,
      record
    );
  }

  function extraHeap() {
    state = 1;
    tDataset.dataset = JSON.parse(JSON.stringify(animationData.dataset)); //save data before sort
    deleteGraph = tDataset.dataset[tDataset.dataset.length - 1].index;
    empty();
    HeapConcreteStrategy.extraHeap(animationData.dataset, record);
    record.push({
      e1: 0,
      e2: [
        tDataset.dataset[tDataset.dataset.length - 1].index,
        tDataset.dataset[0].index - 1,
      ],
    });
  }

  const useHisInput = (input) => {
    // Assuming `createHeap` is a function that takes an input array to create a heap
    data = input;
    createHeap();
  };

  return (
    <Stack direction="row" gap={3}>
      <Stack gap={2}>
        <TextField
          id="create"
          label="Enter comma separated numbers"
          placeholder="Enter comma separated numbers"
          helperText="example: 1,2,3,4"
        />
        <Button
          id="csubmit"
          variant="contained"
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
        </Button>

        <TextField id="insert" label="Insert a node" helperText="example: 12" />
        <Button
          variant="contained"
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
          Insert Node
        </Button>

        <TextField id="delete" label="Delete a node" helperText="example: 2" />
        <Button
          variant="contained"
          id="dsubmit"
          onClick={() => {
            try {
              let ddata = Common.validOneData("delete");
              const index = Common.findInArray(ddata, animationData.dataset);
              deleteNodeFromHeap(index, ddata);
            } catch (error) {
              alert("Error: " + error.message);
            }
          }}
        >
          Delete Node
        </Button>
        <SaveInputToLocalStorage
          algorithm="bst"
          inputData={data}
          useHisInput={useHisInput}
        />
      </Stack>
      <Stack gap={2} alignItems="start">
        <AlgorithmSpace
          svgRef={svgRef}
          width={Common.width}
          height={Common.height}
        />
        <Typography variant="subtitle1">Step 1: Run it step by step</Typography>
        <Stack direction="row" justifyContent="center" gap={2}>
          <Button
            variant="contained"
            onClick={() => (step = Common.next(step, record))}
          >
            Next Step
          </Button>
          <Button
            variant="contained"
            onClick={() => (step = Common.back(step, record))}
          >
            Previous Step
          </Button>
        </Stack>
        <Typography variant="subtitle1">Step 2: Run Final Heap</Typography>
        <Stack direction="row" justifyContent="center" gap={2}>
          <Button
            variant="contained"
            onClick={() => {
              TreeGraphRenderer.renderGraph(animationData, svgRef);
              step = record.length;
            }}
          >
            Final Heap
          </Button>
        </Stack>
        <Typography variant="subtitle1">
          Step 3: Extracting Maximum Number
        </Typography>
        <Button variant="contained" onClick={extraHeap}>
          Extra Heap
        </Button>
        <Box>
          <ResultsTable tableData={tableData} />
          <BarChart data={getBarchartData(tableData).reverse()} />
        </Box>
      </Stack>
    </Stack>
  );
}

export default HeapPage;