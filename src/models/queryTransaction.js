const db = require('../helpers/db');


exports.transfer=(sender_id, data, cb)=>{
  db.query('BEGIN', err=>{
    if(err){
      console.log('error 1');
    }
    else{
      const time1 = new Date();
      const q= 'INSERT INTO transactions(notes, recipient_id, sender_id, amount, time, type_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
      const val = [data.notes, data.recipient_id, sender_id, parseInt(data.amount), time1, data.type_id];
      db.query(q, val, (err, res)=>{
        if(err){
          console.log('error 2');
        }
        else{
          const q2= 'UPDATE profiles SET balance=balance-$1 WHERE iduser=$2 returning *';
          //const q2= 'SELECT * FROM profiles where iduser=$1';
          const val2= [parseInt(data.amount), res.rows[0].sender_id];
          //const val2=[res.rows[0].sender_id];
          //console.log(res.rows[0].sender_id);
          db.query(q2, val2, (err, res)=>{
            //console.log(res.rows);
            if(err){
              console.log('error 3');
            }
            else{
              const q3= 'UPDATE profiles SET balance=balance+$1 WHERE iduser=$2';
              const val3= [parseInt(data.amount), parseInt(data.recipient_id)];
              console.log(data.recipient_id);
              db.query(q3, val3, (err, res)=>{
                console.log(res.rows);
                if(err){
                  console.log('error 4');
                }
                else{
                  cb(err, res);
                  db.query('COMMIT', err=>{
                    if(err){
                      console.error('Error transfer', err.stack);
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
};