const db = require('../helpers/db');

exports.getAllTransactions = (cb)=>{
  db.query('SELECT * FROM transactions', (err, res)=>{
    cb(res.rows);
  });
};

exports.createTransactions=(data, cb)=>{
  const q = 'INSERT INTO transactions(notes, recipient_id, sender_id, amount, time, type_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const val = [data.notes, data.recipient_id, data.sender_id, data.amount, data.time, data.type_id];
  db.query(q, val, (err, res)=>{
    console.log(err);
    cb(res.rows);
  });
};