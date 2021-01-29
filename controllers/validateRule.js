const Response = require("../helpers/response");
const ValidateTypes = require("../helpers/validateTypes");
const {
  successHelper,
  logicErrorResponse,
  middlewreErrorResponse,
} = require("../helpers/SuccessError");

/**
 * @description ValidateRuleLogic class
 */
class ValidateRuleLogic {
  /**
   * @description return a JSON data
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static validateRule(req, res) {
    const { data, rule } = req.body;
    const { field, condition, condition_value } = rule;

    const fieldData = field.split(".");
    let fieldToValidate = data;
    fieldData.forEach((element) => {
      fieldToValidate = fieldToValidate[element];
    });
    console.log(field);
    const isValidated = ValidateRuleLogic.testValidation(
      res,
      field,
      condition,
      fieldToValidate,
      condition_value
    );
    if (isValidated) {
      return successHelper(res, field, condition, condition_value);
    }
    return logicErrorResponse(res, field, condition, condition_value);
  }

  /**
   * @description returns Error or Success Validation data
   * @param {Object} res - HTTPResponse
   * @param {Object} field - string
   * @param {Object} condition - string
   * @param {Object} fieldToValidate - string
   * @param {Object} condition_value - string
   * @return {Object} Returned object
   */
  static testValidation(
    res,
    field,
    condition,
    fieldToValidate,
    condition_value
  ) {
    switch (condition) {
      case "eq":
        return fieldToValidate === condition_value;
      case "neq":
        return fieldToValidate != condition_value;
      case "contains":
        console.log(fieldToValidate);
        if (Array.isArray(fieldToValidate)) {
          return fieldToValidate.includes(condition_value);
        }
        const message = `${field} should be an array.`;
        return middlewreErrorResponse(res, message);
      case "gte":
        if (!ValidateTypes.isNumber(fieldToValidate)) {
          const message = `${field} should be a number.`;
          return middlewreErrorResponse(res, message);
        }
        return fieldToValidate >= condition_value;

      case "gte":
        if (!ValidateTypes.isNumber(fieldToValidate)) {
          const message = `${field} should be a number.`;
          return middlewreErrorResponse(res, message);
        }
        return field_value >= condition_value;
      default:
        throw new Error("Invalid Condition");
    }
  }
}

module.exports = ValidateRuleLogic;
