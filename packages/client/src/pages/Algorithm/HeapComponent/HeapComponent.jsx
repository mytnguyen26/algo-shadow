import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Animation from "./animate";
const width = 600;
const height = 300;

//data: original data
//dataset: indexed data after heap

const buildmaxheap = (dataset,record) => {
  for(var i = Math.floor(dataset.length/2) ;i>0;i--)
  {
    maxheap(dataset,i,record)
  }
  console.log("Heapification completed!");
}

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

function HeapComponent({ dataset, data, record, setData, setRecord}) {
  const [step, setStep] = useState(0);
  const svgRef = useRef(null);

  useEffect(() => {
    Animation.createTree(dataset,svgRef);
    buildmaxheap(dataset,record);
  },[data]);


function insertheap(newValue) {
  const newData = [...data, Number(newValue)];
  setData(newData);
  const dataset = newData.map((value, index) => ({ index: index + 1, value }));

  // Get the index of the newly added element.
  let currentIndex = dataset.length;

  // Heapify: Move the new element up the tree to maintain the max-heap property.
  while (currentIndex > 1) {
    const parentIndex = Math.floor(currentIndex / 2) - 1;

    if (dataset[currentIndex - 1].value > dataset[parentIndex].value) {
      // Swap the current element with its parent.
      const temp = dataset[currentIndex - 1];
      dataset[currentIndex - 1] = dataset[parentIndex];
      dataset[parentIndex] = temp;

      // Update the record with the swap information.
      const newRecord = [...record, { e1: dataset[currentIndex - 1], e2: dataset[parentIndex] }];
      setRecord(newRecord);

      // Move up to the parent index.
      currentIndex = parentIndex + 1;
    } else {
      // The max-heap property is satisfied; no need to swap further.
      break;
    }
  }
}

const nextStep = () => {
  if(step>=record.length)
  {
    alert("Heap is end!")
  }
  else
  {
    const text1 = document.getElementById("t" + record[step].e1);
    const text2 = document.getElementById("t" + record[step].e2);
    Animation.animateExchange(text1,text2);
  }
  setStep(step+1)
}

return (
    <div>
        <svg ref={svgRef} width={width} height={height}></svg>
        {/* <button onClick={initializeMaxHeap}>Build Max Heap</button> */}
        <button onClick={()=>{nextStep()}}>Next Step</button>
    </div>
);
}

export default HeapComponent;
