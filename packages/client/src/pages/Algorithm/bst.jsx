import React, { useState, useEffect , useRef} from "react";
import { Container, Box, Paper } from "@mui/material";
import { AlgorithmSpace } from "./AlgComponent/algorithmSpace";
import { ControlArea } from "./AlgComponent/controlArea";
import BinarySearchTree from "./bstComponent/bstmethod.js";
import Animation from "./bstComponent/bstanimate.jsx";

const width = 900;
const height = 300;
var data = [4,7,8,2,1,3,5,9]
var dataset = []
var record = []
var step = 0
var tree = null

function validdata(tdata){
  for (const ele of tdata) {
    if (isNaN(ele)) {
      return false; // Return false if any element is not a valid number
    }
  }
  return true
}

function datatran(data){
  dataset = []
  for (let i = 1; i <= data.length; ++i) {
    dataset[i-1] = { index: i, value: Number(data[i-1]),position: 1 };
  }
  return dataset
}

function reset(){
  step = 0
  dataset.forEach(element => {
    //console.log(element.position)
    Animation.Pathdisappear(element.position)
  })
}

function nextStep(){
  if(step>=record.length)
    {
      alert("animation end")
    }
    else{
      if(record[step]=='i'){//insert

      }
      else{
        Animation.Pathdisplay(dataset[record[step]-1].position) 
        step++ 
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
    step--
    Animation.Pathdisappear(dataset[record[step]-1].position) 
  }
}

function Inorder(){
  reset()
  record = tree.inOrderTraverse()
}

function Preorder(){
  reset()
  record = tree.preOrderTraverse()
}

function Postorder(){
  reset()
  record = tree.postOrderTraverse()
}

const BST = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    createbst();
  },[]);

  function createbst(){
    record = []
    tree = new BinarySearchTree();
    datatran(data);
    dataset.forEach(element => {
      tree.insert(element, record);
    });
    Animation.createbst(dataset,svgRef);
  }

  function insertbst(idata){
    record = []
    data.push(Number(idata[0]))
    dataset.push({index:data.length,value:Number(idata[0]),position: 1})
    tree.insert(dataset[data.length-1],record);
    record.push(dataset[data.length-1].index)
    Animation.createbst(dataset,svgRef);
  }

  return (
    <Container maxWidth="md">
      <Box className="canvas">
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input id="create" placeholder="Enter comma separated numbers" />
        <button id="csubmit" onClick={() => {
              let cdata = document.getElementById("create").value.split(",");
              if (validdata(cdata)) {
                  data = cdata.map(item => Number(item.trim()))
                  createbst();
              } else {
                  alert("Only numbers and commas can be entered");
              }
          }}>Create</button>
        <input id="insert" placeholder="Insert a number" />
        <button id="isubmit" onClick={() => {
              let idata = document.getElementById("insert").value.split(",");
              if (validdata(idata)) {
                  insertbst(idata);
              } else {
                  alert("Only numbers and commas can be entered");
              }
          }}>Insert</button>
        </div>
        <div style={{ flexGrow: 1 }}>
          <svg ref={svgRef} width={width} height={height}></svg>
          <div style={{ display: 'flex', justifyContent: 'middle', gap: '10px', marginTop: '10px' }}>
          <button onClick={Inorder}>Inorder</button>
          <button onClick={Preorder}>Preorder</button>
          <button onClick={Postorder}>Postorder</button>
          </div>
        <div style={{ display: 'flex', justifyContent: 'middle', gap: '10px', marginTop: '10px' }}>
          <button onClick={nextStep}>Next Step</button>
          <button onClick={back}>Back</button>
          <button onClick={reset}>Reset</button>
          <button onClick={reset}>Final Bst</button>
          </div>
        </div>

      </div>
      </Box>
    </Container>
  );
};

export default BST;