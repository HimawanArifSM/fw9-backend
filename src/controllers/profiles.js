const response = require('../helpers/standardRespons');

const profilesModel= require('../models/profiles');

exports.getAllProfiles = (req, res)=>{
  profilesModel.getAllProfiles((results)=>{
    return response(res, 'message from standardresponse', results);
  });
};

// const response = require('../helpers/standardRespons');

// const userModel = require('../models/users');

// exports.getAllUsers = (req, res)=>{
//   userModel.getAllUsers((results)=>{
//     return response(res, 'message from standard response', results);
//   });
// };