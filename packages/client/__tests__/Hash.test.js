import React from 'react';
import { render, fireEvent, waitFor, cleanup, queryAllByText } from '@testing-library/react';
import HashTableVisualization from '../src/pages/Algorithm/HashComponent/HashTableVisualization';
import { djb2Hash, hashFunc } from '../src/pages/Algorithm/HashComponent/HashTableLogic';
// Mock window.alert
window.alert = jest.fn();

describe('HashTableVisualization', () => {
  afterEach(cleanup);

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<HashTableVisualization />);
    expect(getByText('Hash')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter a number (0-99)')).toBeInTheDocument();
  });

  it('Insert testing', async () => {
    const { getByText, getByPlaceholderText } = render(<HashTableVisualization />);
    const input = getByPlaceholderText('Enter a number (0-99)');
    const insertButton = getByText('Insert');

    fireEvent.change(input, { target: { value: '23' } });
    fireEvent.click(insertButton);

    await waitFor(() => {
      expect(getByText('23')).toBeInTheDocument();
    }, { timeout: 1500 }); // Optionally adjust timeout to ensure animation completes
  });

  it('Insert out of range testing', () => {
    const { getByText, getByPlaceholderText } = render(<HashTableVisualization />);
    const input = getByPlaceholderText('Enter a number (0-99)');
    const insertButton = getByText('Insert');

    fireEvent.change(input, { target: { value: '100' } });
    fireEvent.click(insertButton);

    expect(window.alert).toHaveBeenCalledWith('Please enter a significant digit between 0 and 99!');
  });

  it('Duplicate testing', async () => {
    const { getByText, getByPlaceholderText, queryAllByText } = render(<HashTableVisualization />);
    const input = getByPlaceholderText('Enter a number (0-99)');
    const insertButton = getByText('Insert');
  
    // Inserting a value for the first time
    fireEvent.change(input, { target: { value: '23' } });
    fireEvent.click(insertButton);
  
    // Wait for the insertion animation to complete
    await waitFor(() => {
        expect(getByText('23')).toBeInTheDocument();
      }, { timeout: 5000 });
    
    // Try inserting the same value a second time
    fireEvent.change(input, { target: { value: '23' } });
    fireEvent.click(insertButton);
  
    // Check that the correct warning message pops up
    expect(window.alert).toHaveBeenCalledWith('The number already exists in the hash table!');
  
    //Make sure '23' is rendered only once
    const numberInstances = queryAllByText('23');
    expect(numberInstances.length).toBe(1);
  });
  
  
  it('Search testing', async () => {
    const { getByText, getByPlaceholderText } = render(<HashTableVisualization />);
    const input = getByPlaceholderText('Enter a number (0-99)');
    const insertButton = getByText('Insert');
    const searchButton = getByText('Search');
  
    // Inserting a value
    fireEvent.change(input, { target: { value: '23' } });
    fireEvent.click(insertButton);
  
    await waitFor(() => {
      expect(getByText('23')).toBeInTheDocument();
    }, { timeout: 5000 });
  
    // Setting the value to search for
    fireEvent.change(input, { target: { value: '23' } });
  
    // Searching for a value
    fireEvent.click(searchButton);
  
    await waitFor(() => {
      // This will depend on your implementation.
      expect(document.querySelector('.pulse-animation')).not.toBeNull();
    }, { timeout: 5000 });
  }, 5000);
  


  it('Delete testing', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<HashTableVisualization />);
    const input = getByPlaceholderText('Enter a number (0-99)');
    const insertButton = getByText('Insert');
    const deleteButton = getByText('Delete');
  
    // Inserting a value
    fireEvent.change(input, { target: { value: '23' } });
    fireEvent.click(insertButton);
  
    await waitFor(() => {
      expect(getByText('23')).toBeInTheDocument();
    }, { timeout: 5000 });
  
    // Setting the value to delete
    fireEvent.change(input, { target: { value: '23' } });
  
    // Deleting the value
    fireEvent.click(deleteButton);
  
    await waitFor(() => {
      expect(queryByText('23')).toBeNull();
    }, { timeout: 5000 });
  }, 5000);


  it('Deleting a value that was never inserted testing', async () => {
    const { getByText, getByPlaceholderText } = render(<HashTableVisualization />);
    const input = getByPlaceholderText('Enter a number (0-99)');
    const deleteButton = getByText('Delete');
  
    // Trying to delete a value that was never inserted
    fireEvent.change(input, { target: { value: '42' } });
    fireEvent.click(deleteButton);
  
    // Check that the correct warning message pops up
    expect(window.alert).toHaveBeenCalledWith('Value not found!');
  });

  describe('HashTable Algorithm Tests', () => {
    test('djb2Hash correctly hashes strings', () => {
      const hash = djb2Hash('test');
      expect(hash).toBe(-855818922);
    });
  
    test('hashFunc calculates correct position', () => {
      const position = hashFunc(23, 20);
      expect(position).toBe(3);
    });
  });

  afterEach(() => {
    window.alert.mockClear();
  });
});