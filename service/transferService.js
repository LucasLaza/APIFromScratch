const { findUserByUsername } = require('../model/userModel');
const { addTransfer } = require('../model/transferModel');

function transfer({ from, to, value }) {
  if (!from || !to || typeof value !== 'number') {
    return { error: 'Dados obrigatórios para transferência.' };
  }
  const sender = findUserByUsername(from);
  const recipient = findUserByUsername(to);
  if (!sender || !recipient) {
    return { error: 'Usuário remetente ou destinatário não encontrado.' };
  }
  if (sender.saldo < value) {
    return { error: 'Saldo insuficiente.' };
  }
  const isFavorecido = sender.favorecidos && sender.favorecidos.includes(to);
  if (!isFavorecido && value >= 5000) {
    return { error: 'Transferências acima de R$ 5.000,00 só são permitidas para favorecidos.' };
  }
  sender.saldo -= value;
  recipient.saldo += value;
  addTransfer({ from, to, value, date: new Date() });
  return { success: true };
}

module.exports = {
  transfer
};
