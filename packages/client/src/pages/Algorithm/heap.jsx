import React, { useState, useEffect } from "react";
import HeapComponent from "./HeapComponent/HeapComponent";

function HeapPage() {
  const [data, setData] = useState([18, 4, 10, 13, 7, 9, 3, 2, 8, 1]);
  const [dataset, setDataset] = useState(datatran(data));
  const [record, setRecord] = useState([]);

  useEffect(() => {
    createHeap();
  }, [record]);

  function datatran(data) {
    return data.map((value, index) => ({
      index: index + 1,
      value: Number(value),
    }));
  }

  function validdata(tdata) {
    for (const ele of tdata) {
      if (isNaN(ele)) {
        return false;
      }
    }
    return true;
  }

  function createHeap() {
    setDataset(datatran(data));
  }

  function reset() {
    setDataset(datatran(record));
  }

  return (
    <div>
      <HeapComponent
        dataset={dataset}
        data={data}
        record={record}
        setData={setData}
        setRecord={setRecord}
      />

      <input id="create" placeholder="Enter comma separated numbers" />
      <button
        id="csubmit"
        onClick={() => {
          let tdata = document.getElementById("create").value.split(",");
          if (validdata(tdata)) {
            setData(tdata.map(Number));
            setRecord(tdata);
            console.log(record);
          } else {
            alert("Only numbers and commas can be entered");
          }
        }}
      >
        Create Heap
      </button>

      <input id="insert" placeholder="Insert a number" />
      <button
        id="isubmit"
        onClick={() => {
          let tdata = document.getElementById("insert").value.split(",");
          if (validdata(tdata) && tdata.length === 1) {
            // TODO: Define or import HeapComponent.insertheap
            // HeapComponent.insertheap(tdata[0], data, setData, record, setRecord);
          } else {
            alert(
              tdata.length !== 1
                ? "Only insert one number"
                : "Only numbers and commas can be entered",
            );
          }
        }}
      >
        Insert
      </button>

      <button id="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default HeapPage;
