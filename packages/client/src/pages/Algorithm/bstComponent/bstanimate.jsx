import * as d3 from "d3";

function getdepth(c)
{
    return Math.ceil(Math.log2(c+1))-1
}

function getx(c,width)
{
    var depth = getdepth(c)
    var distance = 2**depth
    var index = c-(2**depth)
    return (width/(distance+1))*(index+1)
}

const Animation = {
    createbst(dataset, svgRef){
    const width = svgRef.current.clientWidth;
    console.log(width)
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
  
    var my = 60
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
                return getx(c.position,width)
            })
            .attr("y1", function(c){
                if(c.position==1)
                {
                    return null
                }
                return my*(getdepth(c.position)+1)
            })
            .attr("x2", function(c){
                if(c.position==1)
                {
                    return null
                }
                c = Math.floor(c.position/2)
                return getx(c,width)
            })
            .attr("y2", function(c){
                if(c.position==1)
                {
                    return null
                }
                return my*(getdepth(c.position))
            })
  
    var c = svg.append("g")
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
              return getx(c.position,width)
            })
            .attr("cy", function(c){
              return my*(getdepth(c.position)+1)
            })
            .attr("r",20)
  
    var t = svg.append("g")
            .attr("stroke","black")
            .attr("text-anchor","middle")
            .attr("text-size","10px")
            .selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .attr("id",function(c){
              return "t"+c.position
            })
            .attr("dx", function(c){
              return getx(c.position,width)
            })
            .attr("dy", function(c){
              return my*(getdepth(c.position)+1)+5
            })
            .text(function(t){
              return t.value;
            })
  },
  
  Pathdisplay(index){
  const c1 = document.getElementById("c"+index)
  c1.setAttribute("stroke","blue")
  if(index!=1){
    document.getElementById("l"+index).setAttribute("stroke","blue")
  }
  },

  Pathdisappear(index){
    document.getElementById("c"+index).setAttribute("stroke","black")
    if(index!=1){
      document.getElementById("l"+index).setAttribute("stroke","black")
    }
    }

}
function addGradients(c1){
  const animateElementC = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "animate",
  );
  animateElementC.setAttribute("attributeName", attributeNameX);
  animateElementC.setAttribute("from", x1);
  animateElementC.setAttribute("to", x2);
  animateElementC.setAttribute("begin", "0s");
  animateElementC.setAttribute("dur", "3s");
  animateElementC.setAttribute("fill", "freeze");
  c1.appendChild(animateElementC);
  animateElementC.beginElement();
}

export default Animation;
