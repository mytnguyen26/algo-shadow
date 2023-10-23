import * as d3 from "d3";
const width = 700;
const height = 300;
const getdepth = (c) => {
  return Math.ceil(Math.log2(c + 1)) - 1;
};

const getx = (c) => {
  const depth = getdepth(c);
  const distance = 2 ** depth;
  const index = c - distance;
  return (width / (distance + 1)) * (index + 1);
};
const Animation = {
  createTree: (dataSetToUse, svgRef) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const my = 60;
    const p = svg
      .append("g")
      .attr("stroke", "black")
      .attr("stroke-width", "1")
      .selectAll("line")
      .data(dataSetToUse)
      .enter()
      .append("line")
      .attr("id", (c) => "l" + c.index)
      .attr("x1", (c) => (c.index === 1 ? null : getx(c.index)))
      .attr("y1", (c) => (c.index === 1 ? null : my * (getdepth(c.index) + 1)))
      .attr("x2", (c) => (c.index === 1 ? null : getx(Math.floor(c.index / 2))))
      .attr("y2", (c) => (c.index === 1 ? null : my * getdepth(c.index)));
    const c = svg
      .append("g")
      .attr("stroke", "black")
      .attr("fill", "white")
      .attr("stroke-width", "1")
      .selectAll("circle")
      .data(dataSetToUse)
      .enter()
      .append("circle")
      .attr("id", (c) => "c" + c.index)
      .attr("cx", (c) => getx(c.index))
      .attr("cy", (c) => my * (getdepth(c.index) + 1))
      .attr("r", 20);
    const t = svg
      .append("g")
      .attr("stroke", "black")
      .attr("text-anchor", "middle")
      .attr("text-size", "10px")
      .selectAll("text")
      .data(dataSetToUse)
      .enter()
      .append("text")
      .attr("id", (c) => "t" + c.index)
      .attr("dx", (c) => getx(c.index))
      .attr("dy", (c) => my * (getdepth(c.index) + 1) + 5)
      .text((t) => t.value);
  },
};

export default Animation;
