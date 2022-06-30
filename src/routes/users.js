const users=require('express').Router();

const userController = require('../controllers/users');

const { body } =require('express-validator');

const createUsersValidator = [
  body('email').isEmail().withMessage('Email format invalid'),
  body('username').isLength({min: 4}).withMessage('Username length minimal 4 character')
];

users.get('/', userController.getAllUsers);
users.post('/', ...createUsersValidator, userController.createUsers);
users.patch('/:id', ...createUsersValidator,userController.updateUsers);
users.delete('/:id', userController.deleteUsers);
users.get('/:id', userController.getDetailUsers);

module.exports= users;