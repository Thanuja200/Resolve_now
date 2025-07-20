const User = require("../../models/Authentication/User-schema");
const mongoose = require("mongoose");
exports.signup_post = async(req, res) => {
  const existing_user=await User.exists({username:req.body.username})
  console.log(`existing_user: ${existing_user}`);
  if (existing_user===null) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email:req.body.email,
    userId:Math.random().toString().substr(2, 6)
  });
  user.save((err, docs) => {
    if (!err) {
      //  console.log("user successfully saved to DB");
      //    res.redirect("/sub-pages/user/login.html");
      res.write(" <h1>Account Successfully created</h1>");
      res.write("<p><a href='/sub-pages/user/login.html'>Please Login</a></p>");
    } else {
      res.write(" <h1>Failed to sign up</h1>");
      res.write(
        "<p><a href='/sub-pages/user/signup.html'>Please try again</a></p>"
      );
      // console.log(err);
    }
  });
  } else {
     res.write(" <h1>User Name already created, please try another one.</h1>");
     res.write("<p><a href='/sub-pages/user/signup.html'>Please Signup</a></p>");
  }


};
