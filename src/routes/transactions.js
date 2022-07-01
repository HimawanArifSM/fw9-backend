const transactions=require('express').Router();

const transController = require('../controllers/transactions');

const { body } =require('express-validator');

const createTransactionValidator = [
  body('recipient_id').isLength({min: 1}).withMessage('recipient_id length minimal 1 character'),
  body('sender_id').isLength({min: 1}).withMessage('sender_id length minimal 1 character'),
  body('amount').isLength({min: 1}).withMessage('amount length minimal 1 character'),
  body('type_id').isLength({min: 1}).withMessage('type_id length minimal 1 character'),
];

transactions.get('/', transController.getAllTransactions);
transactions.post('/', ...createTransactionValidator,transController.createTransactions);
transactions.patch('/:id', ...createTransactionValidator,transController.updateTransactions);
transactions.delete('/:id', transController.deleteTransactions);
transactions.get('/:id', transController.getDetailTransactions);

module.exports= transactions;