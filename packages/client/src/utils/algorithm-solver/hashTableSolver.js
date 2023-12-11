/**
 * Implements function to calculate Hash
 * @param {str} str is the input value to be hashed
 * @returns 
 */
export const djb2Hash = (str) => {
    const len = str.length;
    let hash = 6518;
    for (let i = 0; i < len; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i) | 0;
    }
    return hash;
  }
  
  export const hashFunc = (value, max) => {
    return djb2Hash(value.toString()) % max;
  }
