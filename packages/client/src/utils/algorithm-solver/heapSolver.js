/**
 * algorithm Solver that implements the Heap
 */

/**
 * Recursively traversing heap to find the the max element. While traversing
 * the heap, the function manipulates the `localRecord` array, which is later used
 * by the renderer for graph animation on the UI
 * @param {Array<Node>} localDataset is an array of nodes. Contain the current nodes
 * in the graph. For example:
 * [
 *   Node: { index: 1, value: 1, position: 1 },
 *   Node: { index: 2, value: 2, position: 2 },
 *   Node: { index: 3, value: 3, position: 3 }
 * ]
 * @param {number} i is an index position, which is used to get data from the `localDataset`
 * array 
 * @param {*} localRecord the reference to the `record` array, used for
 * graph rendering
 * @returns an object contain new dataset (that has the nodes and new position)
 * and a new record array, which has all the animation steps
 * {
 *   dataset: [Node, Node]
 *   record: [1, 2, ...]
 * }
 */
const getMaxHeap = (localDataset, i, localRecord) => {
  console.log("Dataset", localDataset)
  const n = localDataset.length;
  const left = 2 * i;
  const right = 2 * i + 1;
  let largest;
  if (left <= n && localDataset[left - 1].value > localDataset[i - 1].value) {
    largest = left;
  } else {
    largest = i;
  }
  if (
    right <= n &&
    localDataset[right - 1].value > localDataset[largest - 1].value
  ) {
    largest = right;
  }
  if (largest !== i) {
    exchangeData(i, largest, localDataset, localRecord);
    // Recursively heapify the affected subtree
    getMaxHeap(localDataset, largest, localRecord);
  }
  return { dataset: localDataset, record: localRecord };
};

const exchangeData = (index1, index2, localDataset, localRecord) => {
  localRecord.push({
    e1: localDataset[index1 - 1].index,
    e2: localDataset[index2 - 1].index,
  });
  // Swap
  let temp = localDataset[index1 - 1];
  localDataset[index1 - 1] = localDataset[index2 - 1];
  localDataset[index2 - 1] = temp;
  localDataset[index1 - 1].position = index1;
  localDataset[index2 - 1].position = index2;
};

const getParent = (i) => {
  return Math.floor(i / 2);
};

