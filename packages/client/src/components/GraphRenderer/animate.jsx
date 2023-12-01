import * as d3 from "d3";
import CAnimation from "../../pages/Algorithm/Common/Canimate"

const Animation = {
  createTree: (dataSetToUse, svgRef) => {
    const width = svgRef.current.clientWidth;
    const svg = d3.select(svgRef.current);
    console.log("Before heap")
    dataSetToUse.forEach(element => {
      console.log(element)
    })
    console.log("After heap")
    console.log(dataSetToUse)
    svg.selectAll("*").remove();
    const p = svg
      .append("g")
      .attr("stroke", "black")
      .attr("stroke-width", "1")
      .selectAll("line")
      .data(dataSetToUse)
      .enter()
      .append("line")
      .attr("id", (c) => "l" + c.position)
      .attr("x1", (c) => (c.position === 1 ? null : CAnimation.getx(c.position, width)))
      .attr("y1", (c) => (c.position === 1 ? null : CAnimation.my * (CAnimation.getdepth(c.position) + 1)))
      .attr("x2", (c) =>
        c.position === 1 ? null : CAnimation.getx(Math.floor(c.position / 2), width),
      )
      .attr("y2", (c) => (c.position === 1 ? null : CAnimation.my * CAnimation.getdepth(c.position)));
    const c = svg
      .append("g")
      .attr("stroke", "black")
      .attr("fill", "white")
      .attr("stroke-width", "1")
      .selectAll("circle")
      .data(dataSetToUse)
      .enter()
      .append("circle")
      .attr("id", (c) => "c" + c.position)
      .attr("cx", (c) => CAnimation.getx(c.position, width))
      .attr("cy", (c) => CAnimation.my * (CAnimation.getdepth(c.position) + 1))
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
      .attr("id", (c) => "t" + c.position)
      .attr("dx", (c) => CAnimation.getx(c.position, width))
      .attr("dy", (c) => CAnimation.my * (CAnimation.getdepth(c.position) + 1) + 5)
      .text((t) => t.value);
  },

  fianlTree: (dataSetToUse, svgRef) => {
    const width = svgRef.current.clientWidth;
    const svg = d3.select(svgRef.current);
    console.log("finalTree", dataSetToUse)
    svg.selectAll("*").remove();
    const p = svg
      .append("g")
      .attr("stroke", "black")
      .attr("stroke-width", "1")
      .selectAll("line")
      .data(dataSetToUse)
      .enter()
      .append("line")
      .attr("id", (c) => "l" + c.position)
      .attr("x1", (c, i) => (i === 0 ? null : CAnimation.getx(i + 1, width)))
      .attr("y1", (c, i) => (i === 0 ? null : CAnimation.my * (CAnimation.getdepth(i + 1) + 1)))
      .attr("x2", (c, i) =>
        i === 0 ? null : CAnimation.getx(Math.floor((i + 1) / 2), width),
      )
      .attr("y2", (c, i) => (i === 0 ? null : CAnimation.my * CAnimation.getdepth(i + 1)));
    const c = svg
      .append("g")
      .attr("stroke", "black")
      .attr("fill", "white")
      .attr("stroke-width", "1")
      .selectAll("circle")
      .data(dataSetToUse)
      .enter()
      .append("circle")
      .attr("id", (c) => "c" + c.position)
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
        return "t" + c.position;
      })
      .attr("dx", (c, i) => CAnimation.getx(i + 1, width))
      .attr("dy", (c, i) => CAnimation.my * (CAnimation.getdepth(i + 1) + 1) + 5)
      .text((t) => t.value);
  },
};

export default Animation;