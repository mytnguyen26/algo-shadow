import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import BST from '../src/pages/Algorithm/bst'; 

// Mock 全局的 alert
window.alert = jest.fn();

// Mock CAnimation 对象和它的方法
jest.mock('../src/pages/Algorithm/Common/Canimate', () => ({
  Pathdisplay: jest.fn(),
  // 添加更多你需要模拟的 Canimate 方法
}));

// Mock Common 对象和它的方法
jest.mock('../src/pages/Algorithm/Common/Canimate', () => ({
  validdata: jest.fn(),
  validonedata: jest.fn(),
  nextStep: jest.fn(),
  back: jest.fn(),
  findinarray: jest.fn().mockImplementation((value, array) => array.findIndex(item => item.value === value)),
}));

describe('BST Component', () => {
  afterEach(cleanup);

  test('renders correctly', () => {
    render(<BST />);
    expect(screen.getByText('Binary Search Tree')).toBeInTheDocument();
  });

  test('allows user to insert a number', async () => {
    render(<BST />);
    const insertInput = screen.getByPlaceholderText('Enter a number');
    fireEvent.change(insertInput, { target: { value: '5' } });

    const insertButton = screen.getByText('Insert');
    fireEvent.click(insertButton);

    // Replace the following with your actual DOM updates or alert checks
    expect(window.alert).toHaveBeenCalledWith('Node inserted');
  });

  test('allows user to search for a number', async () => {
    render(<BST />);
    const searchInput = screen.getByPlaceholderText('Enter a number');
    fireEvent.change(searchInput, { target: { value: '5' } });

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    // Replace the following with your actual DOM updates or alert checks
    expect(window.alert).toHaveBeenCalledWith('Value found!');
  });

  test('allows user to delete a number', async () => {
    render(<BST />);
    const deleteInput = screen.getByPlaceholderText('Enter a number');
    fireEvent.change(deleteInput, { target: { value: '5' } });

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    // Replace the following with your actual DOM updates or alert checks
    expect(window.alert).toHaveBeenCalledWith('Node deleted');
  });

  // Add more tests as needed for other interactions
});