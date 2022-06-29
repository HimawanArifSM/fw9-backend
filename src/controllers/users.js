const response = require('../helpers/standardRespons');

const userModel = require('../models/users');

exports.getAllUsers = (req, res)=>{
  userModel.getAllUsers((results)=>{
    return response(res, 'message from standard response', results);
  });
};

exports.createUsers = (req, res)=>{
  userModel.createUsers(req.body, (results)=>{
    return response(res, 'Create user succesfully', results[0]);
  });
};

exports.updateUsers = (req, res)=>{
  const {id}=req.params;
  userModel.updateUsers(id, req.body, (results)=>{
    return response(res, 'Update user succesfully', results[0]);
  });
};

exports.deleteUsers = (req, res)=>{
  const {id}=req.params;
  userModel.deleteUsers(id, req.body, (results)=>{
    return response(res, 'Delete user successfully', results[0]);
  });
};

exports.getDetailUsers = (req, res)=>{
  const {id}=req.params;
  userModel.getDetailUsers(id, (results)=>{
    return response(res, 'detail user', results[0]);
  });
};