/**
 * @description ValidateTypes class
 */
class ValidateTypes {
  /**
   * @description return boolean if it string
   * @param {string} data- string
   * @return {boolean} Returned boolean
   */
  static isString(data) {
    if (typeof data === "string") {
      return true;
    }
  }

  /**
   * @description return true or false if is an Object
   * @param {Object} data - object or any
   * @return {boolean} Returned boolean
   */
  static isObject(data) {
    if (typeof data === "object" && !Array.isArray(data) && data !== null) {
      return true;
    }
  }

  /**
   * @description return true or false if is a Number
   * @param {Object} data- any
   * @return {boolean} Returned boolean
   */
  static isNumber(data) {
    if (typeof data === "number") {
      return true;
    }
  }
}

module.exports = ValidateTypes;
