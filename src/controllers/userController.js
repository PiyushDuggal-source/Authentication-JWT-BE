const jsonwebtoken = require("jsonwebtoken");
const UserModel = require("../models/models");
const loginRequired = (req, res, next) => {
  if (req.user) {
    console.log("This is the User", req.user);
    next();
  } else {
    return res.status(401).json({ messege: "unauthorized" });
  }
};

const login = (req, res) => {
  UserModel.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      res.status(401).json({ messege: "Authentication failed. No user found" });
    } else if (user) {
      if (!user.comparepass(req.body.password, user.hashPassword)) {
        res.status(401).json({ messege: "Authentication failed" });
      } else {
        return res.json({
          token: jsonwebtoken.sign(
            {
              email: user.email,
              firstName: user.firstName,
              _id: user._id,
            },
            "secret"
          ),
        });
      }
    }
  });
};

module.exports = { login, loginRequired };
