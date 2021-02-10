const {
  RegisterService,
  LoginService,
} = require("../../../services/AuthService");
const {
  validateLoginAttributes,
  validateRegisterAttributes,
} = require("./authAttributesValidation");
const validateHeaders = require("../../../shared/validateHeaders");

const Register = (req, res) => {
  const checkHeaders = validateHeaders(req);
  if (!checkHeaders) {
    return res.status(400).json({ error: "Custom headers are not supplied" });
  }
  const { username, email, password } = req.body;
  const validateResult = validateRegisterAttributes({
    username,
    email,
    password,
  });
  if (validateResult.error) {
    return res
      .status(400)
      .json({ error: validateResult.error.details[0].message });
  }

  const registerService = RegisterService(username, email, password, res);
  return registerService;
};

const Login = (req, res) => {
  const checkHeaders = validateHeaders(req);
  if (!checkHeaders) {
    return res.status(400).json({ error: "Custom headers are not supplied" });
  }
  const { email, password } = req.body;
  const validateResult = validateLoginAttributes({ email, password });
  if (validateResult.error) {
    return res
      .status(400)
      .json({ error: validateResult.error.details[0].message });
  }

  const loginService = LoginService(email, password, res);
  return loginService;
};

const User = (req, res) => {
  const checkHeaders = validateHeaders(req);
  if (!checkHeaders) {
    return res.status(400).json({ error: "Custom headers are not supplied" });
  }
  const { email, password } = req.body;
  const validateResult = validateLoginAttributes({ email, password });
  if (validateResult.error) {
    return res
      .status(400)
      .json({ error: validateResult.error.details[0].message });
  }

  const loginService = LoginService(email, password, res);
  return loginService;
};

module.exports = { Register, Login, User };
