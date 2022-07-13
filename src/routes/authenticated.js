const authenticated=require('express').Router();
const authMiddleware=require('../middleware/auth');
const authController=require('../controllers/authenticated');
//const profileController=require('../controllers/profiles');
const uploadFile = require('../middleware/uploadFile');

//GET
authenticated.get('/profiles', authMiddleware, authController.getProfile);
authenticated.get('/hostoryTransactions', authMiddleware, authController.historyTransactions);

//POST
authenticated.post('/transfer', authMiddleware, authController.transfer);
authenticated.post('/phone', authMiddleware, authController.createPhone);

//PATCH
authenticated.patch('/profiles', authMiddleware, uploadFile, authController.updateProfiles);
authenticated.patch('/changePassword', authMiddleware, authController.updatePassword);
authenticated.patch('/changePin', authMiddleware, authController.updatePin);
authenticated.patch('/phone', authMiddleware, uploadFile, authController.updateProfiles);

module.exports=authenticated;