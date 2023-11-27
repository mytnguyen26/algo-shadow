/**
 * A GraphRenderer renders the visuals of the data structure for 
 * `algorithm`, as determined by `strategy` property.
 * GraphRenderer uses `strategy` property to set appropriate `AlgorithmSolver`
 * strategy to `solverStrategy` and use the strategy to apply algorithmic
 * logic to the input data
 */
import * as d3 from "d3";
import DijkstraConcreteStrategy from "./AlgorithmSolver/DijkstraConcreteStrategy"
import BSTConcreteStrategy from "./AlgorithmSolver/DijkstraConcreteStrategy"
// import HeapConcreteStrategy from "./AlgorithmSolver/HeapConcreteStrategy"

class GraphRenderer {
  constructor() {
    this._solverStrategy = null
    this.position = null
    }
  set solverStrategy(strategy) {
    switch(strategy) {
      case "dijkstra":
        this._solverStrategy = new DijkstraConcreteStrategy()
        this.position = "index"
        break;
      case "bst":
        this._solverStrategy = new BSTConcreteStrategy()
        this.position = "position"
        break;
      case "heap":
        this._solverStrategy = null
        this.position = "index"
        break;
      default:
        console.log("No algorithm solver found")
        break;
    }
  }

  /**
   * A helper function calculate the depth of the node
   * within the tree
   * @param {*} c is the position of the node
   * @returns 
   */
  getdepth (c) {
    return Math.ceil(Math.log2(c + 1)) - 1;
  }

  getx (c, width) {
    const depth = this.getdepth(c);
    const distance = 2 ** depth;
    const index = c - distance;
    return (width / (distance + 1)) * (index + 1);
  }
  
  addmove (c1, x1, x2, y1, y2, attributeNameX, attributeNameY) {
    // Animation for X-axis
    const animateElementX = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate",
    );
    animateElementX.setAttribute("attributeName", attributeNameX);
    animateElementX.setAttribute("from", x1);
    animateElementX.setAttribute("to", x2);
    animateElementX.setAttribute("begin", "0s");
    animateElementX.setAttribute("dur", "3s");
    animateElementX.setAttribute("fill", "freeze");
    c1.appendChild(animateElementX);
    animateElementX.beginElement();
  
