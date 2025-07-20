const jwt = require("jsonwebtoken");

// generating token
const tokenGenerator = (username) => {
  const token = jwt.sign(
    { username }, // payload- what should be in token's object
    process.env.JWT_KEY, // secret key for hashing
    { expiresIn: "3hours" } // optional generate new token after given time
  );
return token
};

module.exports.tokenGenerator=tokenGenerator
