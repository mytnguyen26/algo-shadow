/**
 * Algorithm Solver that implements the Binary Search Tree
 */

/**
 * This class represent a Binary Trees, and used by BSTConcreteStrategy
 * to insert, delete, search the Binary Tree. The left and right property
 * if a reference to other TreeNode objects, which represents
 * left node and right node of the Binary Tree. From the Root of the tree,
 * we can navigate the tree using left node and right node
 * @param {TreeAnimationData} nodeData
 */
class TreeNode {
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
    console.log(backs)
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
   * @param {number} data the node value the caller is looking for
   * @param {Array} record the reference to the `record` array from `bst.jsx`
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
   * Find the node to be deleted from the tree. The node to be deleted
   * is the node with nodeData.value == dData. As the tree is traversed,
   * visited node position will be recorded to the input `record` array
   * for animation purpose later.
   * At the end, 
   * @param {number} dData the value of the node to be deleted
   * For example: 5
   * @param {Array} record the reference to the animation `record`
   * passed from `bst.jsx`. 
   * @returns inOrderSuccessor, which is the successor node that replace the position
   * of the deleted node
   */
  delete(dData, record) {
    let deleteNode = null;
    let inOrderSuccessorNode = null;
    console.log("deleting", dData)
    const removeNode = (node, dData) => {
      console.log("Start", node)
      if (node === null) return null;
      if (node.nodeData.value == dData) {   // We found a node to be deleted
        deleteNode = node;
        if (node.left === null && node.right === null) {
          record.push(node.nodeData.position); 
          return null;}  // case 1: the node has no child
        if (node.left === null){ return node.right;}        // case 2: the node has right child
        if (node.right === null) {return node.left;}    // case 3: the node has only left child
        if (node.left !== null && node.right !== null) {  // case 4: the node has both child,
          // in this case, to correctly render the graph animation,
          // we need to first find the inOrderSuccessorNode to update its
          // position. Then, right child node of the successor node will also
          // need position update.
          let _node = this.min(node.right);
          inOrderSuccessorNode = _node;
          node.nodeData.value = _node.nodeData.value;
          record.push(node.nodeData.position); 
          node.right = removeNode(node.right, dData);
          return node;
        }
      } else if (dData < node.nodeData.value) {
        // This branch handles the subtree that is to the right of deleting node
        record.push(node.nodeData.position);
        node.left = removeNode(node.left, dData);
        return node;
      } else {
        // This branch handles the node or subtree that is to the left of deleting node
        record.push(node.nodeData.position);
        node.right = removeNode(node.right, dData);
        return node;
      }
    };
    removeNode(this.root, dData, this.root.nodeData.position);
    console.log("Final node", inOrderSuccessorNode) // This node is the inorder successor of our deleting node
    this._updateSuccessorSubTreePositions(inOrderSuccessorNode, deleteNode);
    return inOrderSuccessorNode;
  }

  /**
   * A private method to update positions of all nodes impact by the delete()
   * We will consider 2 cases
   * - case 1: if the node has no child then no successor, hence no update
   * - case 2: if inOrderSuccessorNode has right nodes,
   * then right node position = inOrderSuccessorNode position
   * Finally, switch inOrderSuccessorNode's position and deletingNode position
   * @param {*} inOrderSuccessorNode is the successor node replacing the position of
   * the `deleteNode`, found by delete() method
   * @param {*} deleteNode is the node to be deleted
   * @returns 
   */
  _updateSuccessorSubTreePositions(inOrderSuccessorNode, deleteNode) {
    if (inOrderSuccessorNode !== null) {
      if (inOrderSuccessorNode.right !== null) {
        inOrderSuccessorNode.right.nodeData.position = inOrderSuccessorNode.nodeData.position;
      }
      inOrderSuccessorNode.nodeData.position = deleteNode.nodeData.position;
      return inOrderSuccessorNode;
    }
  }
}

export default BSTConcreteStrategy;
