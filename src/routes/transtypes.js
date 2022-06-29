const transactiontypes=require('express').Router();

const transtypeController = require('../controllers/transtype');

transactiontypes.get('/', transtypeController.getAllTranstype);
transactiontypes.post('/', transtypeController.createTranstype);
transactiontypes.patch('/:id', transtypeController.updateTranstype);
transactiontypes.delete('/:id', transtypeController.deleteTranstype);
transactiontypes.get('/:id', transtypeController.getDetailTranstype);

module.exports= transactiontypes;
