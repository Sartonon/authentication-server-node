const jwt = require('jwt-simple');
const User = require("../models/user");
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }

  // See if a user with the given email exist
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }
  });
  // If a user with email does exist, return an error
  const user = new User({
    email: email,
    password: password
  });

  // If a user with email does NOT exist. create and save user record
  user.save(function(err) {
    if (err) {
      return next(err);
    }

    // Repond to request indicating the user was created
    res.json({ token: tokenForUser(user) });
  });
};
