import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Dijkstra } from '../src/pages/Algorithm/DijkstraComponent/Dijkstra.jsx';
import * as d3 from 'd3';

// Mock window.alert
window.alert = jest.fn();

// 更新d3的mock
jest.mock('d3', () => {
  const remove = jest.fn().mockReturnThis(); // 添加remove函数的模拟
  const selectAll = jest.fn(() => ({ remove }));
  
  return {
    select: jest.fn(() => ({
      selectAll,
      data: jest.fn().mockReturnThis(),
      enter: jest.fn().mockReturnThis(),
      append: jest.fn().mockReturnThis(),
      attr: jest.fn().mockReturnThis(),
      text: jest.fn().mockReturnThis(),
      call: jest.fn().mockReturnThis(),
      on: jest.fn().mockReturnThis(),
      transition: jest.fn().mockReturnThis(),
      duration: jest.fn().mockReturnThis(),
      delay: jest.fn().mockReturnThis(),
    })),
    selectAll
  };
});

describe('Dijkstra Visualization', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders DijkstraGraph with initial nodes and links', () => {
    render(<Dijkstra />);
    expect(screen.getByText('Dijkstra')).toBeInTheDocument();
  });

  it('finds the shortest path when "Auto Start" is clicked', async () => {
    render(<Dijkstra />);
    const autoStartButton = screen.getByText('Auto Start');

    fireEvent.click(autoStartButton);

    await waitFor(() => {
      expect(d3.select).toHaveBeenCalled();
      // Add additional assertions here
    });
  });

  // Add more tests as needed
});