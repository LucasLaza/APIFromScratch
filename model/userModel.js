const { users } = require('../model/database');

function findUserByUsername(username) {
  return users.find(u => u.username === username);
}

function addUser(user) {
  users.push(user);
}

module.exports = {
  findUserByUsername,
  addUser
};
