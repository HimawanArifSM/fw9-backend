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
    //console.log(err);
    cb(res.rows);
  });
};

exports.updateTransactions=(id, data, cb)=>{
  const q = 'UPDATE transactions SET notes=$1, recipient_id=$2, sender_id=$3, amount=$4, time=$5, type_id=$6 WHERE id=$7 RETURNING *';
  const val = [data.notes, data.recipient_id, data.sender_id, data.amount, data.time, data.type_id, id];
  db.query(q, val, (err, res)=>{
    //console.log(res);
    cb(res.rows);
  });
};

exports.deleteTransactions=(id, data, cb)=>{
  const q = 'DELETE FROM transactions WHERE ID=$1 RETURNING *';
  const val = [id];
  db.query(q, val, (err, res)=>{
    cb(res.rows);
  });
};

exports.getDetailTransactions = (id, cb)=>{
  const q = 'SELECT * FROM transactions WHERE id=$1';
  const val = [id];
  db.query(q, val, (err, res)=>{
    //console.log(res);
    cb(res.rows);
  });
};