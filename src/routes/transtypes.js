const transactiontypes=require('express').Router();

const transtypeController = require('../controllers/transtype');

const { body } =require('express-validator');

const createTranstypeValidator = [
  body('name').isLength({min: 4}).withMessage('Name length minimal 4 character')
];

transactiontypes.get('/', transtypeController.getAllTranstype);
transactiontypes.post('/', ...createTranstypeValidator,transtypeController.createTranstype);
transactiontypes.patch('/:id', ...createTranstypeValidator,transtypeController.updateTranstype);
transactiontypes.delete('/:id', transtypeController.deleteTranstype);
transactiontypes.get('/:id', transtypeController.getDetailTranstype);

module.exports= transactiontypes;
