const userService = require('../service/userService');

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               favorecidos:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Usuário registrado
 *       400:
 *         description: Erro de validação
 *
 * /login:
 *   post:
 *     summary: Realiza login do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado
 *       401:
 *         description: Usuário ou senha inválidos
 *
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     responses:
 *       200:
 *         description: Lista de usuários
 */

const register = (req, res) => {
  const result = userService.registerUser(req.body);
  if (result.error) return res.status(400).json({ error: result.error });
  res.status(201).json(result.user);
};

const login = (req, res) => {
  const result = userService.loginUser(req.body);
  if (result.error) return res.status(401).json({ error: result.error });
  // Retorna o token junto com o usuário
  res.json({ user: result.user, token: result.token });
};

const list = (req, res) => {
  const result = userService.listUsers();
  res.json(result.users);
};

module.exports = {
  register,
  login,
  list
};
