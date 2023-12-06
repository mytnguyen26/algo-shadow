import BinarySearchTree from '../src/algorithm-solver/bstsolver';

describe('BinarySearchTree', () => {
  let bst;
  let record;

  beforeEach(() => {
    bst = new BinarySearchTree();
    record = [];
  });

  test('should insert nodes correctly', () => {
    const data = [{ value: 5, index: 1 }, { value: 3, index: 2 }, { value: 7, index: 3 }];
    data.forEach(item => bst.insert(item, record));
    expect(bst.root).not.toBeNull();
    expect(bst.root.data).toBe(5);
    expect(bst.root.left.data).toBe(3);
    expect(bst.root.right.data).toBe(7);
    expect(record).toEqual([1, 2, 1, 3]);
  });

  test('should handle inorder traversal', () => {
    const data = [{ value: 5, index: 1 }, { value: 3, index: 2 }, { value: 7, index: 3 }];
    data.forEach(item => bst.insert(item, record));
    const inorder = bst.inOrderTraverse();
    expect(inorder).toEqual([2, 1, 3]);
  });

  test('should handle preorder traversal', () => {
    const data = [{ value: 5, index: 1 }, { value: 3, index: 2 }, { value: 7, index: 3 }];
    data.forEach(item => bst.insert(item, record));
    const preorder = bst.preOrderTraverse();
    expect(preorder).toEqual([1, 2, 3]);
  });

  test('should handle postorder traversal', () => {
    const data = [{ value: 5, index: 1 }, { value: 3, index: 2 }, { value: 7, index: 3 }];
    data.forEach(item => bst.insert(item, record));
    const postorder = bst.postOrderTraverse();
    expect(postorder).toEqual([2, 3, 1]);
  });

  test('should find the minimum value', () => {
    const data = [{ value: 5, index: 1 }, { value: 3, index: 2 }, { value: 7, index: 3 }, { value: 2, index: 4 }];
    data.forEach(item => bst.insert(item, record));
    const min = bst.min();
    expect(min.data).toBe(2);
  });

  test('should find the maximum value', () => {
    const data = [{ value: 5, index: 1 }, { value: 3, index: 2 }, { value: 7, index: 3 }, { value: 6, index: 4 }];
    data.forEach(item => bst.insert(item, record));
    const max = bst.max();
    expect(max.data).toBe(7);
  });

  test('should search for a value correctly', () => {
    const data = [{ value: 5, index: 1 }, { value: 3, index: 2 }, { value: 7, index: 3 }];
    data.forEach(item => bst.insert(item, record));
    const foundNode = bst.search(7, record);
    expect(foundNode).not.toBeNull();
    expect(foundNode.data).toBe(7);
    expect(record).toContain(foundNode.position);
  });

  test('should delete a value correctly', () => {
    const data = [{ value: 5, index: 1 }, { value: 3, index: 2 }, { value: 7, index: 3 }];
    data.forEach(item => bst.insert(item, record));
    bst.delete(3, record);
    expect(bst.root.left).toBeNull();
    expect(record).toContain(2);
  });
});