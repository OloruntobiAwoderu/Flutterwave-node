const { middlewareErrorResponse } = require("../helpers/SuccessError");
const { isObject, isString } = require("../helpers/validateTypes");

/**
 * @description Validationclass
 */
class Validation {
  /**
   * @param {object} req HTTP Request
   * @param {object} res HTTP Response
   * @param {object} next Move to the next function
   * @return {object} validation response
   */
  static validateBody(req, res, next) {
    const { rule, data } = req.body;
    if (!data) {
      const message = "data is required.";
      return middlewareErrorResponse(res, message);
    }
    if (!rule) {
      const message = "rule is required.";
      return middlewareErrorResponse(res, message);
    }
    return next();
  }
  /**
   * @param {object} req HTTP Request
   * @param {object} res HTTP Response
   * @param {object} next Move to the next function
   * @return {object} validation response
   */
  static validateRulebodyType(req, res, next) {
    const { data, rule } = req.body;
    if (!isObject(rule)) {
      const message = "rule should be an object.";
      return middlewareErrorResponse(res, message);
    }
    const ruleRequiredFields = ["field", "condition", "condition_value"];
    for (let i = 0; i < ruleRequiredFields.length; i++) {
      if (!rule.hasOwnProperty(ruleRequiredFields[i])) {
        const message = `${ruleRequiredFields[i]} is required.`;
        return middlewareErrorResponse(res, message);
      }
    }
    return next();
  }

  /**
   * @param {object} req HTTP Request
   * @param {object} res HTTP Response
   * @param {object} next Move to the next function
   * @return {object} validation response
   */
  static validateifRuleFieldExistsinData(req, res, next) {
    const { data, rule } = req.body;
    const { field } = rule;

    const fieldElement = field.split(".");
    if (fieldElement.length > 2) {
      const message = "only two level of nesting is allowed.";
      return middlewareErrorResponse(res, message);
    }
    if (fieldElement.length === 1) {
      if (!data.hasOwnProperty(fieldElement[0])) {
        const message = `field ${fieldElement[0]} is missing from data.`;
        return middlewareErrorResponse(res, message);
      }
    }
    if (fieldElement.length == 2) {
      if (!data.hasOwnProperty(fieldElement[0])) {
        const message = `field ${fieldElement[0]} is missing from data.`;
        return middlewareErrorResponse(res, message);
      }
      if (!data[fieldElement[0]].hasOwnProperty(fieldElement[1])) {
        const message = `field ${fieldElement[1]} is missing from data.`;
        return middlewareErrorResponse(res, message);
      }
    }
    return next();
  }

  /**
   * @param {object} req HTTP Request
   * @param {object} res HTTP Response
   * @param {object} next Move to the next function
   * @return {object} validation response
   */
  static validateRuleConditionExists(req, res, next) {
    const { rule } = req.body;
    const { condition } = rule;
    const allowedRuleConditions = ["gte", "gt", "neq", "eq", "contains"];
    if (!allowedRuleConditions.includes(condition)) {
      const message = "condition should be one of gte, gt, neq, eq, contains";
      return middlewareErrorResponse(res, message);
    }
    return next();
  }

  /**
   * @param {object} req HTTP Request
   * @param {object} res HTTP Response
   * @param {object} next Move to the next function
   * @return {object} validation response
   */
  static validateRuleFieldDataType(req, res, next) {
    const { rule } = req.body;
    if (!isString(rule.field)) {
      const message = `${rule.field} should be a string.`;
      return middlewareErrorResponse(res, message);
    }
    return next();
  }

  /**
   * @param {object} req HTTP Request
   * @param {object} res HTTP Response
   * @param {object} next Move to the next function
   * @return {object} validation response
   */
  static validateDataBodyType(req, res, next) {
    const { data } = req.body;
    if (isObject(data)) {
      return next();
    }
    if (isString(data)) {
      return next();
    }
    if (Array.isArray(data)) {
      return next();
    }
    const message =
      "data field should be a valid JSON Object or valid Array or a String.";
    return middlewareErrorResponse(res, message);
  }
}

module.exports = Validation;
