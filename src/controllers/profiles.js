const response = require('../helpers/standardRespons');

const profilesModel= require('../models/profiles');

exports.getAllProfiles = (req, res)=>{
  profilesModel.getAllProfiles((results)=>{
    return response(res, 'message from standardresponse', results);
  });
};

exports.createProfiles = (req, res)=>{
  profilesModel.createProfiles(req.body, (results)=>{
    return response(res, 'Create profile succesfully', results[0]);
  });
};

exports.updateProfiles = (req, res)=>{
  const {id}=req.params;
  profilesModel.updateProfiles(id, req.body, (results)=>{
    return response(res, 'Update profile succesfully', results[0]);
  });
};

exports.deleteProfiles = (req, res)=>{
  const {id}=req.params;
  profilesModel.deleteProfiles(id, req.body, (results)=>{
    return response(res, 'Delete profile successfully', results[0]);
  });
};

exports.getDetailProfiles = (req, res)=>{
  const {id}=req.params;
  profilesModel.getDetailProfiles(id, (results)=>{
    return response(res, 'detail profile', results[0]);
  });
};