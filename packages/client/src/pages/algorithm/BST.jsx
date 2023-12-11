/**
 * TODO
 */
import React, { useEffect, useRef } from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { AlgorithmSpace } from "./algo-component/AlgorithmSpace.jsx";
import { AnalyzeRuntime } from "../../utils/algorithm-solver/runtimeAnalysis.js";
import { SaveInputToLocalStorage } from "./algo-component/SaveInputToLocalStorage.jsx";
import BSTConcreteStrategy from "../../utils/algorithm-solver/bstSolver.js";
import Common from "../../utils/renderer/common";
import { TreeAnimationData, Node } from "../../utils/renderer/animationData.js";
import TreeGraphRenderer from "../../utils/renderer/treeRenderer.js";
import ResultsTable from "./algo-component/TableCreater.jsx";
import { getBarchartData } from "../../utils/barchart-analyze/getBarchartData.js";
import { BarChart } from "./analyze-graph/BarChart.jsx";
import useTableData from "./algo-component/useTableData.jsx";
import Button from "@mui/material/Button";

let data = [5, 2, 9, 7, 8, 6, 1, 3, 10];
let animationData = null;
let record = []; // this array saves all animation steps that needs to happen
// allow users to have next and back functionality
let step = 0;
let tree = null;

function back() {
  if (step < 1) {
    alert("This is the first step!");
  } else {
    if (typeof record[step - 1].e1 == "undefined") {
      step--;
      const c = document.getElementById("c" + record[step]);
      TreeGraphRenderer.pathDisplay.pathDisplay(c, "fill", "blue;white");
    } else {
      step = Common.back(step, record);
    }
  }
}

function reset() {
  step = 0;
  animationData.dataset.forEach((element) => {
    //TreeGraphRenderer.Pathdisappear(element.position)
    const c = document.getElementById("c" + element.position);
    TreeGraphRenderer.pathDisplay(c, "fill", "blue;white");
  });
}

function inOrder() {
  reset();
  record = tree.inOrderTraverse();
}

function preOrder() {
  reset();
  record = tree.preOrderTraverse();
}

function postOrder() {
  reset();
  record = tree.postOrderTraverse();
}

