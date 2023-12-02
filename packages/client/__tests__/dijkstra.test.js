import { expect, it, describe } from "vitest";
import DijkstraConcreteStrategy from "../src/components/AlgorithmSolver/DijkstraConcreteStrategy.js";

describe("DijkstraAlgorithm", () => {
  it("should get correct shortest path", () => {
    const graph = new DijkstraConcreteStrategy();

    const startNode = "A";
    const endNode = "B";

    graph.addNode("A", { C: 3, F: 2 });
    graph.addNode("B", { D: 1, E: 2, G: 2 });
    graph.addNode("C", { A: 3, F: 2, E: 1, D: 4 });
    graph.addNode("D", { C: 4, B: 1 });
    graph.addNode("E", { C: 1, F: 3, B: 2 });
    graph.addNode("F", { A: 2, C: 2, E: 3, G: 5 });

    const { shortestPath } = graph.run(startNode, endNode);

    expect(shortestPath).toEqual(["A", "C", "E", "B"]);
  });

  it("should get correct ordered visited nodes", () => {
    const graph = new DijkstraConcreteStrategy();

    const startNode = "A";
    const endNode = "B";

    graph.addNode("A", { C: 3, F: 2 });
    graph.addNode("B", { D: 1, E: 2, G: 2 });
    graph.addNode("C", { A: 3, F: 2, E: 1, D: 4 });
    graph.addNode("D", { C: 4, B: 1 });
    graph.addNode("E", { C: 1, F: 3, B: 2 });
    graph.addNode("F", { A: 2, C: 2, E: 3, G: 5 });

    const { orderedVisitedNodes } = graph.run(startNode, endNode);

    expect(orderedVisitedNodes).toEqual(["A", "F", "C", "E", "B"]);
  });
});
