import * as d3 from "d3";
const addmove = (c1, x1, x2, y1, y2, attributeNameX, attributeNameY) => {
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
  };

const CAnimation = {
  getdepth(c){
    return Math.ceil(Math.log2(c + 1)) - 1;
  },
      
  getx(c, width){
    const depth = CAnimation.getdepth(c);
    const distance = 2 ** depth;
    const index = c - distance;
    return (width / (distance + 1)) * (index + 1);
  },
  my:60,
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
    
  deleteelement: (e, size) => {
    document.getElementById("t" + e).style.display = "none";
    document.getElementById("c" + size).style.display = "none";
    document.getElementById("l" + size).style.display = "none";
  },
    
  showelement: (e, size) => {
    document.getElementById("t" + e).style.display = "block";
    document.getElementById("c" + size).style.display = "block";
    document.getElementById("l" + size).style.display = "block";
  },
  
  Pathdisplay(circle,attribute,color){
    //const circle = document.getElementById("c" + index).getElementsByTagName("ellipse")[0];
    // Set up the circle gradient animation
    const circleAnimate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    circleAnimate.setAttribute("attributeName", attribute);
    circleAnimate.setAttribute("values", color);
    circleAnimate.setAttribute("dur", "1s");
    circleAnimate.setAttribute("fill", "freeze");
      
    circle.appendChild(circleAnimate);
    circleAnimate.beginElement();
  }
}

export default CAnimation;