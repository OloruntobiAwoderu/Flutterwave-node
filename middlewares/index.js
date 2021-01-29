const Response = require("../helpers/response");
const { isNumber, isObject, isString } = require("../helpers/validateTypes");

class Validation {
  static validateBody(req, res, next) {
    const { rule, data } = req.body;
    if (!data) {
      const message = "data is required.";
      const returnMessage = {
        message,
        status: "error",
        data: null,
      };
      return Response.errorHelper(res, returnMessage);
    }
    if (!rule) {
      const message = "rule is required";
      const returnMessage = {
        message,
        status: "error",
        data: null,
      };
      return Response.errorHelper(res, returnMessage);
    }
    return next();
  }
  static validateDatabodyType(req, res, next) {
    const { data, rule } = req.body;
    if (!isObject(rule)) {
      const message = "rule should be an object.";
      const returnMessage = {
        message,
        status: "error",
        data: null,
      };
      return Response.errorHelper(res, returnMessage);
    }
    const ruleRequiredFields = ["field", "condition", "condition_value"];
    for (let i = 0; i < ruleRequiredFields.length; i++) {
      if (!rule.hasOwnProperty(ruleRequiredFields[i])) {
        const message = `${ruleRequiredFields[i]} is required.`;
        const returnMessage = {
          message,
          status: "error",
          data: null,
        };
        return Response.errorHelper(res, returnMessage);
      }
    }
    return next();
  }

  static validateifRuleFieldExistsinData(req, res, next) {
    const { data, rule } = req.body;
    const { field } = rule;

    const fieldElement = field.split(".");
    console.log(fieldElement.length);
    if (fieldElement.length > 2) {
      const message = "only two level of nesting is allowed.";
      const returnMessage = {
        message,
        status: "error",
        data: null,
      };
      return Response.errorHelper(res, returnMessage);
    }
    if (fieldElement.length === 1) {
      if (!data.hasOwnProperty(fieldElement[0])) {
        const message = `field ${fieldElement[0]} is missing from data.`;
        const returnMessage = {
          message,
          status: "error",
          data: null,
        };
        return Response.errorHelper(res, returnMessage);
      }
    }
    if (fieldElement.length == 2) {
      if (!data.hasOwnProperty(fieldElement[0])) {
        const message = `field ${fieldElement[0]} is missing from data.`;
        const returnMessage = {
          message,
          status: "error",
          data: null,
        };
        return Response.errorHelper(res, returnMessage);
      }
      if (!data[fieldElement[0]].hasOwnProperty(fieldElement[1])) {
        const message = `field ${fieldElement[1]} is missing from data.`;
        const returnMessage = {
          message,
          status: "error",
          data: null,
        };
        return Response.errorHelper(res, returnMessage);
      }
    }
    return next();
  }
  static validateRuleConditionExists(req, res, next) {
    const { rule } = req.body;
    const { condition } = rule;
    const allowedRuleConditions = ["gte", "gt", "neq", "eq", "contains"];
    if (!allowedRuleConditions.includes(condition)) {
      const message = "condition should be one of gte, gt, neq, eq, contains";
      const returnMessage = {
        message,
        status: "error",
        data: null,
      };
      return Response.errorHelper(res, returnMessage);
    }
    return next();
  }
}

module.exports = Validation;
