import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import { Button, Stack } from "@mui/material";
import Graph from "./algorithm.js";

export const DijkstraGraph = () => {
  const [nodes, setNodes] = useState([
    {
      id: "A",
      x: 50,
      y: 50,
      weight: 0,
      isStart: true,
      isFinish: false,
      distance: Infinity,
      isVisited: false,
      previousNode: null,
    },
    {
      id: "B",
      x: 400,
      y: 50,
      weight: 0,
      isStart: true,
      isFinish: false,
      distance: Infinity,
      isVisited: false,
      previousNode: null,
    },
    {
      id: "C",
      x: 150,
      y: -50,
      weight: 0,
      isStart: true,
      isFinish: false,
      distance: Infinity,
      isVisited: false,
      previousNode: null,
    },
    {
      id: "D",
      x: 300,
      y: -50,
      weight: 0,
      isStart: true,
      isFinish: false,
      distance: Infinity,
      isVisited: false,
      previousNode: null,
    },
    {
      id: "E",
      x: 250,
      y: 50,
      weight: 0,
      isStart: true,
      isFinish: false,
      distance: Infinity,
      isVisited: false,
      previousNode: null,
    },
    {
      id: "F",
      x: 150,
      y: 150,
      weight: 0,
      isStart: true,
      isFinish: false,
      distance: Infinity,
      isVisited: false,
      previousNode: null,
    },
    {
      id: "G",
      x: 300,
      y: 150,
      weight: 0,
      isStart: false,
      isFinish: true,
      distance: Infinity,
      isVisited: false,
      previousNode: null,
    },
  ]);

  const [links, setLinks] = useState([
    { source: "A", target: "C", weight: 3 },
    { source: "A", target: "F", weight: 2 },
    { source: "C", target: "F", weight: 2 },
    { source: "C", target: "E", weight: 1 },
    { source: "F", target: "E", weight: 3 },
    { source: "E", target: "B", weight: 2 },
    { source: "C", target: "D", weight: 4 },
    { source: "D", target: "B", weight: 1 },
    { source: "F", target: "B", weight: 6 },
    { source: "F", target: "G", weight: 5 },
    { source: "G", target: "B", weight: 2 },
    // Add more links as needed
  ]);

  const [shortestPath, setShortestPath] = useState([]);
  const [orderedVisitedPath, setOrderedVisitedPath] = useState([]);
  const svgRef = React.createRef();
  const [nodeColors, setNodeColors] = useState({});

  // Example usage:
  const graph = new Graph();

  graph.addNode("A", { C: 3, F: 2 });
  graph.addNode("B", { D: 1, E: 2, G: 2 });
  graph.addNode("C", { A: 3, F: 2, E: 1, D: 4 });
  graph.addNode("D", { C: 4, B: 1 });
  graph.addNode("E", { C: 1, F: 3, B: 2 });
  graph.addNode("F", { A: 2, C: 2, E: 3, G: 5 });

  const startNode = "A";
  const endNode = "B";

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Draw links
    const linkSelection = svg
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("x1", (d) => nodes.find((node) => node.id === d.source).x)
      .attr("y1", (d) => nodes.find((node) => node.id === d.source).y)
      .attr("x2", (d) => nodes.find((node) => node.id === d.target).x)
      .attr("y2", (d) => nodes.find((node) => node.id === d.target).y)
      .attr("stroke", "black");

    // Draw labels on links
    svg
      .selectAll(".link-label")
      .data(links)
      .enter()
      .append("text")
      .attr("class", "link-label")
      .attr(
        "x",
        (d) =>
          (nodes.find((node) => node.id === d.source).x +
            nodes.find((node) => node.id === d.target).x) /
          2
      )
      .attr(
        "y",
        (d) =>
          (nodes.find((node) => node.id === d.source).y +
            nodes.find((node) => node.id === d.target).y) /
          2
      )
      .text((d) => d.weight);

    // Draw nodes
    const nodeSelection = svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`); // Fix node positioning

    nodeSelection
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 20)
      .attr("fill", (d) => nodeColors[d.id] || "blue"); // Set color based on nodeColors state

    // Append text in the center of each circle
    nodeSelection
      .append("text")
      .attr("x", 0)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em") // Adjust vertical alignment
      .attr("stroke", "white")
      .text((d) => `${d.id}`);
  }, [nodes, links, shortestPath, nodeColors]);

  const animatePath = () => {
    const svg = d3.select(svgRef.current);

    svg.selectAll("g").remove(); // Clear previous circles and text groups

    const data = orderedVisitedPath.map((node) => {
      const isFind = nodes.find((n) => n.id.includes(node));
      if (isFind) {
        return isFind;
      }
    });

    const results = [
      ...data,
      ...nodes.filter((node) => !orderedVisitedPath.includes(node.id)),
    ];

    const circles = svg
      .selectAll("g")
      .data(results)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    // Append circles to the group
    circles
      .append("circle")
      .attr("r", 20)
      .style("fill", "blue")
      .transition()
      .duration(1000)
      .delay((d, i) => i * 500)
      .attr("r", 20)
      .style("fill", (d) => nodeColors[d.id] || "blue")
      .transition()
      .duration(1000)
      .delay((d, i) => (i + 4) * 400) // Adjust the delay as needed
      .filter((d) => shortestPath.includes(d.id))
      .style("fill", "green");

    // Append text to the group
    circles
      .append("text")
      .attr("x", 0)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em") // Adjust vertical alignment
      .attr("stroke", "white")
      .text((d) => `${d.id}`);

    // Update the color of nodes in the shortest path
  };

  const findShortestPath = () => {
    const {
      shortestPath,
      distances,
      orderedVisitedNodes: path,
    } = graph.dijkstra(startNode, endNode);

    console.log("shortedPath", shortestPath);
    console.log("orderedVisitedNodes", path);
    console.log("distances", distances);

    // Set the color of nodes in the shortest path to red
    const coloredNodes = {};

    path.forEach((node) => {
      coloredNodes[node] = "red";
    });

    setNodeColors(coloredNodes);
    setShortestPath(shortestPath);

    setOrderedVisitedPath(path);
  };

  useEffect(() => {
    if (orderedVisitedPath.length > 0) {
      animatePath();
    }
  }, [orderedVisitedPath]);

  return (
    <Stack>
      <Button onClick={findShortestPath}>Start</Button>
      <svg
        ref={svgRef}
        width={1000}
        height={500}
        viewBox="-50 -200 550 550" // Adjust viewBox dimensions
      ></svg>
    </Stack>
  );
};
