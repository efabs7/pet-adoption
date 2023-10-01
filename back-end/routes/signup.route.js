const express = require("express");
const db = require("../utils/mongo");
const { validateSchema } = require("../schema/validate");
const { userSchema } = require("../schema/userSchema");
const route = express.Router();
const { addUser } = require("../controllers/userController");

route.post("/", validateSchema(userSchema), addUser);

module.exports = route;
