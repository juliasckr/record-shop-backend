const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const token = req.header("x-auth");
  const decodedToken = jwt.verify(token, "secretkeyfromjulia");
  console.log(decodedToken);
  if (decodedToken) {
    next();
  } else {
    next(new Error("authorized user"));
  }
};
