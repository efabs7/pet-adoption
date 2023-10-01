const { createEncryptedPassword } = require("../services/hash");
const {
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  addUserService,
  findIsUserByEmailService,
  findUserByEmailService,
} = require("../services/userService");

const { getPermissions } = require("../utils/permissions");

const cleanUser = (u) => {
  delete u.password;
  return u;
};

const getAllUsers = async (req, res) => {
  const users = await getAllUsersService();
  res.status(200).send(users);
};

const getAllUsersAdmin = async (req, res) => {
  const permissions = getPermissions(+req.params.admin);
  if (!permissions.admin) {
    return res.status(401).send("u unauthorized sry");
  }
  const users = await getAllUsersService();
  res.status(200).send(users);
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  const user = await getUserByIdService(id);
  delete user.password;
  res.status(200).send(user);
  //handle error
};

const getFullUserInfoById = async (req, res) => {
  const id = req.params.id;
  const user = await getUserByIdService(id);
  res.status(200).send(user);
};

const addUser = async (req, res) => {
  console.log("add new user");
  const { email, password } = req.body;
  const user = await findUserByEmailService(email);
  if (user) {
    return res
      .status(400)
      .send("Sorry, this email already exists in our system");
  }
  try {
    createEncryptedPassword(password, async (hash) => {
      console.log("creating password");
      const resp = await addUserService(req.body, hash);

      res.status(201).send(resp);
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Sorry, we had an issue processing this request. Please try again");
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { email } = req.body;
  const user = await findIsUserByEmailService(email, id);
  if (user) {
    return res
      .status(400)
      .send("sorry, this email already exists! try more, universe is infinite");
  }
  const resp = await updateUserService(id, req.body);
  res.send(resp);
};

module.exports = {
  getAllUsers,
  getUserById,
  getFullUserInfoById,
  addUser,
  updateUser,
  getAllUsersAdmin,
};
