const { body, validationResult } = require("express-validator");
const lanchValidationRules = () => {
  return [
    body("launchDate")
      .isISO8601()
      .toDate()
      .not()
      .isEmpty()
      .withMessage("Please Provide a Valid Launch Date"),
    body("mission")
      .not()
      .isEmpty()
      .withMessage("Please Provide Mission")
      .trim(),
    body("rocket").not().isEmpty().withMessage("Please Provide Rocket").trim(),
    body("target").not().isEmpty().withMessage("Please Provide Destination"),
  ];
};
const launchValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = {};
  errors.array().forEach((err) => (extractedErrors[err.param] = err.msg));

  return res.status(422).json({
    errors: extractedErrors,
  });
};
module.exports = {
  lanchValidationRules,
  launchValidate,
};
