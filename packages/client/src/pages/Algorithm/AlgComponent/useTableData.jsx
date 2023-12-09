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
      const updatedData = [...prevData, newRowData];
      localStorage.setItem(localStorageKey, JSON.stringify(updatedData));
      return updatedData;
    });
  };

  return { tableData, addTableRow };
};

export default useTableData;
