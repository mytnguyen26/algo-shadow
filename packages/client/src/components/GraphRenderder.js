import * as d3 from "d3";
import DijkstraConcreteStrategy from "./AlgorithmSolver/DijkstraConcreteStrategy"
import BSTConcreteStrategy from "./AlgorithmSolver/DijkstraConcreteStrategy"
import HeapConcreteStrategy from "./AlgorithmSolver/HeapConcreteStrategy"

export default const GraphRenderer = (strategy) => {

  let solverStrategy = (strategy) => {
    const solverStrategy = null

    switch(strategy) {
      case "dijkstra":
        solverStrategy = new DijkstraConcreteStrategy()
        break;
      case "bst":
        solverStrategy = new BSTConcreteStrategy()
      case "heap":
        solverStrategy = new HeapConcreteStrategy()
      default:
        console.log("No algorithm solver found")
        break;
    }
    return solverStrategy
  }

  const getdepth = (c) => {
    return Math.ceil(Math.log2(c + 1)) - 1;
  },

  /**
   * Renders the tree
   * 
   */
  createTree: (dataSetToUse, svgRef) => {
    const width = svgRef.current.clientWidth;
    //console.log(dataSetToUse)
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
      .attr("x1", (c) => (c.index === 1 ? null : getx(c.index, width)))
      .attr("y1", (c) => (c.index === 1 ? null : my * (getdepth(c.index) + 1)))
      .attr("x2", (c) =>
        c.index === 1 ? null : getx(Math.floor(c.index / 2), width),
      )
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
      .attr("cx", (c) => getx(c.index, width))
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
      .attr("dx", (c) => getx(c.index, width))
      .attr("dy", (c) => my * (getdepth(c.index) + 1) + 5)
      .text((t) => t.value);
  },

  finalTree: (dataSetToUse, svgRef) => {
    const width = svgRef.current.clientWidth;
    const svg = d3.select(svgRef.current);
    //console.log(dataSetToUse)
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
      .attr("x1", (c, i) => (i === 0 ? null : getx(i + 1, width)))
      .attr("y1", (c, i) => (i === 0 ? null : my * (getdepth(i + 1) + 1)))
      .attr("x2", (c, i) =>
        i === 0 ? null : getx(Math.floor((i + 1) / 2), width),
      )
      .attr("y2", (c, i) => (i === 0 ? null : my * getdepth(i + 1)));
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
      .attr("cx", (c, i) => getx(i + 1, width))
      .attr("cy", (c, i) => my * (getdepth(i + 1) + 1))
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
      .attr("dx", (c, i) => getx(i + 1, width))
      .attr("dy", (c, i) => my * (getdepth(i + 1) + 1) + 5)
      .text((t) => t.value);
  },

  animateExchange: (c1, c2) => {
    let x1 = c1.getAttribute("dx") || c1.getAttribute("cx");
    let y1 = c1.getAttribute("dy") || c1.getAttribute("cy");
    let x2 = c2.getAttribute("dx") || c2.getAttribute("cx");
    let y2 = c2.getAttribute("dy") || c2.getAttribute("cy");
    const attributeNameX = c1.tagName.toLowerCase() === "text" ? "dx" : "cx";
    const attributeNameY = c1.tagName.toLowerCase() === "text" ? "dy" : "cy";

    addmove(c1, x1, x2, y1, y2, attributeNameX, attributeNameY);
    addmove(c2, x2, x1, y2, y1, attributeNameX, attributeNameY);

    c1.setAttribute("dx", x2);
    c1.setAttribute("dy", y2);
    c2.setAttribute("dx", x1);
    c2.setAttribute("dy", y1);
  },

  deletelement: (e, size) => {
    document.getElementById("t" + e).style.display = "none";
    document.getElementById("c" + size).style.display = "none";
    document.getElementById("l" + size).style.display = "none";
  },

  showelement: (e, size) => {
    console.log(document.getElementById("t" + e));
    document.getElementById("t" + e).style.display = "block";
    document.getElementById("c" + size).style.display = "block";
    document.getElementById("l" + size).style.display = "block";
  },

  drawLink: (svg) => {
    svg
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("x1", (d) => nodes.find((node) => node.id === d.source).x)
      .attr("y1", (d) => nodes.find((node) => node.id === d.source).y)
      .attr("x2", (d) => nodes.find((node) => node.id === d.target).x)
      .attr("y2", (d) => nodes.find((node) => node.id === d.target).y)
      .attr("stroke", "black");
  },

  drawLabel: (svg) => {
    svg
      .selectAll(".link-label")
      .data(links)
      .enter()
      .append("text")
      .attr("class", "link-label")
      .attr(
        "x",
        (d) =>
          (nodes.find((node) => node.id === d.source).x +
            nodes.find((node) => node.id === d.target).x) /
          2
      )
      .attr(
        "y",
        (d) =>
          (nodes.find((node) => node.id === d.source).y +
            nodes.find((node) => node.id === d.target).y) /
          2
      )
      .text((d) => d.weight);
  },

  drawNodes: (svg) => {

  }

}