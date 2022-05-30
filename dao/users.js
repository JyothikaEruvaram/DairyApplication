const User= require("../models/users");

async function createUser({
    name,
    age,
    mobile_no,
    email,
    password,
  }) {
    return User.create({
        name,
        age,
        mobile_no,
        email,
        password,
    });
  }
  
  module.exports = { createUser };