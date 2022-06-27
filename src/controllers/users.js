const response = require('../helpers/standardRespons')

exports.getAllUsers = (req, res)=>{
    return response(res, 'message from standard response')
}