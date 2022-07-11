const authenticated=require('express').Router();
const authMiddleware=require('../middleware/auth');
const authController=require('../controllers/authenticated');
const profileController=require('../controllers/profiles');
const uploadFile = require('../middleware/uploadFile');

//GET
authenticated.get('/profiles', authMiddleware, authController.getProfile);
authenticated.get('/hostoryTransactions', authMiddleware, authController.historyTransactions);

//POST
authenticated.post('/transfer', authMiddleware, authController.transfer);
authenticated.post('/addPhonenumber', authMiddleware, authController.createPhone);

//PATCH
authenticated.patch('/updateprofile', authMiddleware, uploadFile, profileController.updateProfiles);
authenticated.patch('/updatePassword', authMiddleware, authController.updatePassword);
authenticated.patch('/updatePin', authMiddleware, authController.updatePin);
authenticated.patch('/updatePhone', authMiddleware, uploadFile, profileController.updateProfiles);

module.exports=authenticated;