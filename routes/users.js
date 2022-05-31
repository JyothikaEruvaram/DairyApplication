/*const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const userDao=require("../controllers/users");

router.post("/", jsonParser, async (req, res) => {
  console.log("Inside user routes");
  console.log(req.body);
  try {
    const newUser = await userDao.createUser(req.body);
    res.json({
      message: `Created a new user with new id ${newUser.id}`,
    });
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});


module.exports = router;*/

const express = require('express');
const usersController = require('../controllers/users');
const router = express.Router();
router.post('/signup',usersController.signupUser);
router.post('/login', usersController.loginUser);
router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUserById);

module.exports = router;