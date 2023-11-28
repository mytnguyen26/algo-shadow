/**
 * A GraphRenderer renders the visuals of the data structure for 
 * `algorithm`, as determined by `strategy` property. It is only responsible
 * for visualizing data after manipulation or computation by one of the 
 * AlgorithmSolver strategy
 * GraphRenderer uses `strategy` property to set appropriate `AlgorithmSolver`
 * strategy to `solverStrategy` and use the strategy to apply algorithmic
 * logic to the input data
 */
import * as d3 from "d3";
import Common from "../pages/Algorithm/Common/common"
import { AnalyzeRuntime } from "../pages/Algorithm/AlgComponent/analyzeRuntime.jsx"

class GraphRenderer {
  constructor() {
    this._solverStrategy = null
    this.data = []
    this.position = null
    this.step = 0
    this.record = []
    this.dataset = []
    this.svgRef = null
  }
  
  set solverStrategy (strategy) {
    this._solverStrategy = strategy
    switch(strategy.constructor.name) {
      case "DijkstraConcreteStrategy":
        this.position = "index"
        break;
      case "BSTConcreteStrategy":
        this.position = "position"
        break;
      case "HeapConcreteStrategy":
        this.position = "index"
        break;
      default:
        this.position = "index"
        console.log("No algorithm solver found")
        break;
    }
  }

  getTargetNode (node) {
    return this._solverStrategy.getNeighborOf(node);
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
  renderGraph (dataset) {
    const width = this.svgRef.current.clientWidth;
    console.log(dataset)
    console.log(this.position)
    const svg = d3.select(this.svgRef.current);
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
  finalTree () {
    const width = this.svgRef.current.clientWidth;
    const svg = d3.select(this.svgRef.current);
    //console.log(dataSetToUse)
    svg.selectAll("*").remove();
    const my = 60;
    const p = svg
      .append("g")
      .attr("stroke", "black")
      .attr("stroke-width", "1")
      .selectAll("line")
      .data(this.dataset)
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
      .data(this.dataset)
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
      .data(this.dataset)
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

  pathDisplay(index) {
    const circle = document.getElementById("c" + index);
    const line = document.getElementById("l" + index);
  
    // 设置圆形的渐变动画
    const circleAnimate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    circleAnimate.setAttribute("attributeName", "stroke");
    circleAnimate.setAttribute("values", "black;blue");
    circleAnimate.setAttribute("dur", "2s");
    circleAnimate.setAttribute("fill", "freeze");
  
    circle.appendChild(circleAnimate);
    circleAnimate.beginElement();
  
    //设置线段的渐变动画
    if (index !== 1) {
      const lineAnimate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
      lineAnimate.setAttribute("attributeName", "stroke");
      lineAnimate.setAttribute("values", "black;blue");
      lineAnimate.setAttribute("fill", "freeze");
      lineAnimate.setAttribute("dur", "5s");
      lineAnimate.setAttribute("fill", "freeze");
      lineAnimate.setAttribute("begin", "c" + index + ".animate.end");
      line.appendChild(lineAnimate);
      lineAnimate.beginElement();
    }
  }

  pathDisappear(index) {
    document.getElementById("c"+index).setAttribute("stroke","black")
    if(index!=1){
      document.getElementById("l"+index).setAttribute("stroke","black")
    }
  }

  reset() {
    this.step = 0
    this.record.forEach(element => {
      this.pathDisappear(this.dataset[element-1].position)
    })
    console.log(this.record)
  }

  nextStep() {
    if(this.step >= this.record.length)
    {
      alert("AnimationB is end!")
    }
    else
    {
      if(typeof(this.record[this.step].e1) == "undefined"){
        this.pathDisplay(this.dataset[this.record[this.step]-1].position);
      }
      else{
        if(this.record[this.step].e1==0){
          this.deleteElement(this.record[this.step-1].e2, this.record[this.step-1].e1)
        }
        else{
          const text1 = document.getElementById("t" + this.record[this.step].e1);
          const text2 = document.getElementById("t" + this.record[this.step].e2);
          this.animateExchange(text1,text2);
        }
      }
      this.step++
    }
  }

  back(){
    if(this.step<1)
    {
      alert("This is the first step!")
    }
    else
    {
      this.step--
      if(typeof(this.record[this.step].e1) == "undefined"){
        this.pathDisappear(this.dataset[this.record[this.step]-1].position);
      }
      else{
        if(this.record[this.step].e1==0){
          this.renderer.showElement(this.record[this.step-1].e2, this.record[this.step-1].e1)
        }
        else{
          const text1 = document.getElementById("t" + this.record[this.step].e1);
          const text2 = document.getElementById("t" + this.record[this.step].e2);
          this.renderer.animateExchange(text1,text2);
        }
      }
    }
      
  }
  
  /**
   * Create a new Graph from user input to perform algorithm on
   * @param {Array} dataset the transformed user input parsed from UI
   */
  create(data) {
    this.record = []
    this.data = data
    this.dataset = Common.dataTransform(data);
    console.log(this.dataset)
    
    const result = AnalyzeRuntime('createBST', data, () => {
      this.dataset.forEach(element => {
        this._solverStrategy.insert(element, this.record);
      });     // because this is so specific to each algo, 
              // encapsulate in solverStrategy run() method
      this.renderGraph(this.dataset)
    });
    console.log(this.record)
    return result
  }
  
  /**
   * Insert new elements from user input to existing Graph
   */
  insert(data) {
    this.record = []
    this.dataset.push({index: data.length, value:Number(data[0]), position: 1})
    this._solverStrategy.insert(this.dataset[data.length-1], this.record);
    this.record.push(this.dataset[data.length-1].index)
    this.renderGraph(this.dataset);
  }

  /**
   * TODO
   * @param {*} ddata
   * @param {*} k
   */
  delete(ddata, k) {
    console.log(this.data)
    this.record = [];
    //k 被删除，i交换
    this._solverStrategy.delete(ddata, this.record);
    let t = this.record[this.record.length - 1];
    for (var i = 0; i < this.dataset.length; i++) {
      if (this.dataset[i].index == t) {
        if (this.dataset[i].value != ddata) {
          console.log(
            "exchange " + this.dataset[i].position + " and " + this.dataset[k].position,
          );
          this.record.push({
            e1: this.dataset[i].position,
            e2: this.dataset[k].position,
          });
        }
        break;
      }
    }
    this.record.push({
      e1: 0,
      e2: this.dataset[k].position,
    });
    this.data.splice(this.dataset[i].index - 1, 1);
    this.renderGraph(this.dataset)
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