import * as d3 from "d3";
import Viz from "viz.js";
import { Module, render } from "viz.js/full.render";
import TreeGraphRenderer from "./treeRenderer.js";

class DigraphRenderer extends TreeGraphRenderer {
  static renderGraph(graph, svgRef) {
    const viz = new Viz({ Module, render });

    let graphvizCode = `
        digraph G {
            rankdir=LR;
            node [penwidth=2, pencolor=white, shape=circle];`;
    if (graph.kind === "Undirected") {
      graphvizCode += `edge [dir="none"];`;
    } else {
      graphvizCode += `edge [dir=""];`;
    }
    const nodes = graph.nodes;
    const edges = graph.getEdgeList();

    edges.forEach((e) => {
      graphvizCode +=
        e.node1 + ` -> ` + e.node2 + ` [label="` + e.weight + `"];`;
    });
    nodes.forEach((n) => {
      graphvizCode += n + ` [id="c` + n + `"]`;
    });

    graphvizCode = graphvizCode + `}`;
    const svgContainer = d3.select(svgRef.current);
    svgContainer.selectAll("*").remove();
    viz
      .renderString(graphvizCode)
      .then((result) => {
        svgContainer.html(result);
        svgContainer
          .selectAll("text")
          .attr("font-weight", "bold")
          .attr("text-anchor", "middle")
          .attr("font-family", "sans-serif")
          .attr("text-size", "20px") //font-family="sans-serif"
          .attr("stroke", "white")
          .attr("stroke-weight", "0.5px");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static displayAdjacencyMatrix(nodes, edges) {
    const matrixDiv = document.getElementById("adjacencyMatrix");
    matrixDiv.innerHTML = "";
    const table = document.createElement("table");
    // Header row
    const headerRow = document.createElement("tr");
    headerRow.appendChild(DigraphRenderer.createTableCell_(""));
    for (const node of nodes) {
      headerRow.appendChild(DigraphRenderer.createTableCell_(node));
    }
    table.appendChild(headerRow);

    // Data rows
    for (const node1 of nodes) {
      const row = document.createElement("tr");
      row.appendChild(DigraphRenderer.createTableCell_(node1));
      for (const node2 of nodes) {
        const edge = edges.get(node1).find((e) => e.node === node2);
        row.appendChild(
          DigraphRenderer.createTableCell_(edge ? edge.weight : "0")
        );
      }
      table.appendChild(row);
    }

    matrixDiv.appendChild(table);
  }

  static displayDistance(distance) {
    const matrixDiv = document.getElementById("distance");
    matrixDiv.innerHTML = "";
    const table = document.createElement("table");
    // Header row
    const headerRow = document.createElement("tr");
    for (let key of distance.keys()) {
      headerRow.appendChild(DigraphRenderer.createTableCell_(key));
    }
    table.appendChild(headerRow);
    const row = document.createElement("tr");
    // Data rows
    distance.forEach((element) => {
      row.appendChild(DigraphRenderer.createTableCell_(element));
    });
    table.appendChild(row);
    matrixDiv.appendChild(table);
  }

  static createTableCell_(content) {
    const cell = document.createElement("td");
    cell.textContent = content;
    return cell;
  }

  static setWordColor(node) {
    const w = document
      .getElementById("c" + node)
      .getElementsByTagName("text")[0];
    w.setAttribute("fill", "orange");
  }
}

export default DigraphRenderer;
