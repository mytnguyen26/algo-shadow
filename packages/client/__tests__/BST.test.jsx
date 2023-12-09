import BSTConcreteStrategy from '../src/algorithm-solver/bstsolver';
import { render } from '@testing-library/react';
import BST from '../src/pages/Algorithm/bst';
import TreeGraphRenderer from '../src/pages/Algorithm/Common/treerenderer';


describe('BST Testing', () => {

  let bst;
  let record;

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
    it('should delete a node correctly', () => {
      const deletedNode = bst.delete(5, record);
      expect(deletedNode).toBeNull();
      expect(bst.search(5, [])).toBeFalsy(); 
    });
  });

  describe('traversal methods', () => {
    it('should perform in-order traversal correctly', () => {
      const traversalResult = bst.inOrderTraverse();
      //[2, 1, 3, 7] is the position of [10,5,15,20]
      expect(traversalResult).toEqual([2, 1, 3, 7]);
    });

  });

});