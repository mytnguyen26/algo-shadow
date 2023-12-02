class Node {  // create node
  constructor(data) {
      this.root = this;
      this.data = data.value;
      this.left = null;
      this.right = null;
      this.index = data.index;
      this.position = null;
  }
}

class BinarySearchTree{
  constructor() {
    this.root = null;
  }
  // insert node
  insert(data,record) {
    const newNode = new Node(data);
    const insertNode = (node, newNode,position) => {
        if (newNode.data < node.data) { // If the value of the inserted node is smaller than the parent node, it is inserted into the left node and otherwise it is inserted into the right node
            if (node.left === null) {    
                data.position = position * 2
                newNode.position = data.position
                node.left = newNode          
                record.push(position)      
                record.push(data.position)
            }else {
                record.push(node.position)
                insertNode(node.left, newNode,position * 2) // Recursively find the left node of the next level                  
            }
        }else{
            if (node.right === null) {
                data.position = position * 2+1
                newNode.position = data.position
                node.right = newNode;
                record.push(position)  
                record.push(data.position)
              } else {
                record.push(node.position)
                insertNode(node.right, newNode,position * 2+1)                   
              }
          }
      }
      if (!this.root) {
          this.root = newNode;
          data.position = 1;
          this.root.position = data.position
      } else {
          insertNode(this.root, newNode,1);
      }
  }
  // Inorder iterates over all nodes（left root right）
  inOrderTraverse() {
      let backs = [];
      const callback = data => {
          return data
      }
      const inOrderNode = (node, callback) => {
          if (node !== null) {
              inOrderNode(node.left, callback); // Recursively iterate over the left node
              backs.push(callback(node.position));  // push the values into the array
              inOrderNode(node.right, callback)  // Recursively iterate over the right node
          }
      }
      inOrderNode(this.root, callback)
      return backs
  }
  // Preorder iterates over all nodes（root left right）
  preOrderTraverse() {
      let backs = [];
      const callback = data => {
          return data
      }
      const inOrderNode = (node, callback) => {
          if (node !== null) {
              backs.push(callback(node.position));  // 将值push到数组里
              inOrderNode(node.left, callback); // 递归遍历出左节点
              inOrderNode(node.right, callback)  // 递归遍历出右节点
          }
      }
      inOrderNode(this.root, callback)
      return backs
  }
  // Postorder iterates over all nodes（left right root）
  postOrderTraverse() {
      let backs = [];
      const callback = data => {
          return data
      }
      const inOrderNode = (node, callback) => {
          if (node !== null) {
              inOrderNode(node.left, callback); // 递归遍历出左节点     
              inOrderNode(node.right, callback)  // 递归遍历出右节点
              backs.push(callback(node.position));  // 将值push到数组里
          }
      }
      inOrderNode(this.root, callback)
      return backs
  }

  min(node) {
      const minNode = (node) => {
          return  node ? (node.left ? minNode(node.left) : node) : null
      }
      return minNode(node || this.root)
  }

  max(node) {
      const maxNode = (node) => {
          return  node ? (node.right ? maxNode(node.right) : node) : null
      }
      return maxNode(node || this.root)
  }

  search(data,record) {
      const searchNode = (node) => {
          if (node === null) return false;
          if (node.data == data) {
            record.push(node.position)
            return node;
          }
          record.push(node.position)
          return searchNode(data < node.data ? node.left : node.right, data)
      }
      return searchNode(this.root, data)
  }
  //delete
  delete(dData,localRecord) {
      const removeNode = (node,dData) => {
          if(node === null) return null;
          if(node.data === dData){
              if(node.left === null && node.right === null) return null;
              if(node.left === null) return node.right; 
              if(node.right === null) return node.left;
              if(node.left !==null && node.right !==null){
                let _node = this.min(node.right);
                node.data = _node.data;
                localRecord.push(node.position)
                node.right = removeNode(node.right,dData);
                return node
              }
          } else if(dData < node.data){
            localRecord.push(node.position)
              node.left=removeNode(node.left,dData);
              return node
          } else {
            localRecord.push(node.position)
              node.right=removeNode(node.right,dData);
              return node
          }
      };
      return removeNode(this.root,dData)
  }
}

export default BinarySearchTree;