var con = require('./connect');
var attr_dic = {};


attr_dic.create = (req,res)=>{
  con.getConnection((err,conn)=>{
    const {id, attr} = req.body
    var sql = 'INSERT INTO attr_dic(id,attr) VALUES(?,?)';
    var params = [id, attr]
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

module.exports = attr_dic;