const db = require("../utils/mongo");
const { ObjectId } = require("mongodb");

const getAllUsersService = async () => {
  const users = await db.users.find().toArray();
  return users;
};

const getUserByIdService = async (id) => {
  const user = await db.users.findOne({
    _id: new ObjectId(id),
  });
  return user;
};

const findUserByEmailService = async (email) => {
  const user = await db.users.findOne({ email: email });
  return user;
};

const findIsUserByEmailService = async (email, userId) => {
  const user = await db.users.findOne({
    email: email,
    _id: {
      $ne: new ObjectId(userId),
    },
  });

  return user;
};

const updateUserService = async (id, user) => {
  delete user.password;

  const resp = await db.users.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: user,
    }
  );
  return resp;
};

const addUserService = async (user, hash) => {
  user.password = hash;
  console.log(user);
  const res = await db.users.insertOne(user);
  console.log("updated", res.name);
  console.log("added a new user");
  return res;
};

module.exports = {
  getAllUsersService,
  getUserByIdService,
  findUserByEmailService,
  findIsUserByEmailService,
  addUserService,
  updateUserService,
};
