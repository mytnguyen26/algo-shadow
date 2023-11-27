import * as d3 from "d3";
import Viz from 'viz.js';
import { Module, render } from 'viz.js/full.render';
const AnimationG = {
    creategraph(graph, svgRef){
        const viz = new Viz({ Module, render });
        
        var graphvizCode = `
        digraph G {
            rankdir=LR;
            node [penwidth=2, pencolor=white, shape=circle];`
        if(graph.kind=="Undirected"){
            graphvizCode+=`edge [dir="none"];`
        }else{
            graphvizCode+=`edge [dir=""];`
        }
        const nodes = graph.nodes
        const edges = graph.EdgeList()

        edges.forEach(e => {
            graphvizCode += e.node1 +` -> `+e.node2+` [label="`+e.weight+`"];`
        });
        nodes.forEach(n => {
            graphvizCode += n +` [id="c`+n+`"]`
        });
        
        graphvizCode = graphvizCode+`}`
        const svgContainer = d3.select(svgRef.current);
        svgContainer.selectAll("*").remove();
        viz.renderString(graphvizCode)
            .then(result => {
            svgContainer.html(result);
            svgContainer.selectAll('text')
            .attr("font-weight", "bold")
            .attr("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("text-size","20px")//font-family="sans-serif"
            .attr('stroke', 'white') 
            .attr('stroke-weight','0.5px')
        })
        .catch(error => {
            console.error(error);
        });
    },
}

export default AnimationG