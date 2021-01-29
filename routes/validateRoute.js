const express = require("express");
const { validateRule } = require("../controllers/validateRule");
const {
  validateBody,
  validateDataBodyType,
  validateRulebodyType,
  validateRuleConditionExists,
  validateifRuleFieldExistsinData,
  validateRuleFieldDataType,
} = require("../middlewares/index");

const router = express.Router();

router.post(
  "/",
  validateBody,
  validateRulebodyType,
  validateRuleFieldDataType,
  validateDataBodyType,
  validateRuleConditionExists,
  validateifRuleFieldExistsinData,
  validateRule
);

module.exports = router;
