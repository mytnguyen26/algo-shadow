import DijkstraConcreteStrategy from '../src/utils/algorithm-solver/dijkstraSolver';
import { describe, it, expect } from 'vitest';

describe('DijkstraConcreteStrategy Tests', () => {
  let dijkstra;

  beforeEach(() => {
    dijkstra = new DijkstraConcreteStrategy();
  });

  describe('Graph Construction', () => {
    it('Add nodes correctly', () => {
      dijkstra.addNode('A');
      dijkstra.addNode('B');
      expect(dijkstra.nodes).toEqual(['A', 'B']);
    });

    it('Add edges correctly in directed graph', () => {
      dijkstra.addNode('A');
      dijkstra.addNode('B');
      dijkstra.addEdge('A', 'B', 1);
      expect(dijkstra.edges.get('A')).toEqual([{ node: 'B', weight: 1 }]);
    });

    it('Add edges correctly in undirected graph', () => {
      dijkstra.setKind("Undirected");
      dijkstra.addNode('A');
      dijkstra.addNode('B');
      dijkstra.addEdge('A', 'B', 1);
      expect(dijkstra.edges.get('A')).toEqual([{ node: 'B', weight: 1 }]);
      expect(dijkstra.edges.get('B')).toEqual([{ node: 'A', weight: 1 }]);
    });
  });

  describe('Dijkstra Algorithm', () => {
    beforeEach(() => {
      dijkstra.addNode('A');
      dijkstra.addNode('B');
      dijkstra.addNode('C');
      dijkstra.addEdge('A', 'B', 1);
      dijkstra.addEdge('B', 'C', 2);
      dijkstra.addEdge('A', 'C', 4);
    });

    it('Find the shortest path correctly', () => {
      let record = [];
      const distances = dijkstra.run('A', record);
      expect(distances.get('A')).toBe(0);
      expect(distances.get('B')).toBe(1);
      expect(distances.get('C')).toBe(3);
    });
  });
  describe("DijkstraAlgorithm", () => {
    it("should get correct shortest path weights from source node to all nodes", () => {
      const graph = new DijkstraConcreteStrategy();
      const startNode = "A";
      var record = [];
      graph.addNode("A");
      graph.addNode("B");
      graph.addNode("C");
      graph.addEdge("A", "B", 3);
      graph.addEdge("A", "C", 1);
      graph.addEdge("B", "C", 1);
      graph.addEdge("C", "B", 1);
  
      const orderedVisitedNodes = graph.run(startNode, record);
      const expectResult = new Map();
      expectResult.set("A", 0);
      expectResult.set("B", 2);
      expectResult.set("C", 1);
      expect(orderedVisitedNodes).toEqual(expectResult);
    });
  
    it("should create correct nodes from adjacency matrix", () => {
      let data = [
        [0, 3, 1],
        [0, 0, 1],
        [0, 1, 0],
      ];
      const graph = new DijkstraConcreteStrategy();
      graph.fromAdjacencyMatrix(data);
      const expectResult = new Map(
        Object.entries({
          A: [
            { node: "B", weight: 3 },
            { node: "C", weight: 1 },
          ],
          B: [{ node: "C", weight: 1 }],
          C: [{ node: "B", weight: 1 }],
        })
      );
  
      expect(graph.edges).toEqual(expectResult);
    });
  });
});