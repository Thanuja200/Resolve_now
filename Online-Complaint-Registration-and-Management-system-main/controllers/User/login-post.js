const User = require("../../models/Authentication/User-schema");
const mongoose = require("mongoose");
const Token = require("../../jwt/token");
exports.login_post = (req, res) => {
  User.findOne({ username: req.body.username }, (err, docs) => {
    if (!err) {
      // console.log(docs);
      // res.sendStatus(200)
      // console.log(docs);
      if (docs != null) {
        // console.log("notnull");
        if (docs.password === req.body.password) {
          // res.send("Valid Password")
          const token = Token.tokenGenerator(docs.username); // it will generate token
          res.cookie("jwt", token); // storing token in cookie
          res.redirect(`/user/${docs.userId}`);
        } else {
          res.send("inValid Password");
        }
      } else {
        res.write("<h1>User Not found</h1>");
        res.write("<h3><a href='/sub-pages/user/signup.html'>Sign up</a></h3>");
        // console.log("null");
      }
    } else {
      res.sendStatus(404);
    }
  });
};
