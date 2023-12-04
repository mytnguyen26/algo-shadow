/**
 * TODO
 */
import TreeGraphRenderer from "./Canimate.js";

const Common = {
  width: 900,
  height: 300,

  /**
   * TODO
   * @param {*} valueName
   * @returns
   */
  validData(valueName) {
    let tdata = document.getElementById(valueName).value.split(",");
    for (const ele of tdata) {
      if (isNaN(ele)) {
        throw new Error("Only numbers and commas can be entered");
      }
    }
    return tdata;
  },

  /**
   * TODO
   * @param {*} valueName
   * @returns
   */
  validOneData(valueName) {
    let xdata = Common.validData(valueName);
    if (xdata.length === 1) {
      return xdata[0];
    } else {
      throw new Error("Only select one number");
    }
  },

  /**
   * TODO
   * @param {*} xdata
   * @param {*} dataset
   * @returns
   */
  findInArray(xdata, dataset) {
    for (var i = 0; i < dataset.length; i++) {
      if (dataset[i].value == xdata) {
        return i;
      }
    }
    throw new Error(xdata + " is not in heap");
  },

  /**
   * TODO
   * @param {*} step
   * @param {*} record
   * @returns
   */
  next(step, record) {
    if (step >= record.length) {
      alert("Animation is end!");
    } else {
      if (record[step].e1 == 0) {
        TreeGraphRenderer.deleteElement(record[step].e2[1], record[step].e2[0]);
      } else {
        const text1 = document.getElementById("t" + record[step].e1);
        const text2 = document.getElementById("t" + record[step].e2);
        TreeGraphRenderer.animateExchange(text1, text2);
      }
      ++step;
    }
    return step;
  },

  /**
   * TODO
   * @param {*} step
   * @param {*} record
   * @param  {...any} restParams
   * @returns
   */
  back(step, record, ...restParams) {
    if (step < 1) {
      alert("This is the first step!");
    } else {
      step--;
      if (typeof record[step].e1 == "undefined") {
        TreeGraphRenderer.pathDisappear(record[step]);
      } else {
        if (record[step].e1 == 0) {
          TreeGraphRenderer.showElement(record[step].e2[1], record[step].e2[0]);
        } else {
          const text1 = document.getElementById("t" + record[step].e1);
          const text2 = document.getElementById("t" + record[step].e2);
          TreeGraphRenderer.animateExchange(text1, text2);
        }
      }
    }
    return step;
  },
};

export default Common;
