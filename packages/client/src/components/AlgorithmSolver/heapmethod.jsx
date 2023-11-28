const maxheap = (localDataset, i, localRecord) => {
  const n = localDataset.length;
  const left = 2 * i;
  const right = 2 * i + 1;
  let largest = 0;
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
    exchanegdata(i, largest, localDataset, localRecord);
    // Recursively heapify the affected subtree
    maxheap(localDataset, largest, localRecord);
  }
  return { dataset: localDataset, record: localRecord };
};

const exchanegdata = (index1, index2, localDataset, localRecord) => {
  localRecord.push({
    e1: localDataset[index1 - 1].index,
    e2: localDataset[index2 - 1].index,
  });
  // Swap
  let temp = localDataset[index1 - 1];
  localDataset[index1 - 1] = localDataset[index2 - 1];
  localDataset[index2 - 1] = temp;
};

const extraheap = (localDataset, localRecord) => {
  if (localDataset.length < 1) {
    throw new Error("heap unflow");
  }
  //delete
  exchanegdata(1, localDataset.length, localDataset, localRecord);
  localDataset.pop();
  maxheap(localDataset, 1, localRecord);
  return { dataset: localDataset, record: localRecord };
};

const getparent = (i) => {
  return Math.floor(i / 2);
};

const increasekey = (i, key, localDataset, localRecord) => {
  if (key < localDataset[i - 1].value) {
    throw new Error("new value is smaller than before");
  }
  localDataset[i - 1].value = key;
  while (
    i > 1 &&
    localDataset[getparent(i) - 1].value < localDataset[i - 1].value
  ) {
    console.log("exchange:" + i + "," + getparent(i));
    exchanegdata(getparent(i), i, localDataset, localRecord);
    i = getparent(i);
  }
  return { dataset: localDataset, record: localRecord };
};

const Heapification = {
  buildmaxheap: (dataset, record) => {
    let result = 0;
    for (var i = Math.floor(dataset.length / 2); i > 0; i--) {
      result = maxheap(dataset, i, record);
    }
    console.log("Heapification completed!");
    return result;
  },
  insertheap: (localDataset, localRecord) => {
    const n = localDataset.length;
    let i = n;
    while (i > 1) {
      const parentIndex = getparent(i);
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

  deleteheap: (index, localDataset, localRecord) => {
    let max = localDataset[0].value + 1;
    increasekey(index, max, localDataset, localRecord);
    extraheap(localDataset, localRecord);
  },
};

export default Heapification;
