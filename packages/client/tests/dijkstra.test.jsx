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
});