/**
 * This module represent the data structure for algorithm
 */

export default class GraphData {
  constructor(rawData) {
    this._rawData = rawData
  }

  dataTransform(data) {
    var dataset = []
    for (let i = 1; i <= data.length; ++i) {
      dataset[i-1] = { index: i, value: Number(data[i-1]), position: 1};
    }
    return dataset
  }
}

class Node {  // 创建节点
  constructor(data) {
    this.root = this;
    this.data = data.value;
    this.left = null;
    this.right = null;
    this.index = data.index;
  }
}

class Edge {
  contructor 
}