const db = require('../helpers/db');

exports.getAllTranstype = (cb)=>{
  db.query('SELECT * FROM transactiontype', (err, res)=>{
    cb(res.rows);
  });
};