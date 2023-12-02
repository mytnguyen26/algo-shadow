import { expect, it, describe } from "vitest";
import Graph from "../src/components/AlgorithmSolver/algorithm.js";

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