    // Animation for Y-axis
    const animateElementY = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate",
    );
    animateElementY.setAttribute("attributeName", attributeNameY);
    animateElementY.setAttribute("from", y1);
    animateElementY.setAttribute("to", y2);
    animateElementY.setAttribute("begin", "0s");
    animateElementY.setAttribute("dur", "3s");
    animateElementY.setAttribute("fill", "freeze");
    c1.appendChild(animateElementY);
    animateElementY.beginElement();
  }

  /**
   * Renders the Graph from input dataset with D3 and svgRef
   * For each nodes, use svg to create circles, labels, and draw lines
   * between a source node and target nodes.
   * @param {*} dataset [description]
   * @param {*} svgRef [description]
   * 
   */
  createTree (dataset, svgRef) {
    const width = svgRef.current.clientWidth;
    //console.log(dataSetToUse)
    console.log(this.position)
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const my = 60;
    const p = svg
      .append("g")
      .attr("stroke", "black")
      .attr("stroke-width", "1")
      .selectAll("line")
      .data(dataset)
      .enter()
      .append("line")
      .attr("id", (c) => "l" + c[this.position])
      .attr("x1", (c) => (c[this.position] === 1 ? null : this.getx(c[this.position], width)))
      .attr("y1", (c) => (c[this.position] === 1 ? null : my * (this.getdepth(c[this.position]) + 1)))
      .attr("x2", (c) =>
        c[this.position] === 1 ? null : this.getx(Math.floor(c[this.position] / 2), width),
      )
      .attr("y2", (c) => (c[this.position] === 1 ? null : my * this.getdepth(c[this.position])));
    const c = svg
      .append("g")
      .attr("stroke", "black")
      .attr("fill", "white")
      .attr("stroke-width", "1")
      .selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("id", (c) => "c" + c[this.position])
      .attr("cx", (c) => this.getx(c[this.position], width))
      .attr("cy", (c) => my * (this.getdepth(c[this.position]) + 1))
      .attr("r", 20);
    const t = svg
      .append("g")
      .attr("stroke", "black")
      .attr("text-anchor", "middle")
      .attr("text-size", "10px")
      .selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .attr("id", (c) => "t" + c[this.position])
      .attr("dx", (c) => this.getx(c[this.position], width))
      .attr("dy", (c) => my * (this.getdepth(c[this.position]) + 1) + 5)
      .text((t) => t.value);
  }

  /**
   * Repetive Method to be removed/replaced by the general method
   * createTree 
   * @param {*} dataset 
   * @param {*} svgRef 
   */
  finalTree (dataset, svgRef) {
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
      .data(dataset)
      .enter()
      .append("line")
      .attr("id", (c) => "l" + c.index)
      .attr("x1", (c, i) => (i === 0 ? null : this.getx(i + 1, width)))
      .attr("y1", (c, i) => (i === 0 ? null : my * (this.getdepth(i + 1) + 1)))
      .attr("x2", (c, i) =>
        i === 0 ? null : this.getx(Math.floor((i + 1) / 2), width),
      )
      .attr("y2", (c, i) => (i === 0 ? null : my * this.getdepth(i + 1)));
    const c = svg
      .append("g")
      .attr("stroke", "black")
      .attr("fill", "white")
      .attr("stroke-width", "1")
      .selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("id", (c) => "c" + c.index)
      .attr("cx", (c, i) => this.getx(i + 1, width))
      .attr("cy", (c, i) => my * (this.getdepth(i + 1) + 1))
      .attr("r", 20);
    const t = svg
      .append("g")
      .attr("stroke", "black")
      .attr("text-anchor", "middle")
      .attr("text-size", "10px")
      .selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .attr("id", (c) => {
        return "t" + c.index;
      })
      .attr("dx", (c, i) => this.getx(i + 1, width))
      .attr("dy", (c, i) => my * (this.getdepth(i + 1) + 1) + 5)
      .text((t) => t.value);
  }

  /**
   * A helper function used in Graph to animate movement between 2 nodes
   * This method is helpful in Heap Algorithm animation
   * @param {*} c1 is the first node
   * @param {*} c2 is the second node
   */
  animateExchange (c1, c2) {
    let x1 = c1.getAttribute("dx") || c1.getAttribute("cx");
    let y1 = c1.getAttribute("dy") || c1.getAttribute("cy");
    let x2 = c2.getAttribute("dx") || c2.getAttribute("cx");
    let y2 = c2.getAttribute("dy") || c2.getAttribute("cy");
    const attributeNameX = c1.tagName.toLowerCase() === "text" ? "dx" : "cx";
    const attributeNameY = c1.tagName.toLowerCase() === "text" ? "dy" : "cy";

    this.addmove(c1, x1, x2, y1, y2, attributeNameX, attributeNameY);
    this.addmove(c2, x2, x1, y2, y1, attributeNameX, attributeNameY);

    c1.setAttribute("dx", x2);
    c1.setAttribute("dy", y2);
    c2.setAttribute("dx", x1);
    c2.setAttribute("dy", y1);
  }

  deleteElement (e, size) {
    document.getElementById("t" + e).style.display = "none";
    document.getElementById("c" + size).style.display = "none";
    document.getElementById("l" + size).style.display = "none";
  }

  showElement (e, size) {
    console.log(document.getElementById("t" + e));
    document.getElementById("t" + e).style.display = "block";
    document.getElementById("c" + size).style.display = "block";
    document.getElementById("l" + size).style.display = "block";
  }

  // drawLink (svg) {
  //   svg
  //     .selectAll(".link")
  //     .data(links)
  //     .enter()
  //     .append("line")
  //     .attr("class", "link")
  //     .attr("x1", (d) => nodes.find((node) => node.id === d.source).x)
  //     .attr("y1", (d) => nodes.find((node) => node.id === d.source).y)
  //     .attr("x2", (d) => nodes.find((node) => node.id === d.target).x)
  //     .attr("y2", (d) => nodes.find((node) => node.id === d.target).y)
  //     .attr("stroke", "black");
  // }

  // drawLabel (svg) {
  //   svg
  //     .selectAll(".link-label")
  //     .data(links)
  //     .enter()
  //     .append("text")
  //     .attr("class", "link-label")
  //     .attr(
  //       "x",
  //       (d) =>
  //         (nodes.find((node) => node.id === d.source).x +
  //           nodes.find((node) => node.id === d.target).x) /
  //         2
  //     )
  //     .attr(
  //       "y",
  //       (d) =>
  //         (nodes.find((node) => node.id === d.source).y +
  //           nodes.find((node) => node.id === d.target).y) /
  //         2
  //     )
  //     .text((d) => d.weight);
  // }

  // drawNodes (svg) {

  // }

}

export default GraphRenderer