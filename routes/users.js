const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const UserDao = require("../dao/users");

router.post("/", jsonParser, async (req, res) => {
    console.log(req.body);
    try {
      const newUser = await UserDao.createUser(req.body);
      res.json({
        message: `Created a new user with user_id ${newUser.user_id}`,
      });
    } catch (err) {
      res.json({
        error: err.toString(),
      });
    }
  });

  module.exports = router;