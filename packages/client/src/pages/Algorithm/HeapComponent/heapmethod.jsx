const maxheap = (localDataset, i, localRecord) => {
    const n = localDataset.length;
    const left = 2 * i;
    const right = (2 * i) + 1;
    let largest = 0;
    if (left <= n && localDataset[left - 1].value > localDataset[i - 1].value) {
      largest = left;
    }
    else
    {
      largest = i
    }
  
    if (right <= n && localDataset[right - 1].value > localDataset[largest - 1].value) {
      largest = right;
    }
    
    if (largest !== i) {
      localRecord.push({ 
        e1:localDataset[i - 1].index, 
        e2:localDataset[largest - 1].index
      });
      // Swap
      let temp = localDataset[i - 1];
      localDataset[i - 1] = localDataset[largest - 1];
      localDataset[largest - 1] = temp;
      maxheap(localDataset, largest, localRecord)
  
      // Recursively heapify the affected subtree
    }
    return { dataset: localDataset, record: localRecord };
  };

const Heapification = {
    buildmaxheap:(dataset,record) => {
        let result = 0;
        for(var i = Math.floor(dataset.length/2) ;i>0;i--)
        {
            result = maxheap(dataset,i,record)
        }
        console.log("Heapification completed!")
        return result
    },
    insertheap: (localDataset, localRecord) => {
      const n = localDataset.length;
      let i = n;
      while (i > 1) {
        const parentIndex = Math.floor(i / 2);
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
    deleteheap:()=>{

    },
}

export default Heapification;