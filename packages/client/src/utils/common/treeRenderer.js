/**
 * A TreeGraphRenderer renders the visuals of the data structure for
 * `algorithm`. It is only responsible
 * for visualizing data after manipulation or computation by one of the
 * algorithm-solver strategy
 */
import * as d3 from "d3";

class TreeGraphRenderer {
  static addMove(c1, x1, x2, y1, y2, attributeNameX, attributeNameY) {
    // Animation for X-axis
    const animateElementX = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate"
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
      "animate"
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
   * A helper function used in Graph to animate movement between 2 nodes
   * This method is helpful in Heap algorithm animation
   * @param {*} c1 is the first node
   * @param {*} c2 is the second node
   */
  static animateExchange(c1, c2) {
    let x1 = c1.getAttribute("dx") || c1.getAttribute("cx");
    let y1 = c1.getAttribute("dy") || c1.getAttribute("cy");
    let x2 = c2.getAttribute("dx") || c2.getAttribute("cx");
    let y2 = c2.getAttribute("dy") || c2.getAttribute("cy");
    const attributeNameX = c1.tagName.toLowerCase() === "text" ? "dx" : "cx";
    const attributeNameY = c1.tagName.toLowerCase() === "text" ? "dy" : "cy";

    TreeGraphRenderer.addMove(
      c1,
      x1,
      x2,
      y1,
      y2,
      attributeNameX,
      attributeNameY
    );
    TreeGraphRenderer.addMove(
      c2,
      x2,
      x1,
      y2,
      y1,
      attributeNameX,
      attributeNameY
    );

    c1.setAttribute("dx", x2);
    c1.setAttribute("dy", y2);
    c2.setAttribute("dx", x1);
    c2.setAttribute("dy", y1);
  }

  /**
   * A helper function used in Graph to animate removal of nodes and links
   * @param {*} e
   * @param {*} size
   */
  static deleteElement(e, size) {
    document.getElementById("t" + e).style.display = "none";
    document.getElementById("c" + size).style.display = "none";
    document.getElementById("l" + size).style.display = "none";
  }

  /**
   * TODO
   * @param {*} e
   * @param {*} size
   */
  static showElement(e, size) {
    document.getElementById("t" + e).style.display = "block";
    document.getElementById("c" + size).style.display = "block";
    document.getElementById("l" + size).style.display = "block";
  }

  /**
   * TODO
   * @param {*} circle
   * @param {*} attribute
   * @param {*} color
   */
  static pathDisplay(circle, attribute, color) {
    // Set up the circle gradient animation
    const circleAnimate = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate"
    );
    circleAnimate.setAttribute("attributeName", attribute);
    circleAnimate.setAttribute("values", color);
    circleAnimate.setAttribute("dur", "1s");
    circleAnimate.setAttribute("fill", "freeze");

    circle.appendChild(circleAnimate);
    circleAnimate.beginElement();
  }

  /**
   * Renders the Graph from input dataset with D3 and svgRef
   * For each nodes, use svg to create circles, labels, and draw lines
   * between a source node and target nodes.
   * @param {*} dataset [description]
   * @param {*} svgRef [description]
   *
   */
  static renderGraph(animationData, svgRef) {
    const width = svgRef.current.clientWidth;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const my = 60;
    const p = svg
      .append("g")
      .attr("stroke", "black")
      .attr("stroke-width", "1")
      .selectAll("line")
      .data(animationData.dataset)
      .enter()
      .append("line")
      .attr("id", (c) => "l" + c.position)
      .attr("x1", (c) => animationData.getx1(c, width, "line"))
      .attr("y1", (c) => animationData.gety1(c, my, "line"))
      .attr("x2", (c) => animationData.getx2(c, width))
      .attr("y2", (c) => animationData.gety2(c, my));
    // append circle for node
    const c = svg
      .append("g")
      .attr("stroke", "black")
      .attr("fill", "white")
      .attr("stroke-width", "1")
      .selectAll("circle")
      .data(animationData.dataset)
      .enter()
      .append("circle")
      .attr("id", (c) => "c" + c.position)
      .attr("cx", (c) => animationData.getx1(c, width))
      .attr("cy", (c) => animationData.gety1(c, my))
      .attr("r", 20);
    // append label
    const t = svg
      .append("g")
      .attr("stroke", "black")
      .attr("text-anchor", "middle")
      .attr("text-size", "10px")
      .selectAll("text")
      .data(animationData.dataset)
      .enter()
      .append("text")
      .attr("id", (c) => "t" + c.position)
      .attr("dx", (c) => animationData.getx1(c, width))
      .attr("dy", (c) => animationData.gety1(c, my) + 5)
      .text((t) => t.value);
  }

  /**
   * TODO
   * @param {*} index
   */
  static pathDisappear(index) {
    document.getElementById("c" + index).setAttribute("stroke", "black");
    if (index != 1) {
      document.getElementById("l" + index).setAttribute("stroke", "black");
    }
  }
}

export default TreeGraphRenderer;
