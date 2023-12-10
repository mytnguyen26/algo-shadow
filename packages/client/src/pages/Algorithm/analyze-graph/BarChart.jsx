import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import * as d3 from "d3";

export const BarChart = ({ data }) => {
  const svgRef = useRef();
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    // Set up chart dimensions
    const margin = { top: 20, right: 10, bottom: 30, left: 30 };
    const width = 1000 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create axes
    const xScale = d3
      .scaleBand()
      .domain(data.map((d, i) => i))
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .range([height, 0]);

    // setting up the axis
    const xAxis = d3.axisBottom(xScale).ticks(data.length);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    // Create chart group with margins
    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // create x-axis
    chart.append("g").call(xAxis).attr("transform", `translate(0, ${height})`);

    // create y-axis
    chart.append("g").call(yAxis);

    // Create bars
    chart
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d))
      .attr("fill", "blue");
  }, [data]);

  return (
    <Box>
      <svg ref={svgRef} width={1000} height={400} />
    </Box>
  );
};
