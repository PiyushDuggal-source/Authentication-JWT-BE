const express = require("express");
const bp = require("body-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = express();
const routes = require("./src/routes/routes");

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

// jwt setup
app.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      "secret",
      (err, decode) => {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

mongoose
  .connect(
    "mongodb+srv://piyush:piyush@cluster0.mavgm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    const server = app.listen(3000, () => {
      console.log(`server is listening on port ${server.address().port}`);
    });
  });

routes(app);
