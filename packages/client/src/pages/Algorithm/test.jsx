import React from 'react';
import { Graph } from 'react-graph-vis';

const GraphComponent = () => {
  const graph = {
    nodes: [{ id: 1, label: 'Node 1' }, { id: 2, label: 'Node 2' }],
    edges: [{ from: 1, to: 2 }]
  };

  const options = {
    layout: {
      hierarchical: true
    }
  };

  return (
    <Graph graph={graph} options={options} />
  );
};

export default GraphComponent;
