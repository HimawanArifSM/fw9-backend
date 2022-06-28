const transactions=require('express').Router();

const transController = require('../controllers/transactions');

transactions.get('/', transController.getAllTransactions);

module.exports= transactions;