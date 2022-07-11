const profilesModel = require('../models/profiles');
const response = require('../helpers/standardRespons');
const transactionsModel = require('../models/transactions');
const qtModels = require('../models/queryTransaction');
const errorResponse = require('../helpers/errorResponse');
const userModel=require('../models/users');
const bcrypt = require('bcrypt');


exports.getProfile = (req, res)=>{
  const {id}=req.authUser;
  //console.log('tes'+id)
  profilesModel.getLogedProfiles(id, (err, results)=>{
    //console.log(results);
    if(results.rows.length > 0){
      return response(res, 'Detail profiles', results.rows[0]);
    }
    else{return res.redirect('/404');
    }
  });
};

exports.historyTransactions = (req, res)=>{
  const {id}=req.authUser;
  //console.log('tes'+id)
  transactionsModel.getHistoryTransactions(id, (err, results)=>{
    //console.log(results);
    if(results.rows.length > 0){
      return response(res, 'Detail profiles', results.rows[0]);
    }
    else{return res.redirect('/404');
    }
  });
};

exports.transfer=(req, res)=>{
  const sender_id=req.authUser.id;
  qtModels.transfer(sender_id, req.body, (err, results)=>{
    if(err){
      return errorResponse(err,res);
    }
    else{
      return response(res, 'Transaction success', results.rows[0]);
    }
  });
};

exports.createPhone= (req, res)=>{
  const {id}= req.authUser;
  profilesModel.getLogedProfiles(id, (err, results)=>{
    if(results.rows.length >0){
      const profile= results.rows[0];
      console.log(profile);
      if(profile.phonenumber === null||profile.phonenumber===''){
        profilesModel.updateProfiles(profile.iduser, null, {phonenumber:req.body.phonenumber}, (err, resultUpdate)=>{
          const profileUpdated = resultUpdate.rows[0];
          console.log(profileUpdated);
          if(profileUpdated.iduser === profile.iduser){
            return response(res, 'Add Phone number success');
          }
        });
      }
      else{
        return response(res, 'Error: Phone number already set', null, null, 400);
      }
    }
    else{return response(res, 'Error: Failed to set Phone number', null, null, 400);
    }
  });
};

exports.updatePassword=(req, res)=>{
  const {id}=req.authUser;
  const {oldPassword, password}=req.body;
  userModel.getDetailUsers(id, (err, results)=>{
    if(results.rows.length <1){
      return response(res,'User not found', null, null, 400);
    }
    const user = results.rows[0];
    // console.log(user);
    // console.log(password);
    bcrypt.compare(oldPassword, user.password)
      .then((cpRes)=>{
        if(cpRes){
          bcrypt.hash(password, 10, (err, hash)=>{
            user.password=hash;
            console.log(user.password);
            userModel.updateUsers(id, user, (err, results)=>{
              console.log(err);
              if(err){
                return errorResponse(err, res);
              }
              else{
                return response(res, 'Update password succesfully', results[0]);
              }
            });
          });
        }else{
          return response(res, 'Old password and new password doesnt match', null, null, 400);
        }
      })
      .catch(e =>{
        return response(res, 'Old password and new password doesnt match', null, null, 404);
      });
  });
};


exports.updatePin=(req, res)=>{
  const {id}=req.authUser;
  const {oldPin}=req.body;
  console.log(req.body);
  userModel.getDetailUsers(id, (err, results)=>{
    if(results.rows.length <1){
      return response(res,'User not found', null, null, 400);
    }
    const user = results.rows[0];
    console.log(user.pin);
    if(user.pin==parseInt(oldPin)){
      userModel.updateUsers(id, req.body, (err, results)=>{
        if(err){
          return errorResponse(err, res);
        }
        else{
          return response(res, 'Update pin succesfully', results[0]);
        }
      });
    }else{
      return response(res, 'Pin doesnt match');
    }
  });
};