const HeapConcreteStrategy = {

  /**
   * Iterate thru dataset, which is an array of nodes, and change each node position.
   * The position of the nodes represents its position in the tree. At the end of buildMaxHeap,
   * we obtain a dataset of nodes, whose position when constructed by the graph renderer
   * would yields a Max Heap. For example, 
   * [
   *   Node: { index: 1, value: 1, position: 3 },
   *   Node: { index: 2, value: 2, position: 2 },
   *   Node: { index: 3, value: 3, position: 1 }
   * ]
   * would yield a Heap tree
   *          __3__
   *         |     |
   *         2     1
   * @param {Array<Node>} dataset is an array of nodes, contain the current nodes
   * in the graph. For example:
   * [
   *   Node: { index: 1, value: 1, position: 1 },
   *   Node: { index: 2, value: 2, position: 2 },
   *   Node: { index: 3, value: 3, position: 3 }
   * ]
   * @param {Array} record the reference to the `record` array, used for
   * graph rendering
   * @returns an object contain new dataset (that has the nodes and new position)
   * and a new record array, which has all the animation steps
   */
  buildMaxHeap: (dataset, record) => {
    let result = 0;
    for (var i = Math.floor(dataset.length / 2); i > 0; i--) {
      result = getMaxHeap(dataset, i, record);
    }
    console.log("Heapification completed!");
    return result;
  },

  /**
   * As the user insert a new value to the heap, this function iterate
   * thru the current `localDataset` array of Nodes (with the new node), and swap
   * the node index position in the `localDataset` array, until the heap property
   * is maintained. While traversing the heap, it records the nodes and what need to happen
   * in the `localRecord` array, which is used for animation purpose by graph renderer
   * @param {*} localDataset is an array of nodes, contain the current nodes
   * in the graph. For example:
   * [
   *   Node: { index: 1, value: 1, position: 1 },
   *   Node: { index: 2, value: 2, position: 2 },
   *   Node: { index: 3, value: 3, position: 3 }
   * ]
   * @param {*} localRecord the reference to the `record` array, used for
   * graph rendering
   * @returns an object contain new dataset (that has the nodes and new position)
   * and a new record array, which has all the animation steps
   * {
   *   dataset: [Node, Node]
   *   record: [1, 2, ...]
   * }
   */
  insert: (localDataset, localRecord) => {
    let i = localDataset.length;
    while (i > 1) {
      const parentIndex = getParent(i);
      if (localDataset[i - 1].value > localDataset[parentIndex - 1].value) {
        // Swap the element with its parent
        let temp = localDataset[i - 1];
        localDataset[i - 1] = localDataset[parentIndex - 1];
        localDataset[parentIndex - 1] = temp;

        localRecord.push({
          e1: localDataset[i - 1].index,
          e2: localDataset[parentIndex - 1].index,
        });

        i = parentIndex;
      } else {
        // The max-heap property is maintained
        break;
      }
    }

    return { dataset: localDataset, record: localRecord };
  },

  /**
   * As user request a value to be deleted from the Heap, this invoke additional
   * `increaseKey` and `extraHeap` to manipulate the current Heap, until the Max heap
   * property is maintained. 
   * @param {number} index 
   * @param {*} localDataset is an array of nodes, contain the current nodes
   * in the graph. For example:
   * [
   *   Node: { index: 1, value: 1, position: 1 },
   *   Node: { index: 2, value: 2, position: 2 },
   *   Node: { index: 3, value: 3, position: 3 }
   * ]
   * @param {*} localRecord the reference to the `record` array, used for
   * graph rendering
   * @returns an object contain new dataset (that has the nodes and new position)
   * and a new record array, which has all the animation steps
   * {
   *   dataset: [Node, Node]
   *   record: [1, 2, ...]
   * }
   */
  delete: (index, localDataset, localRecord) => {
    let max = localDataset[0].value + 1;
    HeapConcreteStrategy.increaseKey(index, max, localDataset, localRecord);
    HeapConcreteStrategy.extraHeap(localDataset, localRecord);
  },

  /**
   * As user request a value to be deleted from the Heap, this function swap
   * the node index position in the `localDataset` array, until the heap property
   * is maintained. While traversing the heap, it records the nodes and what need to happen
   * in the `localRecord` array, which is used for animation purpose by graph renderer
   * @param {number} i 
   * @param {number} key 
   * @param {Array<Node>} localDataset is an array of nodes, contain the current nodes
   * in the graph. For example:
   * [
   *   Node: { index: 1, value: 1, position: 1 },
   *   Node: { index: 2, value: 2, position: 2 },
   *   Node: { index: 3, value: 3, position: 3 }
   * ]
   * @param {Array} localRecord the reference to the `record` array, used for
   * graph rendering
   * @returns an object contain new dataset (that has the nodes and new position)
   * and a new record array, which has all the animation steps
   * {
   *   dataset: [Node, Node]
   *   record: [1, 2, ...]
   * }
   * @returns 
   */
  increaseKey: (i, key, localDataset, localRecord) => {
    if (key < localDataset[i - 1].value) {
      throw new Error("new value is smaller than before");
    }
    localDataset[i - 1].value = key;
    while (
      i > 1 &&
      localDataset[getParent(i) - 1].value < localDataset[i - 1].value
    ) {
      exchangeData(getParent(i), i, localDataset, localRecord);
      i = getParent(i);
    }
    return { dataset: localDataset, record: localRecord };
  },

  /**
   * TODO
   * @param {*} localDataset is an array of nodes. Contain the current nodes
   * in the graph. For example:
   * [
   *   Node: { index: 1, value: 1, position: 1 },
   *   Node: { index: 2, value: 2, position: 2 },
   *   Node: { index: 3, value: 3, position: 3 }
   * ]
   * @param {*} localRecord the reference to the `record` array, used for
   * graph rendering
   * @returns 
   */
  extraHeap: (localDataset, localRecord) => {
    if (localDataset.length < 1) {
      throw new Error("heap unflow");
    }
    //delete
    exchangeData(1, localDataset.length, localDataset, localRecord);
    localDataset.pop();
    getMaxHeap(localDataset, 1, localRecord);
    return { dataset: localDataset, record: localRecord };
  },
};

export default HeapConcreteStrategy;
