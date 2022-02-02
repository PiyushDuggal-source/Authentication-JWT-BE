const bcrypt = require("bcrypt");
const UserModel = require("../models/models");

const getUsers = (req, res) => {
  console.log(`Route reached with ${req.method}`);
  UserModel.find((err, data) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    res.json(data);
  });
};

const createUser = (req, res) => {
  console.log(`Route reached with ${req.method}`);

  const user = new UserModel(req.body);
  user.hashPassword = bcrypt.hashSync(req.body.password, 10);
  user.save((err, contact) => {
    if (err) {
      res.send(err);
    } else {
      user.hashPassword = undefined;
      res.json(contact);
      console.log(contact);
    }
  });
};

const updateUser = (req, res) => {
  UserModel.findByIdAndUpdate(
    req.params.userId,
    req.body,
    { new: true },
    (err, data) => {
      if (err) {
        console.log(err);
        res.send(err);
      }
      res.send(data);
    }
  );
};

const getSingleUser = (req, res) => {
  UserModel.findById(req.params.userId, (err, data) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    res.json(data);
  });
};

const deleteUser = (req, res) => {
  UserModel.findByIdAndDelete(req.params.userId, () => {
    console.log("deleted");
    res.json({ deleted: true });
  });
};
module.exports = {
  getUsers,
  createUser,
  updateUser,
  getSingleUser,
  deleteUser,
};
