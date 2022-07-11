const router = require('express').Router();

router.use('/admin/users', require('./users'));
router.use('/admin/transactions', require('./transactions'));
router.use('/admin/profiles', require('./profiles'));
router.use('/admin/transtypes', require('./transtypes'));
router.use('/auth', require('./auth'));
router.use('/authenticated', require('./authenticated'));

module.exports = router;