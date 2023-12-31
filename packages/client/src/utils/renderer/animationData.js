/**
 * This module represent the data structure Animation
 */
export class TreeAnimationData {
  constructor(rawData, positionReference) {
    this._rawData = rawData;
    this.positionReference = positionReference;
    this.dataset = this.dataTransform(rawData); // Array[Node]
    this.record = [];
  }

  /**
   * Transform input rawData from Array of Number, i.e. [1, 2, 3, 4]
   * to an Array of Object. This array of object is used by the graph renderer,
   * and manipulated by one of the algorithm-solver to determine where to place 
   * the nodes and links on svg canvas.
   * The function returns an array of object of format
   * [
   *  {index: 1, value: 1, position: 1},
   *  {index: 2, value: 2, position: 2},
   *  ...
   * ]
   * @param {*} data and array of number, for example: [1, 2, 3, 4]
   * @returns an array of object of format
   */
  dataTransform(data) {
    let dataset = [];
    for (let i = 0; i < data.length; ++i) {
      dataset[i] = new Node(i + 1, data[i]);
    }
    return dataset;
  }

  /**
   * Calculate the x coordinate of input node relative to the
   * position of the node within the graph and SVG canvas
   * @param {Node} node the input node index or position
   * @param {*} width the current clientWidth captured in svg reference
   * @returns a number represent the x1-coordinate for svg Canvas
   */
  getx1(node, width, type) {
    if (type === "line" && node[this.positionReference] === 1) {
      return null;
    }
    const depth = this.getDepth(node[this.positionReference]);
    const distance = 2 ** depth;
    const index = node[this.positionReference] - distance;
    return (width / (distance + 1)) * (index + 1);
  }

  /**
   * Calculate the x coordinate of input node relative to the
   * position of the input node within the graph and SVG canvas
   * @param {Node} node the input node index or position
   * @param {number} my
   * @param {str} type
   * @returns a number
   */
  gety1(node, my, type) {
    if (type === "line" && node[this.positionReference] === 1) {
      return null;
    }
    return my * (this.getDepth(node[this.positionReference]) + 1);
  }

  /**
   * Calculate the X2 coordinate for a svg Line attribute relative
   * to the position of the input node within the graph and SVG canvas
   * @param {Node} node
   * @param {number} width
   * @returns a number
   */
  getx2(node, width) {
    let targetPosition = Math.floor(node[this.positionReference] / 2);
    if (node[this.positionReference] === 1) {
      return null;
    }
    const depth = this.getDepth(targetPosition);
    const distance = 2 ** depth;
    const index = targetPosition - distance;
    return (width / (distance + 1)) * (index + 1);
  }

  /**
   * Calculate the Y2 coordinate for a svg Line attribute relative
   * to the position of the input node within the graph and SVG canvas
   * @param {Node} node
   * @param {number} my
   * @returns a number
   */
  gety2(node, my) {
    if (node[this.positionReference] === 1) {
      return null;
    }
    return my * this.getDepth(node[this.positionReference]);
  }

  /**
   * A helper function calculate the depth of the node
   * within the tree based on the position
   * For example: if position = 3, then depth = 1
   * @param {*} position is the position of the node in the tree
   * @returns a number
   */
  getDepth(position) {
    return Math.ceil(Math.log2(position + 1)) - 1;
  }

  /**
   * Insert new node to dataset
   * @param {Node} item the node to be inserted to the dataset
   */
  push(item) {
    this.dataset.push(item);
  }
}

/**
 * Node object represents a node in a TreeBased Graph,
 * such as BST or Heap. When a node object is instantiated, it
 * position is automatically create, and value is from
 * user input.
 * For example, if user input is 1,2,3, 3 Nodes objects are created
 * with the following attributes:
 * Node: { index: 1, value: 1, position: 1 }
 * Node: { index: 2, value: 2, position: 2 }
 * Node: { index: 3, value: 3, position: 3 }
 */
export class Node {
  constructor(index, value) {
    this.index = index;
    this.value = Number(value);
    this.position = index;
  }
}
