const users=require('express').Router();

const userController = require('../controllers/users');

const { body } =require('express-validator');

const bcrypt = require('bcrypt');

const createUsersValidator = [
  body('email').isEmail().withMessage('Email format invalid'),
  body('username').isLength({min: 4}).withMessage('Username length minimal 4 character'),
  body('limit').toInt(),
  body('page').toInt(),
  body('pin').isLength(6).withMessage('Pin must be 6 character'),
  body('pin').isNumeric().withMessage('Pin must be number only'),  
  body('password').isLength({min: 8}).withMessage('Password length minimal 8 character')
    .customSanitizer(async (val)=>{
      const hash = await bcrypt.hash(val, 10);
      return hash;
    })
];

users.get('/', userController.getAllUsers);
users.post('/', ...createUsersValidator, userController.createUsers);
users.patch('/:id', ...createUsersValidator,userController.updateUsers);
users.delete('/:id', userController.deleteUsers);
users.get('/:id', userController.getDetailUsers);

module.exports= users;