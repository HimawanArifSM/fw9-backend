const transactions=require('express').Router();

const transController = require('../controllers/transactions');

transactions.get('/', transController.getAllTransactions);
transactions.post('/', transController.createTransactions);
transactions.patch('/:id', transController.updateTransactions);
transactions.delete('/:id', transController.deleteTransactions);
transactions.get('/:id', transController.getDetailTransactions);

module.exports= transactions;