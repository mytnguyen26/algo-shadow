import { expect, it, describe } from "vitest";
import DijkstraConcreteStrategy from "../src/algorithm-solver/dijkstrasolver"

describe("DijkstraAlgorithm", () => {
  it("should get correct shortest path weights from source node to all nodes", () => {
    const graph = new DijkstraConcreteStrategy();
    const startNode = "A";
    var record = []
    graph.addNode("A")
    graph.addNode("B")
    graph.addNode("C")
    graph.addEdge("A", "B", 3)
    graph.addEdge("A", "C", 1)
    graph.addEdge("B", "C", 1)
    graph.addEdge("C", "B", 1)

    const orderedVisitedNodes = graph.run(startNode, record);
    const expectResult = new Map()
    expectResult.set("A", 0)
    expectResult.set("B", 2)
    expectResult.set("C", 1)
    expect(orderedVisitedNodes).toEqual(expectResult);
  });

  it("should create correct nodes from adjacency matrix", () => {
    const graph = new DijkstraConcreteStrategy();
    graph.fromAdjacencyMatrix(data)
    const expectResult = new Map(Object.entries(
      {
        "A": [{node: "B", weight: 3}, {node: "C", weight: 1}],
        "B": [{node: "C", weight: 1}],
        "C": [{node: "B", weight: 1}]
  
      }
    ));

    expect(graph.edges).toEqual(expectResult)
  });
});
