const jwt = require("jsonwebtoken");
const { config } = require("../utils/config");

const authorization = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log(token);
  if (!token) {
    return res.sendStatus(403).send("Token not found");
  }
  try {
    const data = jwt.verify(token, config.jwt_secret_key);
    console.log(data);
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

const authPermissions = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.sendStatus(403);
  }

  if (req.method == "GET") {
    try {
      jwt.verify(token, config.jwt_secret_key);
      return next();
    } catch {
      return res.sendStatus(401).send("Invalid Token");
    }
  } else {
    try {
      const data = jwt.verify(token, config.jwt_secret_key);
      if (data.role !== "admin") {
        return res.status(401).send("Do not have Permission");
      } else {
        return next();
      }
    } catch {
      return res.status(401).send("Invalid Token");
    }
  }
};

module.exports = { authorization, authPermissions };
