/**
 * This module consists of helper functions for Tree Based Graph Page, such
 * as BSTPage or HeapPage.
 */
import TreeGraphRenderer from "./treeRenderer.js";

const Common = {
  width: 900,
  height: 300,

  /**
   * Get user input data by id, validate user input data,
   * and turn it into an array of number for algoritm solver.
   * This method is used in Create use case
   * @param {str} valueName is the id of the form, such as "create"
   * @returns array of numbers, such as [1, 2, 3, 4]
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
   * Get user input data by id, validate that only a single number
   * is provided. This method is used in Insert, or Delete use case
   * @param {*} valueName is the id of the form, such as "insert"
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
   * Find the value that the user provided (such as when they
   * want to search or delete a value from the tree) in the current tree.
   * @param {number} xdata a data value of the node, such as 2 
   * @param {Array<Node>} dataset is the current array holding current data
   * of the Graph.
   * @returns index location of the node in the dataset array
   */
  findInArray(xdata, dataset) {
    for (var i = 0; i < dataset.length; i++) {
      if (dataset[i].value == xdata) {
        return i;
      }
    }
    throw new Error(xdata + " is not in tree");
  },

  /**
   * Function for "Next" button. As user click "Next", step is increased,
   * and the function get the data in `record` array at index == `step`.
   * Then, the function determine what animation needs to happen based on the data. 
   * @param {number} step is the number represent the current step the user is at.
   * This number is always between 0 and <= the size of `record` array
   * @param {Array} record the array of animation steps.
   * For example: [1, 2, {e1: 0, e2: [3, 1]}].
   * The above example would result in an animation series like so:
   * change color of node position 1, change color of node position 2,
   * delete element at node position 3
   * @returns updated `step`
   */
  next(step, record) {
    if (step >= record.length) {
      alert("Animation is end!");
    } else {
      if (record[step].e1 === 0) {
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
   * Function for "Back" button. As user click "Back", step is decreased,
   * and the function get the data in `record` array at index == `step`.
   * Then, the function determine what animation needs to happen based on the data. 
   * @param {number} step is the number represent the current step the user is at.
   * This number is always between 0 and <= the size of `record` array
   * @param {Array} record the array of animation steps.
   * For example: [1, 2, {e1: 0, e2: [3, 1]}].
   * @param  {...any} restParams
   * @returns updated `step`
   */
  back(step, record, ...restParams) {
    if (step < 1) {
      alert("This is the first step!");
    } else {
      step--;
      if (typeof record[step].e1 === "undefined") {
        TreeGraphRenderer.pathDisappear(record[step]);
      } else {
        if (record[step].e1 === 0) {
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
