const db = require('../helpers/db');

exports.getAllTransactions = (cb)=>{
  db.query('SELECT * FROM transactions', (err, res)=>{
    cb(res.rows);
  });
};