const {validationResult}= require('express-validator');
const response = require('../helpers/standardResponse');

const validation = (req, res, next)=>{
  const errors = validationResult(res);
  if (!errors.isEmpty){
    return response(res, 'Error Ocured', errors.array(), null, 400);
  }
  next();
};

module.exports=validation;