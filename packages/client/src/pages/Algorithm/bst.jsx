import React, { useState, useEffect , useRef} from "react";
import { Container, Box, Paper } from "@mui/material";
import { AlgorithmSpace } from "./AlgComponent/algorithmSpace";
import { ControlArea } from "./AlgComponent/controlArea";
import BinarySearchTree from "./bstComponent/bstmethod.js";
import AnimationB from "./bstComponent/bstanimate.jsx";
import Animation from "./HeapComponent/animate";
import Common from "./Common/common";

var data = [4,7,8,2,1,3,5,9]
var dataset = []
var record = []
var step = 0
var tree = null
var exchange = []
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
    AnimationB.Pathdisappear(dataset[element-1].position)
  })
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

function nextStep(){
  if(step>=record.length)
  {
    alert("AnimationB is end!")
  }
  else
  {
    if(record[step]=="e"){
      const text1 = document.getElementById("t" + exchange[0]);
      const text2 = document.getElementById("t" + exchange[1]);
      Animation.animateExchange(text1,text2);
    }
    else if(record[step]<0){
      Animation.deleteelement(exchange[1],exchange[0])
      console.log("delete value:"+dataset[-record[step]-1].value)
    }
    else{
      AnimationB.Pathdisplay(dataset[record[step]-1].position);
    }
    step++
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
    if(record[step]=="e"){
      const text1 = document.getElementById("t" + exchange[0]);
      const text2 = document.getElementById("t" + exchange[1]);
      Animation.animateExchange(text1,text2);
    }
    else if(record[step]<0){
      Animation.showelement(exchange[1],exchange[0])
    }
    else{
      AnimationB.Pathdisappear(dataset[record[step]-1].position);
    }
  }
    
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
    AnimationB.createbst(dataset,svgRef);
  }

  function insertbst(idata){
    record = []
    data.push(Number(idata[0]))
    dataset.push({index:data.length,value:Number(idata[0]),position: 1})
    tree.insert(dataset[data.length-1],record);
    record.push(dataset[data.length-1].index)
    AnimationB.createbst(dataset,svgRef);
  }

  function deletebst(ddata,k){
    record = []
    //k 被删除，i交换
    tree.delete(ddata,record)
    //tree.inOrderTraverse()
    let t = record[record.length-1]
    
    for (var i = 0; i < dataset.length; i++) {
      if (dataset[i].index == t) {
        if(dataset[i].value!=ddata){
          console.log("exchange "+dataset[i].position + " and " +dataset[k].position)
          exchange.push(dataset[i].position)
          exchange.push(dataset[k].position)
          record.push("e")//exchange
        }
        break;
      }
    }
    record.push(-(k+1))//exchange
    data.splice(dataset[i].index-1, 1); 
    console.log(record)
  }

  function test(){
    AnimationB.addGradients(dataset,svgRef)
  }

  return (
    <Container maxWidth="md">
      <Box className="canvas"><div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input id="create" placeholder="Enter comma separated numbers" />
        <button id="csubmit" onClick={() => {
              let cdata = document.getElementById("create").value.split(",");
              if (Common.validdata(cdata)) {
                  data = cdata.map(item => Number(item.trim()))
                  createbst();
              } else {
                  alert("Only numbers and commas can be entered");
              }
          }}>Create</button>
        <input id="insert" placeholder="Insert a number" />
        <button id="isubmit" onClick={() => {
              let idata = document.getElementById("insert").value.split(",");
              if (validdata(idata)&& idata.length === 1) {
                  insertbst(idata);
              } else {
                  alert("Only numbers and commas can be entered");
              }
          }}>Insert</button>
          <input id="delete" placeholder="Insert a number" />
        <button id="dsubmit" onClick={() => {
              let ddata = document.getElementById("delete").value.split(",");
              let t = 0;
              if (validdata(ddata)&& ddata.length === 1) {
                for (var i = 0; i < dataset.length; i++) {
                  if (dataset[i].value == ddata[0]) {
                      deletebst(ddata[0],i);
                      t = 1;
                      break;
                  }
                }
                if (t == 0) {
                    alert(ddata[0] + " is not in heap");
                }
              } else {
                  alert("Only numbers and commas can be entered");
              }
          }}>delete</button>
        </div>
        <div style={{ flexGrow: 1 }}>
          <AlgorithmSpace svgRef={svgRef} width={Common.width} height={Common.height} />
          <div style={{ display: 'flex', justifyContent: 'middle', gap: '10px', marginTop: '10px' }}>
          <button onClick={Inorder}>Inorder</button>
          <button onClick={Preorder}>Preorder</button>
          <button onClick={Postorder}>Postorder</button>
          </div>
        <div style={{ display: 'flex', justifyContent: 'middle', gap: '10px', marginTop: '10px' }}>
          <button onClick={nextStep}>Next Step</button>
          <button onClick={back}>Back</button>
          <button onClick={reset}>Reset</button>
          <button onClick={test}>Test</button>
          </div>
        </div>

        

      </div>
      </Box>
    </Container>
  );
};

export default BST;