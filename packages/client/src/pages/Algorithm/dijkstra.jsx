import React, { useState, useEffect , useRef} from "react";
import { Container, Box, Paper } from "@mui/material";
import { AlgorithmSpace } from "./AlgComponent/algorithmSpace.jsx";
import { SaveInputToLocalStorage } from "./AlgComponent/saveInputToLocalStorage.jsx";
import Common from "./Common/common";
import Graph from "./DijkstraComponent/Graph"
import AnimationG from "./DijkstraComponent/graphanimate.js"
var data = [4,7,8,2,1,3,5,9]
var dataset = []
var record = []
var step = 0
var graph = null
function next(){
  if(step>=record.length)
      {
        alert("Animation is end!")
      }
      else
      {
        let t = record[step]
        if(typeof(t.node)=="string"){
          if(t.change=="stroke"){
            AnimationG.Pathdisplay(t.node,t.change,"black;blue")
          }else{
            AnimationG.Pathdisplay(t.node,t.change,"white;blue")
          }
        }
        else{
          record[step].node.forEach(element => {
            AnimationG.Pathdisplay(element,"stroke","black;green")
          });
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
    if(typeof(record[step-1].e1) == "undefined"){
      step--
      //AnimationB.Pathdisappear(record[step]);
    }
    else{
      step = Common.back(step, record)
    }
  }
}

const Dijkstra = () => {
  const svgRef = useRef(null);
  useEffect(() => {
    creategraph();
    //test()
  },[]);

  useEffect(() => {
    SaveInputToLocalStorage
  },[]);

  function creategraph(){
    step = 0
    graph = new Graph();
    graph.setkind("Directed")
  graph.addNode('A');
  graph.addNode('B');
  graph.addNode('C');
  graph.addNode('D');
  graph.addNode('E');
  
  graph.addEdge('A', 'B', 10);
  graph.addEdge('A', 'D', 5);
  graph.addEdge('B', 'C', 1);
  graph.addEdge('B', 'D', 2);
  graph.addEdge('C', 'E', 4);
  graph.addEdge('D', 'B', 3);
  graph.addEdge('D', 'C', 9);
  graph.addEdge('E', 'A', 7);
  graph.addEdge('E', 'C', 6);

  graph.displayAdjacencyMatrix();
  data = graph.AdjacencyMatrix()
  AnimationG.creategraph(graph,svgRef)

  
   //AnimationG.createg()
  }

  function test(){
    const d = graph.dijkstra("A",record);
  console.log(d)
  console.log(record)
  }

  function dijkstra(){
    const d = graph.dijkstra("A",record);
  console.log(d)
  console.log(record)
   
  //   graph.setkind("Undirected")
  // graph.addNode('A');
  // graph.addNode('B');
  // graph.addNode('C');
  // graph.addNode('D');
  // graph.addNode('E');
  // graph.addNode('F');
  // graph.addNode('G');
  
  // graph.addEdge('A', 'C', 3);
  // graph.addEdge('A', 'F', 2);
  // graph.addEdge('C', 'F', 2);
  // graph.addEdge('C', 'E', 1);
  // graph.addEdge('F', 'E', 3);
  // graph.addEdge('E', 'B', 2);
  // graph.addEdge('C', 'D', 4);
  // graph.addEdge('D', 'B', 1);
  // graph.addEdge('F', 'B', 6);
  // graph.addEdge('F', 'G', 5);
  // graph.addEdge('G', 'B', 2);
  }

  return (
    
    <Container maxWidth="md">
      <Box className="canvas">
        <div style={{ display: 'flex' }}>
        {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
        </div> */}

        <div style={{ flexGrow: 1 }}>
        <div id="graph-container"></div>
          <AlgorithmSpace svgRef={svgRef} width={Common.width} height={Common.height} />
          <div id="adjacencyMatrix"></div>
          {/* {bstResult && (
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
          </div> */}
        <div style={{ display: 'flex', justifyContent: 'middle', gap: '10px', marginTop: '10px' }}>
        <button onClick={next}>Next Step</button>
          {/* 
          <button onClick={back}>Back</button>
          <button onClick={reset}>Reset</button> */}
          <button onClick={dijkstra}>Dijkstra</button>
          <button onClick={test}>Test</button>
          </div>
        </div>
        {/* <div><SaveInputToLocalStorage algorithm="bst" inputData={data} useHisInput={useHisInput}/>
          </div> */}
        

      </div>
      </Box>
    </Container>
  );
};

export default Dijkstra;