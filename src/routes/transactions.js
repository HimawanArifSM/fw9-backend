const trans=require('express').Router();

const transController = require('../controllers/transactions');

trans.get('/', transController.getAllTransactions);

module.exports= trans;