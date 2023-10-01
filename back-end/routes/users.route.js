const express = require("express");
const { userSchema } = require("../schema/userSchema");
const { userSchemaPutRequest } = require("../schema/userSchema");
const { validateSchema } = require("../schema/validate");
const {
  getAllUsers,
  getUserById,
  getFullUserInfoById,
  updateUser,
  getAllUsersAdmin,
} = require("../controllers/userController");

const route = express.Router();

//import service functions and add to route

route.get("/", getAllUsers); //getAllUsers service)
//portected to admin only
//clean for passwords
route.get("/admin/:admin", getAllUsersAdmin);
route.get("/:id", getUserById); //getUserById
route.get("/:id/full", getFullUserInfoById); //this will get all the user info except for password including pets they own etc

route.put("/:id", validateSchema(userSchemaPutRequest), updateUser); //updateUser
route.put("/petInfo/:id", updateUser);
//if email is changed make sure it is not already in use (in usercontroller)
//password, email, first, last, phone, bio

module.exports = route;
