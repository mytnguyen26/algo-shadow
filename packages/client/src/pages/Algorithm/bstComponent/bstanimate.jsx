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
  createbst(dataset, svgRef) {
    const width = svgRef.current.clientWidth;
    console.log(width);
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    var p = svg
      .append("g")
      .attr("stroke", "black")
      .attr("stroke-width", "2")
      .selectAll("line")
      .data(dataset)
      .enter()
      .append("line")
      .attr("id", function (c) {
        return "l" + c.position;
      })
      .attr("x1", function (c) {
        if (c.position == 1) {
          return null;
        }
        return getx(c.position, width);
      })
      .attr("y1", function (c) {
        if (c.position == 1) {
          return null;
        }
        return my * (getdepth(c.position) + 1);
      })
      .attr("x2", function (c) {
        if (c.position == 1) {
          return null;
        }
        c = Math.floor(c.position / 2);
        return getx(c, width);
      })
      .attr("y2", function (c) {
        if (c.position == 1) {
          return null;
        }
        return my * getdepth(c.position);
      });

    var c = svg
      .append("g")
      .attr("id", "circle")
      .attr("stroke", "black")
      .attr("fill", "white")
      .attr("stroke-width", "2")
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
      .attr("r", 20);

    var t = svg
      .append("g")
      .attr("stroke", "black")
      .attr("text-anchor", "middle")
      .attr("text-size", "10px")
      .selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .attr("id", function (c) {
        return "t" + c.position;
      })
      .attr("dx", function (c) {
        return getx(c.position, width);
      })
      .attr("dy", function (c) {
        return my * (getdepth(c.position) + 1) + 5;
      })
      .text(function (t) {
        return t.value;
      });
  },

  Pathdisplay(index) {
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

  Pathdisappear(index) {
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
