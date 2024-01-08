const { body, validationResult } = require("express-validator");

exports.registerUserRules = () => {
  return [
    body("firstName", "Name is required").notEmpty(),
    body("lastName", "Name is required").notEmpty(),
    body("email", "Enter Valid Email").notEmpty().isEmail(),
    body("password", "Enter Valid Password")
      .notEmpty()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
  ];
};

exports.loginUserRules = () => {
  return [
    body("email", "Enter Valid Email").notEmpty().isEmail(),
    body("password", "Enter Valid Password").notEmpty().isLength({ min: 8 }),
  ];
};

exports.userValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    return next();
  }
};
