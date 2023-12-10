import React, { useState, useEffect, useRef } from "react";
import { Container, Box, Paper, tabScrollButtonClasses } from "@mui/material";
import { AlgorithmSpace } from "./algo-component/AlgorithmSpace.jsx";
import { SaveInputToLocalStorage } from "./algo-component/SaveInputToLocalStorage.jsx";
import Common from "../../utils/common/common";
import DijkstraConcreteStrategy from "../../utils/algorithm-solver/dijkstraSolver.js";
import DigraphRenderer from "../../utils/common/digraphRenderer.js";
import { dark } from "@mui/material/styles/createPalette.js";

let data = [
  [0, 10, 0, 5, 0],
  [0, 0, 1, 2, 0],
  [0, 0, 0, 0, 4],
  [0, 3, 9, 0, 0],
  [7, 0, 6, 0, 0],
];
let record = [];
let step = 0;
let graph = null;
function next() {
  if (step >= record.length) {
    //console.log(record[step-1].node)
    DigraphRenderer.wordcolor(record[step - 1].node);
    alert("Animation is end!");
  } else {
    let t = record[step];
    if (typeof t.node == "string") {
      if (t.node.indexOf("edge") != -1) {
        const p = document
          .getElementById(t.node)
          .getElementsByTagName("path")[0];
        DigraphRenderer.pathDisplay(p, t.change, "#000000;#006699");
      } else {
        const c = document
          .getElementById("c" + t.node)
          .getElementsByTagName("ellipse")[0];
        if (t.change == "stroke") {
          DigraphRenderer.pathDisplay(c, t.change, "#99CCFF;#006699");
        } else {
          DigraphRenderer.pathDisplay(c, t.change, "#FFFFFF;#006699");
        }
      }
    } else {
      record[step].node.forEach((element) => {
        const c = document
          .getElementById("c" + element)
          .getElementsByTagName("ellipse")[0];
        DigraphRenderer.pathDisplay(c, "stroke", "#000000;#99CCFF");
      });
    }
    step++;
  }
}

function back() {
  if (step < 1) {
    alert("This is the first step!");
  } else {
    step--;
    let t = record[step];

    if (typeof t.node == "string") {
      if (t.node.indexOf("edge") != -1) {
        const p = document
          .getElementById(t.node)
          .getElementsByTagName("path")[0];
        DigraphRenderer.pathDisplay(p, t.change, "#006699;#000000");
      } else {
        const c = document
          .getElementById("c" + t.node)
          .getElementsByTagName("ellipse")[0];
        if (t.change == "stroke") {
          DigraphRenderer.pathDisplay(c, t.change, "#006699;#99CCFF");
        } else {
          DigraphRenderer.pathDisplay(c, t.change, "#006699;#FFFFFF");
        }
      }
    } else {
      record[step].node.forEach((element) => {
        const c = document
          .getElementById("c" + element)
          .getElementsByTagName("ellipse")[0];
        DigraphRenderer.pathDisplay(c, "stroke", "#99CCFF;#000000");
      });
    }
  }
}

