import React, { useEffect, useRef, useState } from "react";
import Animation from "./animate";
import Heapification from "./heapmethod";
const width = 600;
const height = 300;

//data: original data
//dataset: indexed data after heap

function HeapComponent({
  dataset,
  data,
  record,
  step,
  setDataset,
  setRecord,
  setStep,
}) {
  const svgRef = useRef(null);

  useEffect(() => {
    Animation.createTree(dataset, svgRef);
    Heapification.buildmaxheap(dataset, record);
    console.log(dataset);
  }, [data]);

  return (
    <div>
      <svg ref={svgRef} width={width} height={height}></svg>
      {/* <button onClick={initializeMaxHeap}>Build Max Heap</button> */}
    </div>
  );
}

export default HeapComponent;
