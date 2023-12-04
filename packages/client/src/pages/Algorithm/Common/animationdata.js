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
   * @returns
   */
  getx1(node, width, type) {
    if (type === "line" && node[this.positionReference] === 1) {
      return null;
    }
    const depth = this.getdepth(node[this.positionReference]);
    const distance = 2 ** depth;
    const index = node[this.positionReference] - distance;
    return (width / (distance + 1)) * (index + 1);
  }

  /**
   * Calculate the x coordinate of input node relative to the
   * position of the input node within the graph and SVG canvas
   * @param {Node} node the input node index or position
   * @param {*} my
   * @returns
   */
  gety1(node, my, type) {
    if (type === "line" && node[this.positionReference] === 1) {
      return null;
    }
    return my * (this.getdepth(node[this.positionReference]) + 1);
  }

  /**
   * Calculate the X2 coordinate for a svg Line attribute relative
   * to the position of the input node within the graph and SVG canvas
   * @param {*} node
   * @param {*} width
   * @returns
   */
  getx2(node, width) {
    let targetPosition = Math.floor(node[this.positionReference] / 2);
    if (node[this.positionReference] === 1) {
      return null;
    }
    const depth = this.getdepth(targetPosition);
    const distance = 2 ** depth;
    const index = targetPosition - distance;
    return (width / (distance + 1)) * (index + 1);
  }

  /**
   * Calculate the Y2 coordinate for a svg Line attribute relative
   * to the position of the input node within the graph and SVG canvas
   * @param {*} node
   * @param {*} my
   * @returns
   */
  gety2(node, my) {
    if (node[this.positionReference] === 1) {
      return null;
    }
    return my * this.getdepth(node[this.positionReference]);
  }

  /**
   * A helper function calculate the depth of the node
   * within the tree based on the position
   * For example: if position = 3, then depth = 1
   * @param {*} position is the position of the node in the tree
   * @returns
   */
  getdepth(position) {
    return Math.ceil(Math.log2(position + 1)) - 1;
  }

  /**
   * Insert new node to dataset
   */
  push(item) {
    this.dataset.push(item);
  }
}

export class Node {
  constructor(index, value) {
    this.index = index;
    this.value = Number(value);
    this.position = index;
  }
}
