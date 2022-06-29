const transactions=require('express').Router();

const transController = require('../controllers/transactions');

transactions.get('/', transController.getAllTransactions);
transactions.post('/', transController.createTransactions);
// transactions.patch('/:id', transController.updateProfiles);
// transactions.delete('/:id', transController.deleteProfiles);

module.exports= transactions;