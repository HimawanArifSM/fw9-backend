const profilesModel = require('../models/profiles');
const response = require('../helpers/standardRespons');
const transactionsModel = require('../models/transactions');
const qtModels = require('../models/queryTransaction');
const errorResponse = require('../helpers/errorResponse');


exports.profile = (req, res)=>{
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
      if(profile.phonenumber === null){
        userModel.updateUsers(user.id, {pin:req.body.pin}, (err, resultUpdate)=>{
          const userUpdated = resultUpdate.rows[0];
          if(userUpdated.email === user.email){
            return response(res, 'Create pin successfully');
          }
        });
      }
      else{
        return response(res, 'Error: PIN already set', null, null, 400);
      }
    }
    else{return response(res, 'Error: Failed to create PIN', null, null, 400);
    }
  });
};
