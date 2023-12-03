/**
 * Algorithm Solver that implements the Binary Search Tree
 */
import { Node } from "./GraphData.js"

/**
 * BSTData represent a Binary Trees, and used by BSTConcreteStrategy
 * to insert, delete, search the Binary Tree. From the Root of the tree,
 * we can navigate the tree using left node and right node
 */
export class BSTData {
  // 创建节点
  constructor(nodeData) {
    this.root = this;
    this.left = null;    // technically, this represent Edges
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
    this.root = null
  }

  /**
   * Insert each node parsed from user input to the tree, then rearrange items
   * in the `record` array to match the new tree. The `record` array is used for
   * rendering UI.
   * @param {Node} data is a new node to be inserted to the tree
   * @param {Array} record the reference to the `record` array from `bst.jsx`
   */
  insert(data, record) {
    const newNode = new BSTData(data)
    const insertNode = (node, newNode, position) => {
      if (newNode.nodeData.value < node.nodeData.value) {
        // 如果插入的节点值比父节点小则插入到左节点上反之则插入到右节点上
        if (node.left === null) {
          console.log("input data", data)
          console.log("insert position", node)
          console.log("data position", data.position)
          data.position = position * 2
          newNode.nodeData.position = data.position
          node.left = newNode
          record.push(position)
          record.push(data.position)
        } else {
          record.push(node.position)
          insertNode(node.left, newNode, position * 2) // 递归找下一层的左侧节点（重点）
        }
      } else {
        if (node.right === null) {
          console.log("input data", data)
          console.log("insert position", node)
          console.log("data position", data.position)
          data.position = position * 2 + 1
          newNode.nodeData.position = data.position
          node.right = newNode
          record.push(position)
          record.push(data.position)
        } else {
          record.push(node.position)
          insertNode(node.right, newNode, position * 2 + 1)
        }
      }
    }
    if (!this.root) {
      this.root = newNode
      data.position = 1
      this.root.nodeData.position = data.position
    } else {
      insertNode(this.root, newNode, 1)
    }
  }

  // Inorder iterates over all nodes（left root right）
  inOrderTraverse() {
    console.log()
    let backs = []
    const callback = (data) => {
      return data
    }
    const inOrderNode = (node, callback) => {
      console.log("Node", node)
      if (node !== null) {
        inOrderNode(node.left, callback) // 递归遍历出左节点
        backs.push(callback(node.position)) // 将值push到数组里
        inOrderNode(node.right, callback) // 递归遍历出右节点
      }
    }
    console.log("Root", this.root)
    inOrderNode(this.root, callback)
    return backs
  }

  // Preorder iterates over all nodes（root left right）
  preOrderTraverse() {
    let backs = []
    const callback = (data) => {
      return data
    }
    const inOrderNode = (node, callback) => {
      if (node !== null) {
        backs.push(callback(node.position)) // 将值push到数组里
        inOrderNode(node.left, callback) // 递归遍历出左节点
        inOrderNode(node.right, callback) // 递归遍历出右节点
      }
    }
    inOrderNode(this.root, callback)
    return backs
  }

  // Postorder iterates over all nodes（left right root）
  postOrderTraverse() {
    let backs = []
    const callback = (data) => {
      return data
    }
    const inOrderNode = (node, callback) => {
      if (node !== null) {
        inOrderNode(node.left, callback) // 递归遍历出左节点
        inOrderNode(node.right, callback) // 递归遍历出右节点
        backs.push(callback(node.position)) // 将值push到数组里
      }
    }
    inOrderNode(this.root, callback)
    return backs
  }

  min(node) {
    const minNode = (node) => {
      return node ? (node.left ? minNode(node.left) : node) : null
    }
    return minNode(node || this.root)
  }

  max(node) {
    const maxNode = (node) => {
      return node ? (node.right ? maxNode(node.right) : node) : null
    }
    return maxNode(node || this.root)
  }

  /**
   * Traverse the tree to find the input `data`
   * @param {*} data the node value the caller is looking for
   * @param {*} record the reference to the `record` array from `bst.jsx`
   * @returns the Node data if it was found
   */
  search(data, record) {
    const searchNode = (node) => {
      if (node === null) return false
      if (node.nodeData.value == data) {
        record.push(node.position)
        return node
      }
      record.push(node.position)
      return searchNode(data < node.nodeData.value ? node.left : node.right, data)
    }
    return searchNode(this.root, data)
  }
  
  /**
   * TODO
   * @param {*} dData 
   * @param {*} localRecord 
   * @returns 
   */
  delete(dData, localRecord) {
    const removeNode = (node, dData) => {
      if (node === null) return null
      if (node.nodeData.value === dData) {
        if (node.left === null && node.right === null) return null
        if (node.left === null) return node.right
        if (node.right === null) return node.left
        if (node.left !== null && node.right !== null) {
          let _node = this.min(node.right)
          node.nodeData.value = _node.nodeData.value
          localRecord.push(node.position)
          node.right = removeNode(node.right, dData)
          return node
        }
      } else if (dData < node.nodeData.value) {
        localRecord.push(node.position)
        node.left = removeNode(node.left, dData)
        return node
      } else {
        localRecord.push(node.position)
        node.right = removeNode(node.right, dData)
        return node
      }
    }
    return removeNode(this.root, dData)
  }
}

export default BSTConcreteStrategy
