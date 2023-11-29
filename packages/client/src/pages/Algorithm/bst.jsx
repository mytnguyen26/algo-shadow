import React, { useState, useEffect, useRef } from "react";
import { Container, Box, Paper } from "@mui/material";
import { AlgorithmSpace } from "./AlgComponent/algorithmSpace";
import AnimationB from "./bstComponent/bstanimate.jsx";
import { AnalyzeRuntime } from './AlgComponent/runtimeAnalysis';
import { SaveInputToLocalStorage } from "./AlgComponent/saveInputToLocalStorage";
import BinarySearchTree from "./bstComponent/bstmethod.js";
import AnimationB from "./bstComponent/bstanimate.jsx";
import Common from "./Common/common";
import GraphRenderer from "../../components/GraphRenderer.js";
import BSTConcreteStrategy from "../../components/AlgorithmSolver/BSTConcreteStrategy";

var data = [4, 7, 8, 2, 1, 3, 5, 9];
// const graphData = new GraphData(data)
var record = [];
var tree = null;

const renderer = new GraphRenderer();
import CAnimation from "./Common/Canimate";
var data = [4,7,8,2,1,3,5,9]
var dataset = []
var record = []
var step = 0
var tree = null

function next(){
  if(step>=record.length)
      {
        alert("Animation is end!")
      }
      else
      {
        if(typeof(record[step].e1) == "undefined"){
          const c = document.getElementById("c" + record[step]);
          CAnimation.Pathdisplay(c,"fill","white;blue")
          step++
        }else{
          step = Common.nextStep(step, record)
        }
      }
}

function back(){
  if(step<1)
  {
    alert("This is the first step!")
  }
  else
  {
    if(typeof(record[step-1].e1) == "undefined"){
      step--
      const c = document.getElementById("c" + record[step]);
      CAnimation.Pathdisplay(c,"fill","blue;white")
    }
    else{
      step = Common.back(step, record)
    }
  }
}

function reset(){
  step = 0
  dataset.forEach(element => {
    AnimationB.Pathdisappear(element.position)
  })
}

function Inorder(){
  reset()
  record = tree.inOrderTraverse()
  console.log(record)
}

function Preorder(){
  reset()
  record = tree.preOrderTraverse()  
}

function Postorder(){
  reset()
  record = tree.postOrderTraverse()
}

function Searchbst(sdata){
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
   * TODO
   */
  function createBST() {
    tree = new BSTConcreteStrategy(); // might need to change this to singleton
    renderer.solverStrategy = tree;
    const result = renderer.create(data);
    setBstResult(result); // Update state
  }

  /**
   * TODO
   * @param {*} idata
   */
  function insertBST() {
    try {
      let idata = Common.validOneData("insert");
      renderer.insert(idata);
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
      record = renderer.delete(ddata, index);
    } catch (error) {
      alert("Error: " + error.message); // 输出错误消息
    }
  }

  function test() {
    console.log(record[0].e1);
    //AnimationB.addGradients(dataset,svgRef)
  }

  function inOrder() {
    renderer.reset();
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

  function nextStep() {
    renderer.nextStep();
  }

  function back() {
    renderer.back();
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
                // need to keep this if we want to render test data first
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
            <button id="isubmit" onClick={insertBST}>
              Insert
            </button>
            <input id="delete" placeholder="Insert a number" />
            <button id="dsubmit" onClick={() => {deleteBST()}}>
              Delete
            </button>
          </div>
        </div>
      </Box>
      <Box className="canvas"><div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input id="create" placeholder="Enter comma separated numbers" />
          <button id="csubmit" onClick={() => {
            try {
              let cdata = Common.validdata("create");
              data = cdata.map(item => Number(item.trim()))
              createbst()
            } catch (error) {
              alert("Error: " + error.message); 
            }
            }}>Create</button>

          <input id="insert" placeholder="Insert a number" />
          <button id="isubmit" onClick={() => {
            try {
              let idata = Common.validonedata("insert");
              insertbst(idata)
            } catch (error) {
              alert("Error: " + error.message); 
            }
            }}>Insert</button>

          <input id="delete" placeholder="Insert a number" />
          <button id="dsubmit" onClick={() => {
            try {
              let ddata = Common.validonedata("delete");
              const index = Common.findinarray(ddata,dataset);
              deletebst(ddata,index)
            } catch (error) {
              alert("Error: " + error.message); 
            }
            }}>Delete</button>

          <input id="search" placeholder="Insert a number" />
          <button id="ssubmit" onClick={() => {
            try {
              let sdata = Common.validonedata("search");
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
            <div
              style={{
                display: "flex",
                justifyContent: "middle",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <button onClick={nextStep}>Next Step</button>
              <button onClick={back}>Back</button>
              <button onClick={reset}>Reset</button>
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
