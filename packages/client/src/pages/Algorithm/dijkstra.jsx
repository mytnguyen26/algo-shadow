import React, { useState, useEffect , useRef} from "react";
import { Container, Box, Paper } from "@mui/material";
import { AlgorithmSpace } from "./AlgComponent/algorithmSpace.jsx";
import { SaveInputToLocalStorage } from "./AlgComponent/saveInputToLocalStorage.jsx";
import Common from "./Common/common";
import Graph from "./DijkstraComponent/Graph"
import AnimationG from "./DijkstraComponent/graphanimate.js"
var data = [[0, 10, 0, 5, 0],[0, 0, 1, 2, 0],[0, 0, 0, 0, 4],
[0, 3, 9, 0, 0],[7, 0, 6, 0, 0]]
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
  const [graphKind, setGraphKind] = useState('');
  const [createKindVisible, setCreateKindVisible] = useState(false);
  const [createKind, setCreateKind] = useState('');
  const [createData, setCreateData] = useState('');

  const svgRef = useRef(null);
  useEffect(() => {
    creategraph(data);
  },[]);

  useEffect(() => {
    SaveInputToLocalStorage
  },[]);

  function creategraph(cdata){
    step = 0
    graph = new Graph();
    data = cdata
    if(createKind === 'EdgeList'){
      graph.fromEdgeList(cdata,graphKind)
    }else{
      graph.fromAdjacencyMatrix(cdata,graphKind)
    }
    AnimationG.creategraph(graph,svgRef)
    graph.displayAdjacencyMatrix();
  }

  function test(){
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

  function dijkstra(){
    graph.dijkstra("A",record);
  }


  function validmatrix(valuename){
    let tdata = document.getElementById(valuename).value
    // Split the input into rows based on line breaks
    const rows = tdata.trim().split('\n');

    // Validate that the matrix is not empty
    if (rows.length === 0) {
        throw new Error("Empty matrix");
    }

    const numNodes = rows.length;
    const matrix = [];

    // Validate and parse each row
    for (let i = 0; i < numNodes; i++) {
        const row = rows[i].trim().split(/\s+/);

        // Validate that the number of columns matches the number of rows
        if (row.length !== numNodes) {
            throw new Error("Number of columns doesn't match the number of rows");
        }
        // Parse and validate each entry in the row
        const parsedRow = row.map(entry => {
            const value = parseInt(entry);
            if (isNaN(value)) {
                throw new Error(`Invalid matrix entry: ${entry}`);
            }
            return value;
        });

        matrix.push(parsedRow);
    }
    return matrix
  }

  function validateGraphKind() {
    const selectedValue = document.getElementById("graph-kind").value
    if (selectedValue === '') {
      throw new Error("Please choose a graph kind.");
    }
    return selectedValue
}

const GraphKindChange = (event) => {
  const selectedValue = event.target.value;
  setGraphKind(selectedValue);
  setCreateKindVisible(selectedValue !== '');
};

const CreateKindChange = (event) => {
  const selectedValue = event.target.value;
  setCreateKind(selectedValue);
};

const validateEdgeList = (valuename) => {
  let tdata = document.getElementById(valuename).value
  const lines = tdata.split('\n');
  const edgeList = [];
  // Validate each line
  for (const line of lines) {
    // Trim and split each line into nodes and weight
    const components = line.trim().split(/\s+/);

    // Check if there are exactly three components on each line
    if (components.length !== 3) {
      throw new Error('Invalid edge list with weights. Each line should contain exactly source node, target node, and weight.');
    }

    const [sourceNode, targetNode, weight] = components;

    // Optionally, you can check if the nodes and weight are valid according to your requirements
    // For simplicity, this example assumes any non-empty string is a valid node, and the weight is a valid number
    if (!sourceNode.trim() || !targetNode.trim() || isNaN(Number(weight))) {
      throw new Error('Invalid component in the edge list with weights. Nodes should be non-empty strings, and the weight should be a valid number.');
    }else{
      edgeList.push({
        node1: sourceNode.trim(),
        node2: targetNode.trim(),
        weight: Number(weight)
    });
    }
  }
  return edgeList
};

  return (
    <Container maxWidth="md">
      <Box className="canvas">
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label>Select Graph Kind:</label>
            <select id="graph-kind" value={graphKind} onChange={GraphKindChange}>
              <option value="">--Please choose graph kind--</option>
              <option value="Directed">Directed</option>
              <option value="Undirected">Undirected</option>
            </select>
            {createKindVisible && (
            <>
              <label htmlFor="create-kind">Select Create Kind:</label>
              <select id="create-kind" value={createKind} onChange={CreateKindChange}>
                <option value="">--Please choose create kind--</option>
                <option value="AdjacencyMatrix">Adjacency Matrix</option>
                <option value="EdgeList">Edge List</option>
              </select>

              {createKind === 'AdjacencyMatrix' && (
              <>
                <label htmlFor="create">Enter Adjacency Matrix:</label>
                <textarea id="create" rows="5" placeholder="Enter comma-separated numbers"></textarea>
                <button id="csubmit" onClick={() => {
                  try {
                    let cdata = validmatrix("create");
                    creategraph(cdata)
                  } catch (error) {
                    alert("Error: " + error.message); 
                  }
                }}>Create</button>
              </>
            )}
              {createKind === 'EdgeList' && (
                <>
                  <label htmlFor="create">Enter Edge List:</label>
                  <textarea id="create" rows="5" placeholder="Enter edge pairs"></textarea>
                  <button id="csubmit" onClick={() => {
              try {
                let cdata = validateEdgeList("create");
                creategraph(cdata)
                // graph.fromAdjacencyMatrix(cdata,validateGraphKind())
                // AnimationG.creategraph(graph,svgRef)
              } catch (error) {
                alert("Error: " + error.message); 
              }
          }}>Create</button>
                </>
              )}
            </>
            )}

        {/* <input id="search" placeholder="Insert a number" />
        <button id="ssubmit" onClick={() => {
          try {
            let sdata = Common.validonedata("search");
            Searchbst(sdata)
          } catch (error) {
            alert("Error: " + error.message); 
          }
          }}>Search</button> */}
          <div id="adjacencyMatrix"></div>
        </div>
        

        <div style={{ flexGrow: 1 }}>
        <div id="graph-container"></div>
          <AlgorithmSpace svgRef={svgRef} width={Common.width} height={Common.height} />
          
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