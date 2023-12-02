function createTableCell(content) {
    const cell = document.createElement('td');
    cell.textContent = content;
    return cell;
}

class Graph {
    constructor() {
        this.kind = "Directed"//Undirected Directed
        this.nodes = [];
        this.edges = new Map();
    }

    setkind(kind){
        this.kind = kind
    }

    addNode(node) {
        this.nodes.push(node);
        this.edges.set(node, []);
    }

    addEdge(node1, node2, weight) {
        if(this.kind==="Undirected"){
            this.edges.get(node1).push({ node: node2, weight: weight });
            this.edges.get(node2).push({ node: node1, weight: weight });
        }else{
            this.edges.get(node1).push({ node: node2, weight: weight });
        }
        
    }

    fromAdjacencyMatrix(matrix,k) {
        this.kind = k
        const numNodes = matrix.length;

        // Add nodes to the graph
        for (let i = 0; i < numNodes; i++) {
            this.addNode(String.fromCharCode('A'.charCodeAt(0) + i));
        }

        // Add edges based on the parsed matrix
        for (let i = 0; i < numNodes; i++) {
            for (let j = 0; j < numNodes; j++) {
                if (matrix[i][j] !== 0) {
                    this.addEdge(String.fromCharCode('A'.charCodeAt(0) + i), 
                    String.fromCharCode('A'.charCodeAt(0) + j), matrix[i][j]);
                }
            }
        }
    }

    // Method to create a graph from an edge list
    fromEdgeList(edgeList,k) {
        this.kind = k
        // Add nodes to the graph  
        for (const edge of edgeList) {
            console.log(edge)
            if(this.nodes.indexOf(edge.node1)==-1){
                this.addNode(edge.node1);
            }
            if(this.nodes.indexOf(edge.node2)==-1){
                this.addNode(edge.node2);
            }
        }
        // Add edges based on the edge list
        for (const edge of edgeList) {
            this.addEdge(edge.node1, edge.node2, edge.weight);
        }
    }

    bfs(startNode) {
        const visited = {};
        const queue = [];
        const traversalOrder = [];

        queue.push(startNode);
        visited[startNode] = true;

        while (queue.length > 0) {
            const currentNode = queue.shift();
            traversalOrder.push(currentNode);
            console.log(this.edges.get(this.nodes[currentNode]))
            this.edges.get(this.nodes[currentNode]).forEach(neighbor => {
                // if (!visited[neighbor]) {
                //     visited[neighbor] = true;
                //     queue.push(neighbor);
                // }
                
            });

        }

        return traversalOrder;
    }

    AdjacencyMatrix() {
        const matrix = Array.from({ length: this.nodes.length }, () =>
            Array.from({ length: this.nodes.length }, () => 0)
        );

        for (let i = 0; i < this.nodes.length; i++) {
            const node1 = this.nodes[i];
            const neighbors = this.edges.get(node1);
            for (const neighbor of neighbors) {
                const node2Index = this.nodes.indexOf(neighbor.node);
                matrix[i][node2Index] = neighbor.weight;
            }
        }
        console.log(matrix)
        return matrix;
    }

    EdgeList(){
        const edgeList = [];
        const addedEdges = new Set();
        if(this.kind=="Undirected"){
            for (const [node, neighbors] of this.edges.entries()) {
                for (const neighbor of neighbors) {
                    // 为了确保不会添加重复的边，检查边是否已经被添加过
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
        }else{
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

    displayAdjacencyMatrix() {
        const matrixDiv = document.getElementById('adjacencyMatrix');
        matrixDiv.innerHTML = '';
        const table = document.createElement('table');
        // Header row
        const headerRow = document.createElement('tr');
        headerRow.appendChild(createTableCell(''));
        for (const node of this.nodes) {
            headerRow.appendChild(createTableCell(node));
        }
        table.appendChild(headerRow);

        // Data rows
        for (const node1 of this.nodes) {
            const row = document.createElement('tr');
            row.appendChild(createTableCell(node1));
            for (const node2 of this.nodes) {
                const edge = this.edges.get(node1).find(e => e.node === node2);
                row.appendChild(createTableCell(edge ? edge.weight : '0'));
            }
            table.appendChild(row);
        }

        matrixDiv.appendChild(table);
    }

    dijkstra(startNode,record) {
        const distances = new Map();
        const visited = new Set();

        // Initialize the distance and path information
        for (const node of this.nodes) {
            distances.set(node, node === startNode ? 0 : Infinity);
        }
        while (visited.size < this.nodes.length) {
            // The node with the smallest distance is selected among the nodes that have never been visited
            const currentNode = this.getMinDistanceNode(distances, visited);
            // Mark the selected node as visited
            visited.add(currentNode);
            let t = []
            this.edges.get(currentNode).forEach(e=>{
                if (!visited.has(e.node))
                    t.push(e.node)
            })
            record.push({node:currentNode,change:"stroke"})
            record.push({node:t,change:"stroke"})
            record.push({node:currentNode,change:"fill"})
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
}

export default Graph;
