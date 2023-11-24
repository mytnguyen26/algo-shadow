import * as d3 from "d3";
import CAnimation from "../Common/Canimate";
import Viz from 'viz.js';
import { Module, render } from 'viz.js/full.render';
const AnimationG = {
    creategraph(graph, svgRef){
        const viz = new Viz({ Module, render });
        
        var graphvizCode = `
        digraph G {
            rankdir=LR;
            node [shape=circle];`
        if(graph.kind=="Undirected"){
            graphvizCode+=`edge [dir="none"];`
        }else{
            graphvizCode+=`edge [dir=""];`
        }
        const nodes = graph.nodes
        const edges = graph.EdgeList()
        nodes.forEach(n => {
            graphvizCode += n +` [id="c`+n+`"]`
        });
        edges.forEach(e => {
            graphvizCode += e.node1 +` -> `+e.node2+` [label="`+e.weight+`"];`
        });
        
        graphvizCode = graphvizCode+`}`
        const svgContainer = d3.select(svgRef.current);
        viz.renderString(graphvizCode)
            .then(result => {
            svgContainer.html(result);
        })
        .catch(error => {
            console.error(error);
        });
    },

    Pathdisplay(index,attribute,color){
    
        const circle = document.getElementById("c" + index).getElementsByTagName("ellipse")[0];
        const line = document.getElementById("l" + index);
      console.log(circle)
        // Set up the circle gradient animation
        const circleAnimate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        circleAnimate.setAttribute("attributeName", attribute);
        circleAnimate.setAttribute("values", color);
        circleAnimate.setAttribute("dur", "1s");
        circleAnimate.setAttribute("fill", "freeze");
      
        circle.appendChild(circleAnimate);
        circleAnimate.beginElement();
      
        //Set up the line gradient animation
        // if (index !== 1) {
        //   const lineAnimate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        //   lineAnimate.setAttribute("attributeName", "stroke");
        //   lineAnimate.setAttribute("values", "black;blue");
        //   lineAnimate.setAttribute("fill", "freeze");
        //   lineAnimate.setAttribute("dur", "5s");
        //   lineAnimate.setAttribute("fill", "freeze");
        //   lineAnimate.setAttribute("begin", "c" + index + ".animate.end");
        //   line.appendChild(lineAnimate);
        //   lineAnimate.beginElement();
        // }
      }
}

export default AnimationG