const Response = require("../helpers/response");
const ValidateTypes = require("../helpers/validateTypes");

class ValidateRuleLogic {
  static validateRule(req, res) {
    const { data, rule } = req.body;
    const { field, condition, condition_value } = rule;

    const fieldData = field.split(".");
    let fieldToValidate = data;
    fieldData.forEach((element) => {
      fieldToValidate = fieldToValidate[element];
	});
	console.log(field)
    const isValidated = ValidateRuleLogic.testCondition(
      res,
      field,
      condition,
      fieldToValidate,
      condition_value
    );
    if (isValidated) {
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
      return Response.successResponse(res, 200, returnMessage);
    }
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
    return Response.errorHelper(res, returnMessage);
  }

  static testCondition(
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
		  console.log(fieldToValidate)
        if (Array.isArray(fieldToValidate)) {
          return fieldToValidate.includes(condition_value);
        }
        const message = `${field} should be an array.`;
        const returnMessage = {
          message,
          status: "error",
          data: null,
        };
        return Response.errorHelper(res, returnMessage);
      case "gte":
        if (!ValidateTypes.isNumber(fieldToValidate)) {
          const message = `${field} should be a number.`;
          const returnMessage = {
            message,
            status: "error",
            data: null,
          };
          return Response.errorHelper(res, returnMessage);
        }
        return fieldToValidate >= condition_value;

      case "gte":
        if (!ValidateTypes.isNumber(fieldToValidate)) {
          const message = `${field} should be a number.`;
          const returnMessage = {
            message,
            status: "error",
            data: null,
          };
          return Response.errorHelper(res, returnMessage);
        }
        return field_value >= condition_value;
      default:
        throw new Error("Invalid Condition");
    }
  }
}

module.exports = ValidateRuleLogic;