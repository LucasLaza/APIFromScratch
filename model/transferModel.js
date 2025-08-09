const { transfers } = require('../model/database');

function addTransfer(transfer) {
  transfers.push(transfer);
}

module.exports = {
  addTransfer
};
