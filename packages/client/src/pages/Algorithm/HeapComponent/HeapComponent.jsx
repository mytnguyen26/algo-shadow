import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Animation from "./animate";
const width = 600;
const height = 300;

//data: original data
//dataset: indexed data after heap

function HeapComponent({ dataset, data, record, setData, setRecord}) {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);


  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current && !isAnimating) {
      Animation.createTree(dataset,svgRef);
      buildmaxheap();
    }
}, [dataset, isAnimating]);

const maxheap = (localDataset, i, localRecord) => {
  const n = localDataset.length;
  const left = 2 * i;
  const right = 2 * i + 1;
  let largest = i;
  if (left <= n && localDataset[left - 1].value > localDataset[largest - 1].value) {
    largest = left;
  }
  if (right <= n && localDataset[right - 1].value > localDataset[largest - 1].value) {
    largest = right;
  }
  if (largest !== i) {
    localRecord.push({ 
      e1: {index: localDataset[i - 1].index }, 
      e2: {index: localDataset[largest - 1].index }
    });
     // Swap
     let temp = localDataset[i - 1];
     localDataset[i - 1] = localDataset[largest - 1];
     localDataset[largest - 1] = temp;
    maxheap(localDataset, largest, localRecord)

    // Recursively heapify the affected subtree
  }
  //console.log(localRecord);
  return { dataset: localDataset, record: localRecord };
  };

const [currentIndex, setCurrentIndex] = useState(Math.floor(data.length / 2));


const buildmaxheap = () => {

  let result = 0;
  for(var i = Math.floor(dataset.length/2) ;i>0;i--)
  {
    result = maxheap(dataset,i,record)
  }
  console.log("Heapification completed!");
  let tempDataset = result.dataset;
  let tempRecord = result.record; // Create a temporary record
};

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


const animateExchange = (c1, c2) => {
  let x1 = c1.getAttribute("dx") || c1.getAttribute("cx");
  let y1 = c1.getAttribute("dy") || c1.getAttribute("cy");
  let x2 = c2.getAttribute("dx") || c2.getAttribute("cx");
  let y2 = c2.getAttribute("dy") || c2.getAttribute("cy");
  const attributeNameX = c1.tagName.toLowerCase() === "text" ? "dx" : "cx";
  const attributeNameY = c1.tagName.toLowerCase() === "text" ? "dy" : "cy";

  addmove(c1, x1, x2, y1, y2, attributeNameX, attributeNameY);
  addmove(c2, x2, x1, y2, y1, attributeNameX, attributeNameY);

  c1.setAttribute("dx", x2);
  c1.setAttribute("dy", y2);
  c2.setAttribute("dx", x1);
  c2.setAttribute("dy", y1);
};

const addmove = (c1, x1, x2, y1, y2, attributeNameX, attributeNameY) => {
  // Animation for X-axis
  const animateElementX = document.createElementNS("http://www.w3.org/2000/svg", "animate");
  animateElementX.setAttribute("attributeName", attributeNameX);
  animateElementX.setAttribute("from", x1);
  animateElementX.setAttribute("to", x2);
  animateElementX.setAttribute("begin", "0s");
  animateElementX.setAttribute("dur", "3s");
  animateElementX.setAttribute("fill", "freeze");
  c1.appendChild(animateElementX);
  animateElementX.beginElement();

  // Animation for Y-axis
  const animateElementY = document.createElementNS("http://www.w3.org/2000/svg", "animate");
  animateElementY.setAttribute("attributeName", attributeNameY);
  animateElementY.setAttribute("from", y1);
  animateElementY.setAttribute("to", y2);
  animateElementY.setAttribute("begin", "0s");
  animateElementY.setAttribute("dur", "3s");
  animateElementY.setAttribute("fill", "freeze");
  c1.appendChild(animateElementY);
  animateElementY.beginElement();
};


const animateSwap = (swapRecord) => {
  setIsAnimating(true);
  // Assuming swapRecord.e1 and swapRecord.e2 contains the data of the two nodes to be swapped

  // Get the elements by their ID using D3
  const node1 = d3.select(`#t${swapRecord.e1.index}`);
  const node2 = d3.select(`#t${swapRecord.e2.index}`);
  console.log(node1)
  // Animate the swap using your exchangetext function
  if (node1.node() && node2.node()) {
    animateExchange(node1.node(), node2.node());
  }

  // Assuming your animation duration is 3 seconds as in your previous code
  const animationDuration = 3; // Duration in seconds
  setTimeout(() => {
    setIsAnimating(false);
  }, animationDuration * 1000);
}

const nextStep = () => {
  if(step>=record.length)
    alert("The heap is end")
  else
  {
    
    const text1 = document.getElementById("t" + record[0].e1);
    const text2 = document.getElementById("t" + record[0].e2);
    animateSwap(record[0]);
  }
  return step+1
}

return (
    <div>
        <svg ref={svgRef} width={width} height={height}></svg>
        {/* <button onClick={initializeMaxHeap}>Build Max Heap</button> */}
        <button onClick={nextStep}>Next Step</button>
    </div>
);
}

export default HeapComponent;
