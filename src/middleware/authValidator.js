const { body } =require('express-validator');
const bcrypt = require('bcrypt');

exports.register = [
  body('email').isEmail().withMessage('Email format invalid'),
  body('username').isLength({min: 4}).withMessage('Username length minimal 4 character'),
  body('limit').toInt(),
  body('page').toInt(), 
  body('password').isLength({min: 8}).withMessage('Password length minimal 8 character')
    .customSanitizer(async (val)=>{
      const hash = await bcrypt.hash(val, 10);
      return hash;
    })
]; 

exports.createPin = [
  body('email').isEmail().withMessage('Email format invalid'),
  body('pin').isLength(6).withMessage('Pin must 6 numbers'),
  body('pin').isNumeric().withMessage('pin must be number')
];

exports.login = [
  body('email').isEmail().withMessage('Email format invalid'),
];
