const transactiontypes=require('express').Router();

const transtypeController = require('../controllers/transtype');

transactiontypes.get('/', transtypeController.getAllTranstype);

module.exports= transactiontypes;
