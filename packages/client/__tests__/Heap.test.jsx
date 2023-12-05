import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Heap from '../src/pages/Algorithm/heap';
import Heapification from '../src/pages/Algorithm/HeapComponent/heapmethod';

vi.stubGlobal('alert', vi.fn());
globalThis.alert = vi.fn();

describe('Heap Component Test', () => {
    beforeEach(() => {
        global.alert = vi.fn();
      });

  afterEach(() => {
    // Restore all mocks after each test
    vi.restoreAllMocks();
  });

  it('Renders testing', () => {
    // Render component and check if certain texts are in the document
    const { getByText, getByPlaceholderText } = render(<Heap />);
    expect(getByText('Create Heap')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter comma separated numbers')).toBeInTheDocument();
  });

 it('Heap Insert testing', async () => {
    const { getByText, getByPlaceholderText } = render(<Heap />);
    const input = getByPlaceholderText('Insert a number');
    const insertButton = getByText('Insert');
    fireEvent.change(input, { target: { value: '15' } });
    fireEvent.click(insertButton);
  
    // 这里需要确保组件内部实际调用了alert函数
    // 可以通过组件的实际行为来判断是否应该调用alert
    await waitFor(() => expect(global.alert).toHaveBeenCalledWith('Value inserted!'));
  });
  
  it('Heap Delete testing', async () => {
    const { getByText, getByPlaceholderText } = render(<Heap />);
    const input = getByPlaceholderText('Delete a number');
    const deleteButton = getByText('Delete');
    fireEvent.change(input, { target: { value: '15' } });
    fireEvent.click(deleteButton);
  
    // 同上，确保组件内部实际调用了alert函数
    await waitFor(() => expect(global.alert).toHaveBeenCalledWith('Value deleted!'));
  });
  
  it('Heapify testing', () => {
    // Test the heapification logic
    let dataset = [{ value: 5 }, { value: 3 }, { value: 2 }];
    let record = [];
    Heapification.buildmaxheap(dataset, record);
    expect(dataset).toEqual([{ value: 5 }, { value: 3 }, { value: 2 }]);
  });
});