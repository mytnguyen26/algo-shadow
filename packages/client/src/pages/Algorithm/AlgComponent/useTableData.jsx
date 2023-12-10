import { useState, useEffect } from 'react';

const useTableData = (localStorageKey) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem(localStorageKey);
    if (storedData) {
      setTableData(JSON.parse(storedData));
    }
  }, [localStorageKey]);

  const addTableRow = (newRowData) => {
    setTableData(prevData => {
      const updatedData = [...prevData, newRowData].slice(-10); // Keep the last 10 records
      localStorage.setItem(localStorageKey, JSON.stringify(updatedData));
      return updatedData;
    });
  };

  return { tableData, addTableRow };
};

export default useTableData;
