/**
 * @swagger
 * /transfer:
 *   post:
 *     summary: Realiza transferência de valores
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               from:
 *                 type: string
 *               to:
 *                 type: string
 *               value:
 *                 type: number
 *     responses:
 *       200:
 *         description: Transferência realizada
 *       400:
 *         description: Erro na transferência
 */

const transferService = require('../service/transferService');

const transfer = (req, res) => {
  const { from, to, value } = req.body;
  const result = transferService.transfer({ from, to, value });
  if (result.error) return res.status(400).json({ error: result.error });
  res.json({ success: true });
};

module.exports = {
  transfer
};
