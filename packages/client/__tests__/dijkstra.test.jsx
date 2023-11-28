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
