const authenticated=require('express').Router();
const authMiddleware=require('../middleware/auth');
const authController=require('../controllers/authenticated');
//const profileController=require('../controllers/profiles');
const uploadFile = require('../middleware/uploadFile');
const {body} = require('express-validator');
const rules = require('../middleware/profileValidator');

const phoneValidator = [
  body('phonenumber').isMobilePhone('id-ID').withMessage('Phone number format is incorect')
];
const passwordValidator = [
  body('password').isLength({min: 8}).withMessage('Password length minimal 8 character')
];
const pinValidator = [
  body('pin').isNumeric().withMessage('pin must be number')
];
const amountValidator = [
  body('amount').isLength({min: 5}).withMessage('amount length minimal 5 character'),
  body('amount').isNumeric({min: 20000}).withMessage('amount only number'),
];




//GET
authenticated.get('/profiles', authMiddleware, authController.getProfile);
authenticated.get('/historyTransactions', authMiddleware, authController.historyTransactions);

//POST
authenticated.post('/transfer', authMiddleware, ...amountValidator,authController.transfer);
authenticated.post('/topup', authMiddleware, ...amountValidator,authController.topup);
authenticated.post('/phone', authMiddleware,...phoneValidator, authController.createPhone);
authenticated.patch('/phone', authMiddleware,...phoneValidator, authController.updatePhonenumber);

//PATCH
authenticated.patch('/profiles', authMiddleware, uploadFile, ...rules, authController.updateProfiles);
authenticated.patch('/changePassword', authMiddleware, ...passwordValidator,authController.updatePassword);
authenticated.patch('/changePin', authMiddleware, ...pinValidator,authController.updatePin);
// authenticated.patch('/phone', authMiddleware, uploadFile, ...phoneValidator,authController.updateProfiles);

module.exports=authenticated;