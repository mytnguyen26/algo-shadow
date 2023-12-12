
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import HashTablePage from '../src/pages/algorithm/Hash'
import { djb2Hash, hashFunc } from '../src/utils/algorithm-solver/hashTableSolver';
import useTableData from '../src/pages/algorithm/algo-component/useTableData';

const mockedAlert = vi.fn();
// Mock global alert function
globalThis.alert = vi.fn();

vi.mock('../src/pages/algorithm/algo-component/useTableData', () => ({
  default: () => ({
    tableData: [],
    addTableRow: vi.fn(),
  }),
}));

describe('Hash Component Test', () => {
  afterEach(() => {
    // Restore all mocks after each test
    vi.restoreAllMocks();
  });

  it('Renders testing', () => {
    // Render component and check if certain texts are in the document
    const { getByText, getByPlaceholderText } = render(<HashTablePage />);
    expect(getByText('Hash')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter a number (0-99)')).toBeInTheDocument();
  });

  it('Insert testing', async () => {

     // Test inserting a value into the hash
    const { getByText, getByPlaceholderText } = render(<HashTablePage />);
    const input = getByPlaceholderText('Enter a number (0-99)');
    const insertButton = getByText('Insert');

    fireEvent.change(input, { target: { value: '23' } });
    fireEvent.click(insertButton);
    // Wait for the value to be visible after insertion
    await waitFor(() => expect(getByText('23')).toBeVisible(), { timeout: 10000 });
  }), { timeout: 100000 };

  it('Search testing', async () => {
    // Test searching for a value in the hash
    const { getByText, getByPlaceholderText } = render(<HashTablePage />);
    const input = getByPlaceholderText('Enter a number (0-99)');
    const insertButton = getByText('Insert');
    const searchButton = getByText('Search');
  
    fireEvent.change(input, { target: { value: '23' } });
    fireEvent.click(insertButton);

    // Wait for the value to be inserted
    await waitFor(() => expect(getByText('23')).toBeVisible(), { timeout: 5000 });
  

    fireEvent.change(input, { target: { value: '23' } });
    fireEvent.click(searchButton);

    // Wait for the search results
    await waitFor(() => {
      expect(document.querySelector('.pulse-animation')).not.toBeNull();
    }, { timeout: 5000 });
  }, 7000);
  
  it('Delete testing', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<HashTablePage />);
    const input = getByPlaceholderText('Enter a number (0-99)');
    const insertButton = getByText('Insert');
    const deleteButton = getByText('Delete');
  
    // Insert a value first
        fireEvent.change(input, { target: { value: '23' } });
        fireEvent.click(insertButton);

    // Wait for the insertion animation to complete
    await waitFor(() => expect(getByText('23')).toBeVisible(), { timeout: 5000 });
  
    fireEvent.change(input, { target: { value: '23' } });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(queryByText('23')).toBeNull();
    }, { timeout: 5000 });
  }, 5000);

});

describe('Hash Algorithm Tests', () => {
    it('djb2Hash testing', () => {
      const hash = djb2Hash('test');
      expect(hash).toBe(-855818922);
    });
  
    it('Position calculate testing', () => {
      const position = hashFunc('23', 20);
      expect(position).toBeLessThan(20);
    });
  });