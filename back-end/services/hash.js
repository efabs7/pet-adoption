const bcrypt = require("bcrypt");

const saltRounds = 3;

const createEncryptedPassword = (password, callback) => {
  bcrypt.hash(password, saltRounds, function (err, hash) {
    callback(hash);
  });
};

module.exports = {
  createEncryptedPassword,
};
