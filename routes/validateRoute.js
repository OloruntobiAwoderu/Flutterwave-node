const express = require("express");
const { validateRule } = require("../controllers/validateRule");
const {
  validateBody,
  validateDatabodyType,
  validateRuleConditionExists,
  validateifRuleFieldExistsinData,
} = require("../middlewares/index");

const router = express.Router();

router.post(
  "/",
  validateBody,
  validateDatabodyType,
  validateRuleConditionExists,
  validateifRuleFieldExistsinData,
  validateRule
);

module.exports = router;
