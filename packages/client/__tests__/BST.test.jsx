import BSTConcreteStrategy from '../src/utils/algorithm-solver/bstSolver';
import { render } from '@testing-library/react';
import BSTPage from '../src/pages/Algorithm/BST';
import TreeGraphRenderer from '../src/utils/common/treerenderer';


describe('BST Testing', () => {

  let bst;
  let record;
  let deletedNodePosition = [];

  beforeEach(() => {
    bst = new BSTConcreteStrategy();
    record = [];
    bst.insert({ value: 10 }, record);
    bst.insert({ value: 5 }, record);
    bst.insert({ value: 15 }, record);
    bst.insert({ value: 20 }, record);
  });

  describe('Insert method', () => {
    it('should insert a new node correctly', () => {
      bst.insert({ value: 7 }, record);
      expect(bst.root.left.right.nodeData.value).toBe(7);
    });
  });

  describe('Search method', () => {
    it('should find an existing node', () => {
      const foundNode = bst.search(5, record);
      expect(foundNode).not.toBeNull();
      expect(foundNode.nodeData.value).toBe(5);
    });

    it('should return null for a non-existing node', () => {
      const foundNode = bst.search(99, record);
      expect(foundNode).toBeFalsy();
    });
  });

  describe('Delete method', () => {
    it('should delete a left leaf node correctly', () => {
      const inOrderSuccessorNode = bst.delete(5, deletedNodePosition, record);
      expect(inOrderSuccessorNode).toBeNull();
      expect(bst.search(5, [])).toBeFalsy(); 
    });

    it("should delete a root node correctly", () =>{
      const inOrderSuccessorNode = bst.delete(10, deletedNodePosition, record);
      expect(inOrderSuccessorNode.nodeData.value).toEqual(15);
      expect(inOrderSuccessorNode.nodeData.position).toEqual(1);
    });

    it("should delete a node with right child correctly", () =>{
      const inOrderSuccessorNode = bst.delete(15, deletedNodePosition, record);
      expect(inOrderSuccessorNode.nodeData.value).toEqual(20);
      expect(inOrderSuccessorNode.nodeData.position).toEqual(3);
    })
  });

  describe('traversal methods', () => {
    it('should perform in-order traversal correctly', () => {
      const traversalResult = bst.inOrderTraverse();
      //[2, 1, 3, 7] is the position of [10,5,15,20]
      expect(traversalResult).toEqual([2, 1, 3, 7]);
    });

    it("should perform post-order traverasl correctly", () => {
      const traversalResult = bst.postOrderTraverse();
      expect(traversalResult).toEqual([2, 7, 3, 1])
    });

    it("should perform pre-order traverasl correctly", () => {
      const traversalResult = bst.preOrderTraverse();
      expect(traversalResult).toEqual([1, 2, 3, 7])
    })

  });

  describe("min method" , () => {
    it("should return min nodes from tree", () => {
      const minNode = bst.min(bst.root);
      expect(minNode.nodeData.value).toEqual(5);
    })
  });

  describe("max method" , () => {
    it("should return max nodes from tree", () => {
      const maxNode = bst.max(bst.root);
      expect(maxNode.nodeData.value).toEqual(20);
    })
  });
});