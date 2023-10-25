import React, { useState, useEffect , useRef} from "react";
import { Container, Box, Paper } from "@mui/material";
import { AlgorithmSpace } from "./AlgComponent/algorithmSpace";
import { ControlArea } from "./AlgComponent/controlArea";
import BinarySearchTree from "./bstComponent/bstmethod";
import Animation from "./bstComponent/bstanimate";

const width = 900;
const height = 300;
var data = [4,7,8,2,1,3,5,9]
var dataset = []
var record = []
var step = 0



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
  record.forEach(element => {
    console.log()
    Animation.Pathdisappear(dataset[element-1].position)
  })
}

const BST = () => {
  const svgRef = useRef(null);

useEffect(() => {
  Animation.createbst(dataset,svgRef);
},[]);
  const tree = new BinarySearchTree();
  datatran(data);
  dataset.forEach(element => {
    tree.insert(element, record);
  });

  
  dataset.forEach(element => {
    console.log(element);
  });

  return (
    <Container maxWidth="md">
      <Box className="canvas">
      <div style={{ flexGrow: 1 }}>
        <svg ref={svgRef} width={width} height={height}></svg>
      </div>
        
      </Box>
    </Container>
  );
};

export default BST;