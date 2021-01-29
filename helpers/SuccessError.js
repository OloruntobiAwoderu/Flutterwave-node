const { successResponse, errorHelper } = require("./response");

/**
 * @description ReturnResponse class
 */
class ReturnResponse {
  /**
   * @description return a middlewareErrorResponse
   * @param {Object} res - HTTP Response
   * @param {Object} message - string
   * @return {res} res payload
   */
  static middlewreErrorResponse(res, message) {
    const returnMessage = {
      message,
      status: "error",
      data: null,
    };
    return errorHelper(res, returnMessage);
  }

  /**
   * @description return a success helper validation data
   * @param {Object} fieldTovalidate - string
   * @param {Object} condition - string
   * @param {Object} condition_value - string/integer
   * @return {res} res payload
   */

  static successHelper(
    res,
    field,
    fieldToValidate,
    condition,
    condition_value
  ) {
    const returnMessage = {
      message: `field ${field} successfully validated.`,
      status: "success",
      data: {
        validation: {
          error: false,
          field,
          field_value: fieldToValidate,
          condition,
          condition_value,
        },
      },
    };
    return successResponse(res, 200, returnMessage);
  }

  /**
   * @description return error alidation data
   * @param {Object} fieldToValidate - string
   * @param {Object} condition - string
   * @param {Object} condition_value - string/integer
   * @return {res} res payload
   */
  static logicErrorResponse(
    res,
    field,
    fieldToValidate,
    condition,
    condition_value
  ) {
    const returnMessage = {
      message: `field ${field} failed validation.`,
      status: "error",
      data: {
        validation: {
          error: true,
          field,
          field_value: fieldToValidate,
          condition,
          condition_value,
        },
      },
    };
    return errorHelper(res, returnMessage);
  }
}

module.exports = ReturnResponse;