const Dijkstra = () => {
  const [graphKind, setGraphKind] = useState("");
  const [createKindVisible, setCreateKindVisible] = useState(false);
  const [createKind, setCreateKind] = useState("");
  const [p_adj] = useState("0 1\n1 0");
  const [p_edge] = useState("A B 3\nC B 2");

  const svgRef = useRef(null);
  useEffect(() => {
    creategraph(data);
  }, []);

  function reset() {
    step = 0;
    DigraphRenderer.renderGraph(graph, svgRef);
  }

  function creategraph(cdata) {
    step = 0;
    graph = new DijkstraConcreteStrategy();
    data = cdata;
    if (createKind === "EdgeList") {
      graph.fromEdgeList(cdata, graphKind);
    } else {
      graph.fromAdjacencyMatrix(cdata, graphKind);
    }
    DigraphRenderer.renderGraph(graph, svgRef);
    DigraphRenderer.displayAdjacencyMatrix(graph.nodes, graph.edges);
    // graph.displayAdjacencyMatrix();
  }

  const useHisInput = (input) => {
    // Assuming `createHeap` is a function that takes an input array to create a heap
    data = input;
    creategraph(data);
  };

  function run() {
    let d = graph.run("A", record);
    DigraphRenderer.wordcolor("A");
    DigraphRenderer.displaydistance(d);
    console.log(record);
  }

  function validmatrix(valuename) {
    let tdata = document.getElementById(valuename).value;
    // Split the input into rows based on line breaks
    const rows = tdata.trim().split("\n");

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
      const parsedRow = row.map((entry) => {
        const value = parseInt(entry);
        if (isNaN(value)) {
          throw new Error(`Invalid matrix entry: ${entry}`);
        }
        return value;
      });

      matrix.push(parsedRow);
    }
    return matrix;
  }

  const GraphKindChange = (event) => {
    const selectedValue = event.target.value;
    setGraphKind(selectedValue);
    setCreateKindVisible(selectedValue !== "");
  };

  const CreateKindChange = (event) => {
    const selectedValue = event.target.value;
    setCreateKind(selectedValue);
  };

  const validateEdgeList = (valuename) => {
    let tdata = document.getElementById(valuename).value;
    const lines = tdata.split("\n");
    const edgeList = [];
    // Validate each line
    for (const line of lines) {
      // Trim and split each line into nodes and weight
      const components = line.trim().split(/\s+/);

      // Check if there are exactly three components on each line
      if (components.length !== 3) {
        throw new Error(
          "Invalid edge list with weights. Each line should contain exactly source node, target node, and weight."
        );
      }

      const [sourceNode, targetNode, weight] = components;

      // Optionally, you can check if the nodes and weight are valid according to your requirements
      // For simplicity, this example assumes any non-empty string is a valid node, and the weight is a valid number
      if (!sourceNode.trim() || !targetNode.trim() || isNaN(Number(weight))) {
        throw new Error(
          "Invalid component in the edge list with weights. Nodes should be non-empty strings, and the weight should be a valid number."
        );
      } else {
        edgeList.push({
          node1: sourceNode.trim(),
          node2: targetNode.trim(),
          weight: Number(weight),
        });
      }
    }

    return edgeList;
  };

  return (
    <Container maxWidth="md">
      <Box className="canvas">
        <div style={{ display: "flex" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label>Select Graph Kind:</label>
            <select
              id="graph-kind"
              value={graphKind}
              onChange={GraphKindChange}
            >
              <option value="">--Please choose graph kind--</option>
              <option value="Directed">Directed</option>
              <option value="Undirected">Undirected</option>
            </select>

            {createKindVisible && (
              <>
                <label htmlFor="create-kind">Select Create Kind:</label>
                <select
                  id="create-kind"
                  value={createKind}
                  onChange={CreateKindChange}
                >
                  <option value="">--Please choose create kind--</option>
                  <option value="AdjacencyMatrix">Adjacency Matrix</option>
                  <option value="EdgeList">Edge List</option>
                </select>

                {createKind === "AdjacencyMatrix" && (
                  <>
                    <label htmlFor="create">Enter Adjacency Matrix:</label>

                    <textarea
                      id="create"
                      rows="5"
                      placeholder={p_adj}
                    ></textarea>
                    <button
                      id="csubmit"
                      onClick={() => {
                        try {
                          let cdata = validmatrix("create");
                          creategraph(cdata);
                        } catch (error) {
                          alert("Error: " + error.message);
                        }
                      }}
                    >
                      Create
                    </button>
                  </>
                )}
                {createKind === "EdgeList" && (
                  <>
                    <label htmlFor="create">Enter Edge List:</label>
                    <textarea
                      id="create"
                      rows="5"
                      placeholder={p_edge}
                    ></textarea>

                    <button
                      id="csubmit"
                      onClick={() => {
                        try {
                          let cdata = validateEdgeList("create");
                          creategraph(cdata);
                        } catch (error) {
                          alert("Error: " + error.message);
                        }
                      }}
                    >
                      Create
                    </button>
                  </>
                )}
              </>
            )}
            <div id="distance"></div>
            <div id="adjacencyMatrix"></div>
          </div>

          <div style={{ flexGrow: 1 }}>
            <div id="graph-container"></div>
            <AlgorithmSpace
              svgRef={svgRef}
              width={Common.width}
              height={Common.height}
            />

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
            <div
              style={{
                display: "flex",
                justifyContent: "middle",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <button onClick={next}>Next Step</button>
              <button onClick={back}>Back</button>
              <button onClick={reset}>Reset</button>
              <button onClick={run}>Fast Forward</button>
            </div>
          </div>
          <div>
            <SaveInputToLocalStorage
              algorithm="dij"
              inputData={data}
              useHisInput={useHisInput}
            />
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default Dijkstra;
