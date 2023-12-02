/**
 * This is Dijkstra page component for the UI
 */
// import Box from "@mui/material/Box";
// import { DijkstraGraph } from "../Algorithm/DijkstraComponent/DijkstraGraph";

// const Dijkstra = () => {
//   return (
//     <div>
//       <h1>Dijkstra</h1>
//       <Box className="canvas">
//         <DijkstraGraph />
//       </Box>
//     </div>
//   );
// };

// export default Dijkstra;
import React, { useState, useEffect , useRef} from "react";
import { Container, Box, Paper } from "@mui/material";
import { AlgorithmSpace } from "./AlgComponent/algorithmSpace.jsx";
import { SaveInputToLocalStorage } from "./AlgComponent/saveInputToLocalStorage.jsx";
import Common from "./commonComponent/commonControls.js";
import GraphRenderer from "./commonComponent/Canimate";
import Graph from "./DijkstraComponent/Graph"
import AnimationG from "./DijkstraComponent/graphanimate.js"

var data = [[0, 10, 0, 5, 0],[0, 0, 1, 2, 0],[0, 0, 0, 0, 4],
[0, 3, 9, 0, 0],[7, 0, 6, 0, 0]]
var animationData = null
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
          const c = document.getElementById("c" + t.node).getElementsByTagName("ellipse")[0];
          if(t.change=="stroke"){
            
            GraphRenderer.Pathdisplay(c,t.change,"black;blue")
          }else{
            GraphRenderer.Pathdisplay(c,t.change,"white;blue")
          }
        }
        else{
          record[step].node.forEach(element => {
            const c = document.getElementById("c" + element).getElementsByTagName("ellipse")[0];
            GraphRenderer.Pathdisplay(c,"stroke","black;green")
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
        step--
        let t = record[step]
        if(typeof(t.node)=="string"){
          const c = document.getElementById("c" + t.node).getElementsByTagName("ellipse")[0];
          if(t.change=="stroke"){
            GraphRenderer.Pathdisplay(c,t.change,"blue;black")
          }else{
            GraphRenderer.Pathdisplay(c,t.change,"blue;white")
          }
        }
        else{
          record[step].node.forEach(element => {
            const c = document.getElementById("c" + element).getElementsByTagName("ellipse")[0];
            GraphRenderer.Pathdisplay(c,"stroke","green;black")
          });
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
  function reset(){
    step=0
    AnimationG.creategraph(graph,svgRef)
  }

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

  const useHisInput = (input) => {
    // Assuming `createHeap` is a function that takes an input array to create a heap
    data = input
    creategraph(data);
  };

  function dijkstra(){
    graph.dijkstra("A",record);
  }

  /**
   * Validate user input and create matrix for DiGraph
   * @param {*} valuename 
   * @returns 
   */
  function validMatrix(valuename){
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

/**
 * TODO
 * @param {*} event 
 */
const graphKindChange = (event) => {
  const selectedValue = event.target.value;
  setGraphKind(selectedValue);
  setCreateKindVisible(selectedValue !== '');
};

/**
 * TODO
 * @param {*} event 
 */
const createKindChange = (event) => {
  const selectedValue = event.target.value;
  setCreateKind(selectedValue);
};

/**
 * TODO
 * @param {*} valuename 
 * @returns 
 */
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
            <select id="graph-kind" value={graphKind} onChange={graphKindChange}>
              <option value="">--Please choose graph kind--</option>
              <option value="Directed">Directed</option>
              <option value="Undirected">Undirected</option>
            </select>
            {createKindVisible && (
            <>
              <label htmlFor="create-kind">Select Create Kind:</label>
              <select id="create-kind" value={createKind} onChange={createKindChange}>
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
                    let cdata = validMatrix("create");
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
              } catch (error) {
                alert("Error: " + error.message); 
              }
          }}>Create</button>
                </>
              )}
            </>
            )}
          <div id="adjacencyMatrix"></div>
        </div>
        

        <div style={{ flexGrow: 1 }}>
        <div id="graph-container"></div>
          <AlgorithmSpace svgRef={svgRef} width={Common.width} height={Common.height} />
          
          {/* {bstResult && (
            <div>
              <h3>Dijkstra Result:</h3>
              <div>
                <strong>Input:</strong> [{bstResult.input.join(", ")}]
              </div>
              <div>
                <strong>Runtime:</strong> {bstResult.runtime} ms
              </div>
            </div>
          )} */}
        <div style={{ display: 'flex', justifyContent: 'middle', gap: '10px', marginTop: '10px' }}>
        <button onClick={next}>Next Step</button>
        <button onClick={back}>Back</button>
        <button onClick={reset}>Reset</button>
          <button onClick={dijkstra}>Dijkstra</button>
          <button onClick={test}>Test</button>
          </div>
        </div>
        <div><SaveInputToLocalStorage algorithm="dij" inputData={data} useHisInput={useHisInput}/>
          </div>
        

      </div>
      </Box>
    </Container>
  );
};

export default Dijkstra;