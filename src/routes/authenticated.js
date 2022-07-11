const authenticated=require('express').Router();
const authMiddleware=require('../middleware/auth');
const authController=require('../controllers/authenticated');

authenticated.get('/profiles', authMiddleware, authController.profile);
authenticated.get('/hostoryTransactions', authMiddleware, authController.historyTransactions);
authenticated.post('/transfer', authMiddleware, authController.transfer);

module.exports=authenticated;