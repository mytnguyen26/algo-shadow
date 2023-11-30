import React, { useState, useEffect, useRef } from "react";
import { Container, Box, Paper } from "@mui/material";
import { AlgorithmSpace } from "./AlgComponent/algorithmSpace";
import { AnalyzeRuntime } from "./AlgComponent/analyzeRuntime.jsx";
import { SaveInputToLocalStorage } from "./AlgComponent/saveInputToLocalStorage";
import Common from "./Common/common";
import GraphRenderer from "../../components/GraphRenderer.js";
import BSTConcreteStrategy from "../../components/AlgorithmSolver/BSTConcreteStrategy";
import { Node, TreeAnimationData } from "../../components/AlgorithmSolver/GraphData.js";

var data = [4, 7, 8, 2, 1, 3, 5, 9];
var record = [];
var step = 0;
var tree = null;

const renderer = new GraphRenderer();

// function reset(){
//   step = 0
//   dataset.forEach(element => {
//     AnimationB.Pathdisappear(element.position)
//   })
// }

// function Inorder(){
//   reset()
//   record = tree.inOrderTraverse()
//   console.log(record)
// }

// function Preorder(){
//   reset()
//   record = tree.preOrderTraverse()  
// }

// function Postorder(){
//   reset()
//   record = tree.postOrderTraverse()
// }

function searchBST(sdata){
  record = []
  reset()
  let node = tree.search(sdata,record)
  console.log(node)
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
   * Create a new BST from user input to perform algorithm on
   */
  function createBST() {
    tree = new BSTConcreteStrategy(); // might need to change this to singleton
    renderer.solverStrategy = tree;
    var animationData = new TreeAnimationData(data, "position")
    record = []
    const result = AnalyzeRuntime('createBST', data, () => {
      animationData.dataset.forEach(element => {
        tree.insert(element, record);
      });
      renderer.renderGraph(animationData);
    });
    setBstResult(result); // Update state
  }

  /**
   * TODO
   * @param {*} idata
   */
  function insertBST(data, record) {
    try {
      let idata = Common.validOneData("insert");
      renderer.insert(idata, record);
    } catch (error) {
      alert("Error: " + error.message); // 输出错误消息
    }
  }

  /**
   * TODO
   * @param {*} ddata
   * @param {*} k
   */
  function deleteBST() {
    try {
      let ddata = Common.validOneData("delete");
      const index = Common.findInArray(ddata, renderer.dataset);
      record = renderer.delete(ddata, index, record);
    } catch (error) {
      alert("Error: " + error.message); // 输出错误消息
    }
  }

  function test() {
    console.log(record[0].e1);
    //AnimationB.addGradients(dataset,svgRef)
  }

  function inOrder() {
    renderer.reset(step, record);
    record = tree.inOrderTraverse();
  }

  function preOrder() {
    renderer.reset();
    record = tree.preOrderTraverse();
  }

  function postOrder() {
    renderer.reset();
    record = tree.postOrderTraverse();
  }

  function reset() {
    renderer.reset();
  }

  // function nextStep() {
  //   renderer.nextStep();
  // }

  // function back() {
  //   renderer.back();
  // }

  /**
   * TODO
   */
  function next() {
    if(step>=record.length)
      {
        alert("Animation is end!")
      }
      else
      {
        if(typeof(record[step].e1) == "undefined"){
          const c = document.getElementById("c" + record[step]);
          renderer.pathDisplay(c, "fill", "white;blue")
          step++
        }else{
          step = Common.nextStep(step, record)
        }
      }
  }
  
  /**
   * TODO
   */
  function back() {
    if(step<1)
    {
      alert("This is the first step!")
    }
    else
    {
      if(typeof(record[step-1].e1) == "undefined"){
        step--
        const c = document.getElementById("c" + record[step]);
        renderer.pathDisplay(c, "fill", "blue;white")
      }
      else{
        step = Common.back(step, record)
      }
    }
  }

  return (
    <Container maxWidth="md">
      <Box className="canvas"><div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input id="create" placeholder="Enter comma separated numbers" />
          <button id="csubmit" onClick={() => {
            try {
              let cdata = Common.validData("create");
              data = cdata.map(item => Number(item.trim()))
              createBST()
            } catch (error) {
              alert("Error: " + error.message); 
            }
            }}>Create</button>

          <input id="insert" placeholder="Insert a number" />
          <button id="isubmit" onClick={insertBST}>
            Insert
          </button>

          <input id="delete" placeholder="Insert a number" />
          <button id="dsubmit" onClick={() => {deleteBST()}}>
              Delete
          </button>

          <input id="search" placeholder="Insert a number" />
          <button id="ssubmit" onClick={() => {
            try {
              let sdata = Common.validOneData("search");
              Searchbst(sdata)
            } catch (error) {
              alert("Error: " + error.message); 
            }
            }}>Search</button>
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
              <button onClick={inOrder}>Inorder</button>
              <button onClick={preOrder}>Preorder</button>
              <button onClick={postOrder}>Postorder</button>
            </div>
          </div>
          <div>
            <SaveInputToLocalStorage
              algorithm="bst"
              inputData={data}
              useHisInput={useHisInput}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'middle', gap: '10px', marginTop: '10px' }}>
            <button onClick={next}>Next Step</button>
            <button onClick={back}>Back</button>
            <button onClick={reset}>Reset</button>
            <button onClick={test}>Test</button>
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default BST;
