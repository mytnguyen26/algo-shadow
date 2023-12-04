import * as d3 from "d3";
import CAnimation from "../Common/Canimate";

const AnimationB = {
  createbst(dataset, svgRef){
    const width = svgRef.current.clientWidth;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    var p = svg.append("g")
            .attr("stroke","black")
            .attr("stroke-width","2")
            .selectAll("line")
            .data(dataset)
            .enter()
            .append("line")
            .attr("id",function(c){
              return "l"+c.position
            })
            .attr("x1", function(c){
                if(c.position==1)
                {
                    return null
                }
                return CAnimation.getx(c.position,width)
            })
            .attr("y1", function(c){
                if(c.position==1)
                {
                    return null
                }
                return CAnimation.my*(CAnimation.getdepth(c.position)+1)
            })
            .attr("x2", function(c){
                if(c.position==1)
                {
                    return null
                }
                c = Math.floor(c.position/2)
                return CAnimation.getx(c,width)
            })
            .attr("y2", function(c){
                if(c.position==1)
                {
                    return null
                }
                return CAnimation.my*(CAnimation.getdepth(c.position))
            })
  
    var c = svg.append("g")
    .attr("id","circle")
            .attr("stroke","black")
            .attr("fill","white")
            .attr("stroke-width","2")
            .selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("id",function(c){
              return "c"+c.position
            })
            .attr("cx", function(c){
              return CAnimation.getx(c.position,width)
            })
            .attr("cy", function(c){
              return CAnimation.my*(CAnimation.getdepth(c.position)+1)
            })
            .attr("r",20)
  
    var t = svg.append("g")
            .attr("stroke", "white")
            .attr("text-anchor","middle")
            .attr("text-size","20px")
            .attr("font-weight", "bold")
            .selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .attr("id",function(c){
              return "t"+c.position
            })
            .attr("dx", function(c){
              return CAnimation.getx(c.position,width)
            })
            .attr("dy", function(c){
              return CAnimation.my*(CAnimation.getdepth(c.position)+1)+5
            })
            .text(function(t){
              return t.value;
            })
  },

  addGradients(dataset, svgRef){
    const width = svgRef.current.clientWidth;
    const svg = d3.select(svgRef.current);
    var layer2 = document.getElementById('circle');

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
          return CAnimation.getx(c.position, width);
        })
        .attr("cy", function (c) {
          return CAnimation.my * (CAnimation.getdepth(c.position) + 1);
        })
        .attr("r", 20)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 600)
        .attr("fill", (d) =>"blue")
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
          .style(
            "fill",
            () => step === orderedVisitedPath.length - 1 && "green"
          );
        }
  // Insert the circles group before layer2
  svg.node().insertBefore(circles.node(), layer2.nextSibling);
  }
};

export default AnimationB;
