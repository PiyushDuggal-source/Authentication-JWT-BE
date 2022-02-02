const { hash } = require("bcrypt");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userModel = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  hashPassword: { type: String, required: true },
});

userModel.methods.comparepass = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

const UserModel = mongoose.model("user", userModel);

module.exports = UserModel;
