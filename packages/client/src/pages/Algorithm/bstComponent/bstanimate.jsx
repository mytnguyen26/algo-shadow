import * as d3 from "d3";

function getdepth(c) {
  return Math.ceil(Math.log2(c + 1)) - 1;
}

function getx(c, width) {
  var depth = getdepth(c);
  var distance = 2 ** depth;
  var index = c - 2 ** depth;
  return (width / (distance + 1)) * (index + 1);
}
const my = 60;
const AnimationB = {
  pathDisplay(index) {
    const circle = document.getElementById("c" + index);
    const line = document.getElementById("l" + index);

    // 设置圆形的渐变动画
    const circleAnimate = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate",
    );
    circleAnimate.setAttribute("attributeName", "stroke");
    circleAnimate.setAttribute("values", "black;blue");
    circleAnimate.setAttribute("dur", "2s");
    circleAnimate.setAttribute("fill", "freeze");

    circle.appendChild(circleAnimate);
    circleAnimate.beginElement();

    //设置线段的渐变动画
    if (index !== 1) {
      const lineAnimate = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "animate",
      );
      lineAnimate.setAttribute("attributeName", "stroke");
      lineAnimate.setAttribute("values", "black;blue");
      lineAnimate.setAttribute("fill", "freeze");
      lineAnimate.setAttribute("dur", "5s");
      lineAnimate.setAttribute("fill", "freeze");
      lineAnimate.setAttribute("begin", "c" + index + ".animate.end");
      line.appendChild(lineAnimate);
      lineAnimate.beginElement();
    }
  },

  pathDisappear(index) {
    document.getElementById("c" + index).setAttribute("stroke", "black");
    if (index != 1) {
      document.getElementById("l" + index).setAttribute("stroke", "black");
    }
  },

  addGradients(dataset, svgRef) {
    const width = svgRef.current.clientWidth;
    const svg = d3.select(svgRef.current);
    var layer2 = document.getElementById("circle");

    // Create a new group with a unique ID
    var circles = svg.append("g").attr("id", "newCircleGroup");

    // Append circles to the group
    if (true) {
      console.log("isAuto");
      circles
        .selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("id", function (c) {
          return "c" + c.position;
        })
        .attr("cx", function (c) {
          return getx(c.position, width);
        })
        .attr("cy", function (c) {
          return my * (getdepth(c.position) + 1);
        })
        .attr("r", 20)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 600)
        .attr("fill", (d) => "blue")
        .style("stroke", (d) => "blue" || "blue")
        .transition()
        .duration(1000)
        .delay((d, i) => (i + 4) * 400); // Adjust the delay as needed
    } else {
      circles
        .selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("r", 20)
        .style("fill", (d, i) => (i <= step ? nodeColors[d.id] : "blue"))
        .transition()
        .duration(500)
        .delay((d, i) => (i + 4) * 400) // Adjust the delay as needed
        .filter((d) => shortestPath.includes(d.id))
        .style("fill", () => step === orderedVisitedPath.length - 1 && "green");
    }
    // Insert the circles group before layer2
    svg.node().insertBefore(circles.node(), layer2.nextSibling);
  },
};

export default AnimationB;
