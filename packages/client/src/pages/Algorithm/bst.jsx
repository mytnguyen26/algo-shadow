import React, { useState, useEffect , useRef} from "react";
import { Container, Box, Paper } from "@mui/material";
import { AlgorithmSpace } from "./AlgComponent/algorithmSpace";
import BinarySearchTree from "./bstComponent/bstmethod.js";
import AnimationB from "./bstComponent/bstanimate.jsx";
import Animation from "./HeapComponent/animate";
import { AnalyzeRuntime } from './AlgComponent/runtimeAnalysis';
import { SaveInputToLocalStorage } from "./AlgComponent/saveInputToLocalStorage";
import Common from "./Common/common";

var data = [4,7,8,2,1,3,5,9]
var dataset = []
var record = []
var step = 0
var tree = null

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

function nextStep(){
  if(step>=record.length)
  {
    alert("Animation is end!")
  }
  else
  {
    if(typeof(record[step].e1) == "undefined"){
      AnimationB.Pathdisplay(record[step]);
    }
    else{
      if(record[step].e1==0){
        Animation.deleteelement(record[step].e2[1],record[step].e2[0])
      }
      else{
        const text1 = document.getElementById("t" + record[step].e1);
        const text2 = document.getElementById("t" + record[step].e2);
        Animation.animateExchange(text1,text2);
      }
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
    if(typeof(record[step].e1) == "undefined"){
      AnimationB.Pathdisappear(record[step]);
    }
    else{
      if(record[step].e1==0){
        Animation.showelement(record[step-1].e2,record[step-1].e1)
      }
      else{
        const text1 = document.getElementById("t" + record[step].e1);
        const text2 = document.getElementById("t" + record[step].e2);
        Animation.animateExchange(text1,text2);
      }
    }
  }
    
}

const BST = () => {
  const svgRef = useRef(null);
  useEffect(() => {
    createbst();
  },[]);

  useEffect(() => {
    SaveInputToLocalStorage
  },[]);

  const [bstResult, setBstResult] = useState(null);

  const useHisInput = (input) => {
    // Assuming `createHeap` is a function that takes an input array to create a heap
    data = input
    createbst();
  };

  function createbst(){
    record = []
    tree = new BinarySearchTree();
    dataset = data.map((value, index) => ({ index: index + 1, value: Number(value), position: 1 }));
      dataset.forEach(element => {
        tree.insert(element, record);
      });
    const result = AnalyzeRuntime('createBST', data, () => {
      AnimationB.createbst(dataset,svgRef);
      return tree;
    });
    setBstResult(result); // Update state
    console.log(dataset)
    console.log(record)
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
    //k delete，t exchange
    tree.delete(ddata,record)
    let t = record[record.length-1]
    if(dataset[k].position!=t){
      record.push({
        e1: t,
        e2: dataset[k].position
      })
    }
    record.push({
      e1: 0,
      e2: [t,dataset[k].position]
    })
    data.splice(dataset[k].index-1, 1); 
  }

  function test(){
    console.log(record[0].e1)
    //AnimationB.addGradients(dataset,svgRef)
  }

  return (
    <Container maxWidth="md">
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
        </div>

        <div style={{ flexGrow: 1 }}>
          <AlgorithmSpace svgRef={svgRef} width={Common.width} height={Common.height} />

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
        <div><SaveInputToLocalStorage algorithm="bst" inputData={data} useHisInput={useHisInput}/>
          </div>
        

      </div>
      </Box>
    </Container>
  );
};

export default BST;