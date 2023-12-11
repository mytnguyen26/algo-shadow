/**
 * This module has concrete logic implementation for Dijkstra
 */
export default class DijkstraConcreteStrategy {
  constructor() {
    this.nodes = [];
    this.edges = new Map();
    this.kind = "Directed"; //Undirected Directed
  }

  setKind(kind) {
    this.kind = kind;
  }

  addNode(node) {
    this.nodes.push(node);
    this.edges.set(node, []);
  }

  addEdge(node1, node2, weight) {
    if (this.kind === "Undirected") {
      this.edges.get(node1).push({ node: node2, weight: weight });
      this.edges.get(node2).push({ node: node1, weight: weight });
    } else {
      this.edges.get(node1).push({ node: node2, weight: weight });
    }
  }

  fromAdjacencyMatrix(matrix, k) {
    this.kind = k;
    const numNodes = matrix.length;

    // Add nodes to the graph
    for (let i = 0; i < numNodes; i++) {
      this.addNode(String.fromCharCode("A".charCodeAt(0) + i));
    }

    // Add edges based on the parsed matrix
    for (let i = 0; i < numNodes; i++) {
      for (let j = 0; j < numNodes; j++) {
        if (matrix[i][j] !== 0) {
          this.addEdge(
            String.fromCharCode("A".charCodeAt(0) + i),
            String.fromCharCode("A".charCodeAt(0) + j),
            matrix[i][j]
          );
        }
      }
    }
  }

  fromEdgeList(edgeList, k) {
    this.kind = k;
    // Add nodes to the graph
    for (const edge of edgeList) {
      console.log(edge);
      if (this.nodes.indexOf(edge.node1) === -1) {
        this.addNode(edge.node1);
      }
      if (this.nodes.indexOf(edge.node2) === -1) {
        this.addNode(edge.node2);
      }
    }
    // Add edges based on the edge list
    for (const edge of edgeList) {
      this.addEdge(edge.node1, edge.node2, edge.weight);
    }
  }

  run(startNode, record) {
    // Track the distance to each node and the path to reach it
    console.log("Edges", this.edges);
    const distances = new Map();
    const visited = new Set();

    // Initialize distances and parents
    for (const node of this.nodes) {
      distances.set(node, node === startNode ? 0 : Infinity);
    }
    let lastNode;
    while (visited.size < this.nodes.length) {
      // console.log("visited", visited)
      // console.log("all nodes", distances)
      const currentNode = this.getMinDistanceNode(distances, visited); // The node with the smallest distance is selected among the nodes that have never been visited
      visited.add(currentNode); // Mark the selected node as visited
      let t = [];
      let edge;
      this.edges.get(currentNode).forEach((e) => {
        if (!visited.has(e.node)) {
          edge = e;
          t.push(e.node);
        }
      });
      if (lastNode != null) {
        let k = this.findEdgeId(currentNode, lastNode);
        record.push({ node: k, change: "stroke" });
      }
      record.push({ node: currentNode, change: "stroke" });
      record.push({ node: t, change: "stroke" });
      record.push({ node: currentNode, change: "fill" });

      lastNode = currentNode;
      // Update the distance and path information of the nodes adjacent to the current node
      for (const neighbor of this.edges.get(currentNode)) {
        const totalDistance = distances.get(currentNode) + neighbor.weight;

        if (totalDistance < distances.get(neighbor.node)) {
          distances.set(neighbor.node, totalDistance);
        }
      }
    }
    return distances;
  }

  findEdgeId(currentNode, lastNode) {
    let edges = document.getElementsByClassName("edge");
    for (let j = 0; j < edges.length; j++) {
      let title = edges[j].getElementsByTagName("title")[0].innerHTML;
      if (
        lastNode === title.charAt(0) &&
        currentNode === title.charAt(title.length - 1)
      ) {
        return edges[j].id;
      }
    }
  }

  getMinDistanceNode(distances, visited) {
    let minDistance = Infinity;
    let minNode = null;

    for (const [node, distance] of distances.entries()) {
      if (!visited.has(node) && distance < minDistance) {
        minDistance = distance;
        minNode = node;
      }
    }
    return minNode;
  }

  getEdgeList() {
    const edgeList = [];
    const addedEdges = new Set();
    if (this.kind === "Undirected") {
      for (const [node, neighbors] of this.edges.entries()) {
        for (const neighbor of neighbors) {
          // no duplicate edges
          const edgeKey1 = `${node}-${neighbor.node}`;
          const edgeKey2 = `${neighbor.node}-${node}`;

          if (!addedEdges.has(edgeKey1) && !addedEdges.has(edgeKey2)) {
            edgeList.push({
              node1: node,
              node2: neighbor.node,
              weight: neighbor.weight,
            });
            addedEdges.add(edgeKey1);
            addedEdges.add(edgeKey2);
          }
        }
      }
    } else {
      for (const [node, neighbors] of this.edges.entries()) {
        for (const neighbor of neighbors) {
          edgeList.push({
            node1: node,
            node2: neighbor.node,
            weight: neighbor.weight,
          });
        }
      }
    }
    return edgeList;
  }
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
