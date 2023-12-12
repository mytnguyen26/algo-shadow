import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import HeapPage from '../src/pages/algorithm/Heap';
import HeapConcreteStrategy  from '../src/utils/algorithm-solver/heapSolver';

vi.stubGlobal('alert', vi.fn());
globalThis.alert = vi.fn();

describe('Heap Component Test', () => {
    beforeEach(() => {
        global.alert = vi.fn();
      });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Renders testing', () => {
    const { getByText, getByPlaceholderText } = render(<HeapPage />);
    expect(getByText('Create Heap')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter comma separated numbers')).toBeInTheDocument();
  });

});
describe('HeapConcreteStrategy', () => {
  let dataset;
  let record;

  beforeEach(() => {
    dataset = [{ index: 1, value: 10 }, { index: 2, value: 5 }, { index: 3, value: 15 }];
    record = [];
  });

  describe('buildMaxHeap', () => {
    it('should correctly transform an array into a max heap', () => {
      const result = HeapConcreteStrategy.buildMaxHeap(dataset, record);
      expect(result.dataset[0].value).toBeGreaterThanOrEqual(result.dataset[1].value);
      expect(result.dataset[0].value).toBeGreaterThanOrEqual(result.dataset[2].value);
    });
  });

  describe('insert', () => {
    it('should maintain max-heap property after insertion', () => {
      dataset.push({ index: 4, value: 20 });
      const result = HeapConcreteStrategy.insert(dataset, record);
      expect(result.dataset[0].value).toBe(20);
    });
  });

  describe('delete', () => {
    it('should maintain max-heap property after deletion', () => {
      HeapConcreteStrategy.buildMaxHeap(dataset, record);
      HeapConcreteStrategy.delete(1, dataset, record);
      expect(dataset[0].value).toBeGreaterThanOrEqual(dataset[1].value);
    });
  });

});