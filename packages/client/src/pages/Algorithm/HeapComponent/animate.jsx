import * as d3 from "d3";
import CAnimation from "../Common/Canimate";

const Animation = {
  createTree: (dataSetToUse, svgRef) => {
    const width = svgRef.current.clientWidth;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const p = svg
      .append("g")
      .attr("stroke", "black")
      .attr("stroke-width", "1")
      .selectAll("line")
      .data(dataSetToUse)
      .enter()
      .append("line")
      .attr("id", (c) => "l" + c.index)
      .attr("x1", (c) =>
        c.index === 1 ? null : CAnimation.getx(c.index, width),
      )
      .attr("y1", (c) =>
        c.index === 1
          ? null
          : CAnimation.my * (CAnimation.getdepth(c.index) + 1),
      )
      .attr("x2", (c) =>
        c.index === 1 ? null : CAnimation.getx(Math.floor(c.index / 2), width),
      )
      .attr("y2", (c) =>
        c.index === 1 ? null : CAnimation.my * CAnimation.getdepth(c.index),
      );
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
      .attr("cx", (c) => CAnimation.getx(c.index, width))
      .attr("cy", (c) => CAnimation.my * (CAnimation.getdepth(c.index) + 1))
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
      .attr("dx", (c) => CAnimation.getx(c.index, width))
      .attr("dy", (c) => CAnimation.my * (CAnimation.getdepth(c.index) + 1) + 5)
      .text((t) => t.value);
  },

  fianlTree: (dataSetToUse, svgRef) => {
    const width = svgRef.current.clientWidth;
    const svg = d3.select(svgRef.current);
    //console.log(dataSetToUse)
    svg.selectAll("*").remove();
    const p = svg
      .append("g")
      .attr("stroke", "black")
      .attr("stroke-width", "1")
      .selectAll("line")
      .data(dataSetToUse)
      .enter()
      .append("line")
      .attr("id", (c) => "l" + c.index)
      .attr("x1", (c, i) => (i === 0 ? null : CAnimation.getx(i + 1, width)))
      .attr("y1", (c, i) =>
        i === 0 ? null : CAnimation.my * (CAnimation.getdepth(i + 1) + 1),
      )
      .attr("x2", (c, i) =>
        i === 0 ? null : CAnimation.getx(Math.floor((i + 1) / 2), width),
      )
      .attr("y2", (c, i) =>
        i === 0 ? null : CAnimation.my * CAnimation.getdepth(i + 1),
      );
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
      .attr("cx", (c, i) => CAnimation.getx(i + 1, width))
      .attr("cy", (c, i) => CAnimation.my * (CAnimation.getdepth(i + 1) + 1))
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
      .attr("id", (c) => {
        return "t" + c.index;
      })
      .attr("dx", (c, i) => CAnimation.getx(i + 1, width))
      .attr(
        "dy",
        (c, i) => CAnimation.my * (CAnimation.getdepth(i + 1) + 1) + 5,
      )
      .text((t) => t.value);
  },
};

export default Animation;
