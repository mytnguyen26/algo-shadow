import React, { useState, useEffect, useRef } from "react";
import { Container, Box, Paper } from "@mui/material";
import { AlgorithmSpace } from "./AlgComponent/algorithmSpace";
import AnimationB from "./bstComponent/bstanimate.jsx";
import { SaveInputToLocalStorage } from "./AlgComponent/saveInputToLocalStorage";
import Common from "./Common/common";
import GraphRenderer from "../../components/GraphRenderer.js";
import BSTConcreteStrategy from "../../components/AlgorithmSolver/BSTConcreteStrategy";

var data = [4, 7, 8, 2, 1, 3, 5, 9];
// const graphData = new GraphData(data)
var dataset = [];
var record = [];
var step = 0;
var tree = null;

const renderer = new GraphRenderer();

function reset() {
  step = 0;
  record.forEach((element) => {
    AnimationB.pathDisappear(dataset[element - 1].position);
  });
}

function Inorder() {
  reset();
  record = tree.inOrderTraverse();
}

function Preorder() {
  reset();
  record = tree.preOrderTraverse();
}

function Postorder() {
  reset();
  record = tree.postOrderTraverse();
}

function nextStep() {
  if (step >= record.length) {
    alert("AnimationB is end!");
  } else {
    if (typeof record[step].e1 == "undefined") {
      AnimationB.pathDisplay(dataset[record[step] - 1].position);
    } else {
      if (record[step].e1 == 0) {
        renderer.deleteElement(record[step - 1].e2, record[step - 1].e1);
      } else {
        const text1 = document.getElementById("t" + record[step].e1);
        const text2 = document.getElementById("t" + record[step].e2);
        renderer.animateExchange(text1, text2);
      }
    }
    step++;
  }
}

function back() {
  if (step < 1) {
    alert("This is the first step!");
  } else {
    step--;
    if (typeof record[step].e1 == "undefined") {
      AnimationB.pathDisappear(dataset[record[step] - 1].position);
    } else {
      if (record[step].e1 == 0) {
        renderer.showElement(record[step - 1].e2, record[step - 1].e1);
      } else {
        const text1 = document.getElementById("t" + record[step].e1);
        const text2 = document.getElementById("t" + record[step].e2);
        renderer.animateExchange(text1, text2);
      }
    }
  }
}

const BST = () => {
  const svgRef = useRef(null);
  renderer.svgRef = svgRef;

  useEffect(() => {
    createBST();
  }, []);

  useEffect(() => {
    SaveInputToLocalStorage;
  }, []);

  const [bstResult, setBstResult] = useState(null);

  const useHisInput = (input) => {
    // Assuming `createHeap` is a function that takes an input array to create a heap
    data = input;
    createBST();
  };

  /**
   * TODO
   */
  function createBST() {
    renderer.solverStrategy = new BSTConcreteStrategy()
    const result = renderer.create(data)
    setBstResult(result) // Update state
  }

  /**
   * TODO
   * @param {*} idata
   */
  function insertBST(idata) {
    record = [];
    data.push(Number(idata[0]));
    dataset.push({ index: data.length, value: Number(idata[0]), position: 1 });
    tree.insert(dataset[data.length - 1], record);
    record.push(dataset[data.length - 1].index);
    renderer.renderGraph(dataset, svgRef);
  }

  /**
   * TODO
   * @param {*} ddata
   * @param {*} k
   */
  function deleteBST(ddata, k) {
    record = [];
    //k 被删除，i交换
    tree.delete(ddata, record);
    //tree.inOrderTraverse()
    let t = record[record.length - 1];
    for (var i = 0; i < dataset.length; i++) {
      if (dataset[i].index == t) {
        if (dataset[i].value != ddata) {
          console.log(
            "exchange " + dataset[i].position + " and " + dataset[k].position,
          );
          record.push({
            e1: dataset[i].position,
            e2: dataset[k].position,
          });
        }
        break;
      }
    }
    record.push({
      e1: 0,
      e2: dataset[k].position,
    });
    data.splice(dataset[i].index - 1, 1);
  }

  function test() {
    console.log(record[0].e1);
    //AnimationB.addGradients(dataset,svgRef)
  }

  return (
    <Container maxWidth="md">
      <Box className="canvas">
        <div style={{ display: "flex" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <input id="create" placeholder="Enter comma separated numbers" />
            <button
              id="csubmit"
              onClick={() => {
                try {
                  let cdata = Common.validData("create");
                  data = cdata.map((item) => Number(item.trim()));
                  createBST();
                } catch (error) {
                  alert("Error: " + error.message); // 输出错误消息
                }
              }}
            >
              Create
            </button>

            <input id="insert" placeholder="Insert a number" />
            <button
              id="isubmit"
              onClick={() => {
                try {
                  let idata = Common.validOneData("insert");
                  insertBST(idata);
                } catch (error) {
                  alert("Error: " + error.message); // 输出错误消息
                }
              }}
            >
              Insert
            </button>

            <input id="delete" placeholder="Insert a number" />
            <button
              id="dsubmit"
              onClick={() => {
                try {
                  let ddata = Common.validOneData("delete");
                  const index = Common.findInArray(ddata, dataset);
                  deleteBST(ddata, index);
                } catch (error) {
                  alert("Error: " + error.message); // 输出错误消息
                }
              }}
            >
              Delete
            </button>
          </div>

          <div style={{ flexGrow: 1 }}>
            <AlgorithmSpace
              svgRef={svgRef}
              width={Common.width}
              height={Common.height}
            />

            {bstResult && (
              <div>
                <h3>BST Result:</h3>
                <div>
                  <strong>Input:</strong> [{bstResult.input.join(", ")}]
                </div>
                <div>
                  <strong>Runtime:</strong> {bstResult.runtime} ms
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
              <button onClick={Inorder}>Inorder</button>
              <button onClick={Preorder}>Preorder</button>
              <button onClick={Postorder}>Postorder</button>
            </div>
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
              <button onClick={test}>Test</button>
            </div>
          </div>
          <div>
            <SaveInputToLocalStorage
              algorithm="bst"
              inputData={data}
              useHisInput={useHisInput}
            />
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default BST;
