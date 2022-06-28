const controller = require("../controllers/controller");
const userReg = require("../controllers/userController");

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.send("hello");
  });

  app.route("/users").get(userReg.loginRequired, controller.getUsers);

  app
    .route("/users/:userId")
    .get(userReg.loginRequired, controller.getSingleUser)
    .put(userReg.loginRequired, controller.updateUser)
    .delete(userReg.loginRequired, controller.deleteUser);

  app.route("/auth/register").post(controller.createUser);
  app.route("/auth/login").post(userReg.login);
};
module.exports = routes;
