const profiles=require('express').Router();

const profileController = require('../controllers/profiles');

profiles.get('/', profileController.getAllProfiles);

module.exports= profiles;