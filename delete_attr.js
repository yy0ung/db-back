var con = require('./connect');
var delete_attr = {};

delete_attr.create = (req,res)=>{
  con.getConnection((err,conn)=>{
    const {table, name} = req.body
    //safe delete 기능 해제하고 해야 제대로 작동함.
    var sql = 'DELETE FROM '+table+' where 속성명 = "'+name+'"'
    conn.query(sql, (err, rows, fields)=>{
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

module.exports = delete_attr;