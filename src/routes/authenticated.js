const authenticated=require('express').Router();
const authMiddleware=require('../middleware/auth');
const authController=require('../controllers/authenticated');

authenticated.get('/profiles', authMiddleware, authController.profile);