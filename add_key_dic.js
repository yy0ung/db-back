var con = require('./connect');
var key_dic = {};


key_dic.create = (req,res)=>{
  con.getConnection((err,conn)=>{
    const {id, key} = req.body
    var sql = 'INSERT INTO key_dic(id, key_attr) VALUES(?,?)';
    var params = [id, key]
    conn.query(sql, params, (err, rows, fields)=>{
      if(err){
        res.send(err)
        console.log(err)
      }else{
        res.send(rows)
        console.log("success")
      }
    })
  })
}

module.exports = key_dic;