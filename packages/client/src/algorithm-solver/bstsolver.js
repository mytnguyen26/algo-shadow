/**
 * Algorithm Solver that implements the Binary Search Tree
 */

/**
 * This class represent a Binary Trees, and used by BSTConcreteStrategy
 * to insert, delete, search the Binary Tree. From the Root of the tree,
 * we can navigate the tree using left node and right node
 */
class TreeNode {
  // create node
  constructor(nodeData) {
    this.root = this;
    this.left = null;
    this.right = null;
    this.nodeData = nodeData;
  }
}

/**
 * BSTConcreteStrategy has implementatiosn for Binary Search Tree operations,
 * including insert, delete, search
 * The BSTConcreteStrategy has <BSTData> `root` property that keeps reference
 * to the root of Binary Search Tree
 */
class BSTConcreteStrategy {
  constructor() {
    this.root = null;
  }

  /**
   * Insert each node parsed from user input to the tree, then rearrange items
   * in the `record` array to match the new tree. The `record` array is used for
   * rendering UI.
   * @param {Node} data is a new node to be inserted to the tree
   * @param {Array} record the reference to the `record` array from `bst.jsx`
   */
  insert(data, record) {
    const newNode = new TreeNode(data);
    const insertNode = (node, newNode, position) => {
      if (newNode.nodeData.value < node.nodeData.value) {
        // If the value of the inserted node is smaller than the parent node, it is inserted into the left node and otherwise it is inserted into the right node
        if (node.left === null) {
          data.position = position * 2;
          newNode.nodeData.position = data.position;
          node.left = newNode;
          record.push(position);
          record.push(data.position);
        } else {
          record.push(node.nodeData.position);
          insertNode(node.left, newNode, position * 2); // Recursively find the left node of the next level
        }
      } else {
        if (node.right === null) {
          data.position = position * 2 + 1;
          newNode.nodeData.position = data.position;
          node.right = newNode;
          record.push(position);
          record.push(data.position);
        } else {
          record.push(node.nodeData.position);
          insertNode(node.right, newNode, position * 2 + 1);
        }
      }
    };
    if (!this.root) {
      this.root = newNode;
      data.position = 1;
      this.root.nodeData.position = data.position;
    } else {
      insertNode(this.root, newNode, 1);
    }
  }

  /**
   * Inorder iterates over all nodes（left root right）
   * @returns
   */
  inOrderTraverse() {
    let backs = [];
    const callback = (data) => {
      return data;
    };
    const inOrderNode = (node, callback) => {
      if (node !== null) {
        inOrderNode(node.left, callback); // Recursively iterate over the left node
        backs.push(callback(node.nodeData.position)); // push the values into the array
        inOrderNode(node.right, callback); // Recursively iterate over the right node
      }
    };
    inOrderNode(this.root, callback);
    return backs;
  }

  /**
   * Preorder iterates over all nodes（root left right）
   * @returns
   */
  preOrderTraverse() {
    let backs = [];
    const callback = (data) => {
      return data;
    };
    const inOrderNode = (node, callback) => {
      if (node !== null) {
        backs.push(callback(node.nodeData.position)); // 将值push到数组里
        inOrderNode(node.left, callback); // 递归遍历出左节点
        inOrderNode(node.right, callback); // 递归遍历出右节点
      }
    };
    inOrderNode(this.root, callback);
    return backs;
  }

  /**
   * Postorder iterates over all nodes（left right root
   * @returns
   */
  postOrderTraverse() {
    let backs = [];
    const callback = (data) => {
      return data;
    };
    const inOrderNode = (node, callback) => {
      if (node !== null) {
        inOrderNode(node.left, callback); // 递归遍历出左节点
        inOrderNode(node.right, callback); // 递归遍历出右节点
        backs.push(callback(node.nodeData.position)); // 将值push到数组里
      }
    };
    inOrderNode(this.root, callback);
    return backs;
  }

  /**
   * TODO
   * @param {*} node
   * @returns
   */
  min(node) {
    const minNode = (node) => {
      return node ? (node.left ? minNode(node.left) : node) : null;
    };
    return minNode(node || this.root);
  }

  /**
   * TODO
   * @param {*} node
   * @returns
   */
  max(node) {
    const maxNode = (node) => {
      return node ? (node.right ? maxNode(node.right) : node) : null;
    };
    return maxNode(node || this.root);
  }

  /**
   * Traverse the tree to find the input `data`, then record the position
   * of the node stored in nodeData.position to the `record` array
   * @param {*} data the node value the caller is looking for
   * @param {*} record the reference to the `record` array from `bst.jsx`
   * to store the new node position order
   * @returns the Node data if it was found
   */
  search(data, record) {
    const searchNode = (node) => {
      if (node === null) return false;
      if (node.nodeData.value == data) {
        record.push(node.nodeData.position);
        return node;
      }
      record.push(node.nodeData.position);
      return searchNode(
        data < node.nodeData.value ? node.left : node.right,
        data,
      );
    };
    return searchNode(this.root, data);
  }

  /**
   * TODO
   * @param {*} dData
   * @param {*} localRecord
   * @returns
   */
  delete(dData, localRecord) {
    const removeNode = (node, dData) => {
      if (node === null) return null;
      if (node.nodeData.value === dData) {
        if (node.left === null && node.right === null) return null;
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;
        if (node.left !== null && node.right !== null) {
          let _node = this.min(node.right);
          node.nodeData.value = _node.data;
          localRecord.push(node.nodeData.position);
          node.right = removeNode(node.right, dData);
          return node;
        }
      } else if (dData < node.nodeData.value) {
        localRecord.push(node.nodeData.position);
        node.left = removeNode(node.left, dData);
        return node;
      } else {
        localRecord.push(node.nodeData.position);
        node.right = removeNode(node.right, dData);
        return node;
      }
    };
    return removeNode(this.root, dData);
  }
}

export default BSTConcreteStrategy;
