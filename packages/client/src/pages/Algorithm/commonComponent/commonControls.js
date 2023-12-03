import { text } from "d3";
import GraphRenderer from "./Canimate";

const Common = {
    width : 900,
    height : 300,
    validData(valuename){
        let tdata = document.getElementById(valuename).value.split(",")
        for (const ele of tdata) {
          if (isNaN(ele)) {
            throw new Error("Only numbers and commas can be entered");
          }
        }
        return tdata
    },
      
    validOneData(valuename){
        let xdata =  Common.validData(valuename)
        if (xdata.length === 1) {
            return xdata[0]
        }else {
            throw new Error("Only select one number");
        }
    },

    findInArray(xdata, dataset) {
        for (var i = 0; i < dataset.length; i++) {
          if (dataset[i].value == xdata) {
            return i;
          }
        }
        throw new Error(xdata + " is not in heap");
    },

    next(step,record){
      if(step>=record.length)
      {
        alert("Animation ends!")
        
      }
      else
      {
        if(record[step].e1==0){
          GraphRenderer.deleteElement(record[step].e2[1],record[step].e2[0])
        }
        else{
          const text1 = document.getElementById("t" + record[step].e1);
          const text2 = document.getElementById("t" + record[step].e2);
          GraphRenderer.animateExchange(text1,text2);
        }
        ++step
      }
      return step
    },

    back(step,record,...restParams){
      if(step<1)
      {
        alert("This is the first step!")
      }
      else
      {
        step--
        if(typeof(record[step].e1) == "undefined"){
          GraphRenderer.pathDisappear(record[step]);
        }
        else{
          if(record[step].e1==0){
            GraphRenderer.showElement(record[step].e2[1],record[step].e2[0])
          }
          else{
            const text1 = document.getElementById("t" + record[step].e1);
            const text2 = document.getElementById("t" + record[step].e2);
            GraphRenderer.animateExchange(text1,text2);
          }
        }
      }
      return step
    } 
  }

  export default Common;