const BSTPage = () => {
  const { tableData, addTableRow } = useTableData("bstResults");

  const svgRef = useRef(null);
  useEffect(() => {
    createBST();
  }, []);

  useEffect(() => {
    SaveInputToLocalStorage;
  }, []);

  const useHisInput = (input) => {
    // Assuming `createHeap` is a function that takes an input array to create a heap
    data = input;
    createBST();
  };

  function searchBST(sdata) {
    record = [];
    reset();

    let startTime = performance.now(); // Start the timer
    let node = tree.search(sdata, record);
    let endTime = performance.now(); // end the timer
    let nodePosition = record[record.length - 1] - 1;

    addTableRow({
      operation: "Search a node",
      input: sdata,
      output: "Node Position " + nodePosition,
      runtime: endTime - startTime,
    });
  }

  function getBSTValues(node) {
    const values = [];

    // In-order traversal to collect values
    function inOrderTraverse(node) {
      if (node !== null) {
        inOrderTraverse(node.left);
        const { index, value, position } = node.nodeData;
        values.push({ index, value, position });
        inOrderTraverse(node.right);
      }
    }

    inOrderTraverse(node);
    return values;
  }

  function next() {
    if (step >= record.length) {
      TreeGraphRenderer.renderGraph(animationData, svgRef);
      createBST();
      alert("Animation ends!");
    } else {
      if (typeof record[step].e1 == "undefined") {
        const c = document.getElementById("c" + record[step]);
        TreeGraphRenderer.pathDisplay(c, "fill", "white;blue");
        step++;
      } else {
        step = Common.next(step, record);
      }
    }
  }

  function createBST() {
    record = [];
    const result = AnalyzeRuntime("createBST", data, () => {
      tree = new BSTConcreteStrategy();
      animationData = new TreeAnimationData(data, "position");
      animationData.dataset.forEach((element) => {
        tree.insert(element, record);
      });
    });

    // Get the values from the BST
    const bstValues = getBSTValues(tree.root);
    TreeGraphRenderer.renderGraph(animationData, svgRef);

    addTableRow({
      operation: "Create new tree",
      input: result.input,
      output: bstValues,
      runtime: result.runtime,
    });

    reset();
  }

  function insertBST(idata) {
    record = [];
    reset();

    let startTime = performance.now(); // Start the timer

    data.push(Number(idata[0]));
    animationData.push(new Node(data.length, idata));

    tree.insert(animationData.dataset[data.length - 1], record);

    let endTime = performance.now(); // End the timer

    console.log(`Insert operation took ${endTime - startTime} milliseconds.`);

    let insertedNodePosition =
      animationData.dataset[data.length - 1].position - 1;

    TreeGraphRenderer.renderGraph(animationData, svgRef);

    addTableRow({
      operation: "Insert new node",
      input: idata,
      output: "Node Position " + insertedNodePosition,
      runtime: endTime - startTime,
    });
  }

  function deleteBST(dData, index) {
    record = [];
    reset();
    let deletedNodePosition = [];
    let startTime = performance.now(); // Start the timer

    // index delete，prevSuccessorNodePosition exchange
    tree.delete(dData, deletedNodePosition, record);

    let endTime = performance.now(); // End the timer

    let prevSuccessorNodePosition = record[record.length - 1]; // exchange position to position found at index
    if (animationData.dataset[index].position !== prevSuccessorNodePosition) {
      record.push({
        e1: prevSuccessorNodePosition,
        e2: animationData.dataset[index].position,
      });
    }
    record.push({
      e1: 0,
      e2: [prevSuccessorNodePosition, animationData.dataset[index].position],
    });
    data.splice(animationData.dataset[index].index - 1, 1);
    animationData.dataset.splice(index, 1);
    addTableRow({
      operation: "Delete node",
      input: dData,
      output: "Delete Node initial position " + deletedNodePosition[0],
      runtime: endTime - startTime,
    });
  }

  return (
    <Stack direction="row" gap={3}>
      <Stack gap={2}>
        <TextField
          id="create"
          label="Enter comma separated numbers"
          helperText="example: 1,2,3,4"
        />
        <Button
          id="csubmit"
          variant="contained"
          onClick={() => {
            try {
              let cdata = Common.validData("create");
              data = cdata.map((item) => Number(item.trim()));
              createBST();
            } catch (error) {
              alert("Error: " + error.message);
            }
          }}
        >
          Create BST
        </Button>

        <TextField id="insert" label="Insert a node" helperText="example: 12" />
        <Button
          variant="contained"
          id="isubmit"
          onClick={() => {
            try {
              let idata = Common.validOneData("insert");
              insertBST(idata);
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
              deleteBST(ddata, index);
            } catch (error) {
              alert("Error: " + error.message);
            }
          }}
        >
          Delete Node
        </Button>

        <TextField id="search" label="Search a node" helperText="example: 9" />
        <Button
          variant="contained"
          id="ssubmit"
          onClick={() => {
            try {
              let sdata = Common.validOneData("search");
              searchBST(sdata);
            } catch (error) {
              alert("Error: " + error.message);
            }
          }}
        >
          Search Node
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
        <Typography variant="h5">Traverse the Tree: </Typography>
        <Typography variant="subtitle1">
          Step 1: Pick how do you want to traverse the BST tree
        </Typography>
        <Stack direction="row" justifyContent="center" gap={2}>
          <Button variant="contained" onClick={inOrder}>
            Inorder
          </Button>
          <Button variant="contained" onClick={preOrder}>
            Preorder
          </Button>
          <Button variant="contained" onClick={postOrder}>
            Postorder
          </Button>
        </Stack>
        <Typography variant="subtitle1">Step 2: Run it step by step</Typography>
        <Stack direction="row" justifyContent="center" gap={2}>
          <Button variant="contained" onClick={next}>
            Next Step
          </Button>
          <Button variant="contained" onClick={back}>
            Previous Step
          </Button>
        </Stack>
        <Box>
          <ResultsTable tableData={tableData} />
          <BarChart data={getBarchartData(tableData).reverse()} />
        </Box>
      </Stack>
    </Stack>
  );
};

export default BSTPage;
