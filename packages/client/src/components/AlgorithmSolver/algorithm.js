export default class Graph {
  constructor() {
    this.nodes = {};
  }

  addNode(name, neighbors) {
    this.nodes[name] = neighbors;
  }

  dijkstra(startNode, endNode) {
    // Track the distance to each node and the path to reach it
    const distances = {};
    const parents = {};
    const visited = new Set();
    const orderedVisitedNodes = [];

    // Initialize distances and parents
    Object.keys(this.nodes).forEach((node) => {
      distances[node] = Infinity;
      parents[node] = null;
    });

    distances[startNode] = 0;

    while (!visited.has(endNode)) {
      const currentNode = minDistanceNode(distances, visited);
      visited.add(currentNode);
      orderedVisitedNodes.push(currentNode);

      for (const neighbor in this.nodes[currentNode]) {
        const distance =
          distances[currentNode] + this.nodes[currentNode][neighbor];

        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;
          parents[neighbor] = currentNode;
        }
      }
    }

    const shortestPath = buildPath(endNode, parents);

    return { distances, shortestPath, orderedVisitedNodes };
  }
}

function minDistanceNode(distances, visited) {
  let minDistance = Infinity;
  let minNode = null;

  for (const node in distances) {
    const distance = distances[node];

    if (distance < minDistance && !visited.has(node)) {
      minDistance = distance;
      minNode = node;
    }
  }

  return minNode;
}

function buildPath(endNode, parents) {
  const path = [endNode];
  let current = endNode;

  while (parents[current] !== null) {
    path.unshift(parents[current]);
    current = parents[current];
  }

  return path;
}
