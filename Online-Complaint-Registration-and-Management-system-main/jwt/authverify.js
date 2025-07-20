const jwt = require("jsonwebtoken");

// protecting the routes
const tokenValidator = async (token) => {
  try {
    const data = await jwt.verify(token, process.env.JWT_KEY); // verifing token with token and secretKey
    return data; // will return True or False
  } catch (error) {
    return data; // retuen false
  }
}; // middleware
module.exports = async function (req, res, next) {
  try {
    const { jwt } = req.cookies;
    const valid = await tokenValidator(jwt);
    if (valid) {
      next();
    }
  } catch (error) {
    res.redirect("/sub-pages/login.html");
  }
};
