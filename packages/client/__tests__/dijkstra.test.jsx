import { DijkstraGraph } from "../src/pages/Algorithm/DijkstraComponent/DijkstraGraph.jsx";
import { expect, it, describe, vi } from "vitest";
import { render, renderHook } from "@testing-library/react";
import Graph from "../src/components/AlgorithmSolver/algorithm.js";
import { useNodes } from "../src/pages/Algorithm/DijkstraComponent/useNodes.jsx";

const fn = vi.fn();
describe(DijkstraGraph, () => {
  it("should render correctly", () => {
    const result = render();
    expect(result).toMatchSnapshot();
  });
});

describe("DijkstraAlgorithm", () => {
  it("should get correct shortest path", () => {
    const graph = new Graph();

    const startNode = "A";
    const endNode = "B";

    graph.addNode("A", { C: 3, F: 2 });
    graph.addNode("B", { D: 1, E: 2, G: 2 });
    graph.addNode("C", { A: 3, F: 2, E: 1, D: 4 });
    graph.addNode("D", { C: 4, B: 1 });
    graph.addNode("E", { C: 1, F: 3, B: 2 });
    graph.addNode("F", { A: 2, C: 2, E: 3, G: 5 });

    const { shortestPath } = graph.dijkstra(startNode, endNode);

    expect(shortestPath).toEqual(["A", "C", "E", "B"]);
  });

  it("should get correct ordered visited nodes", () => {
    const graph = new Graph();

    const startNode = "A";
    const endNode = "B";

    graph.addNode("A", { C: 3, F: 2 });
    graph.addNode("B", { D: 1, E: 2, G: 2 });
    graph.addNode("C", { A: 3, F: 2, E: 1, D: 4 });
    graph.addNode("D", { C: 4, B: 1 });
    graph.addNode("E", { C: 1, F: 3, B: 2 });
    graph.addNode("F", { A: 2, C: 2, E: 3, G: 5 });

    const { orderedVisitedNodes } = graph.dijkstra(startNode, endNode);

    expect(orderedVisitedNodes).toEqual(["A", "F", "C", "E", "B"]);
  });
});

// describe("Nodes", () => {
//   it("should render with the correct initial nodes state", () => {
//     const { result } = renderHook(() => useNodes());
//     const nodes = query(() => result.current[0]);
//     // console.log(useNodesSpy);
//     // Act;
//     const expectedInitialState = [
//       {
//         id: "A",
//         x: 50,
//         y: 50,
//         weight: 0,
//         isStart: true,
//         isFinish: false,
//         distance: Infinity,
//         isVisited: false,
//         previousNode: null,
//       },
//       {
//         id: "B",
//         x: 400,
//         y: 50,
//         weight: 0,
//         isStart: true,
//         isFinish: false,
//         distance: Infinity,
//         isVisited: false,
//         previousNode: null,
//       },
//       {
//         id: "C",
//         x: 150,
//         y: -50,
//         weight: 0,
//         isStart: true,
//         isFinish: false,
//         distance: Infinity,
//         isVisited: false,
//         previousNode: null,
//       },
//       {
//         id: "D",
//         x: 300,
//         y: -50,
//         weight: 0,
//         isStart: true,
//         isFinish: false,
//         distance: Infinity,
//         isVisited: false,
//         previousNode: null,
//       },
//       {
//         id: "E",
//         x: 250,
//         y: 50,
//         weight: 0,
//         isStart: true,
//         isFinish: false,
//         distance: Infinity,
//         isVisited: false,
//         previousNode: null,
//       },
//       {
//         id: "F",
//         x: 150,
//         y: 150,
//         weight: 0,
//         isStart: true,
//         isFinish: false,
//         distance: Infinity,
//         isVisited: false,
//         previousNode: null,
//       },
//       {
//         id: "G",
//         x: 300,
//         y: 150,
//         weight: 0,
//         isStart: false,
//         isFinish: true,
//         distance: Infinity,
//         isVisited: false,
//         previousNode: null,
//       },
//     ];
//
//     // Assert
//     // expect(result).toEqual(expectedInitialState);
//   });
// });
