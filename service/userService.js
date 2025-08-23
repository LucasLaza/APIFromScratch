const { findUserByUsername, addUser } = require('../model/userModel');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../service/authService');

function registerUser({ username, password, favorecidos = [] }) {
  if (!username || !password) {
    return { error: 'Usuário e senha são obrigatórios.' };
  }
  if (findUserByUsername(username)) {
    return { error: 'Usuário já existe.' };
  }
  const user = { username, password, saldo: 10000, favorecidos };
  addUser(user);
  return { user };
}

function loginUser({ username, password }) {
  const user = findUserByUsername(username);
  if (!user || user.password !== password) {
    return { error: 'Usuário ou senha inválidos.' };
  }
  // Gera o token JWT
  const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: '1h' });
  return { user, token };
}

function listUsers() {
  return { users: require('../model/database').users };
}

module.exports = {
  registerUser,
  loginUser,
  listUsers
};
