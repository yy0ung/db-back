var con = require('./connect');
var dblogin = {};

dblogin.create = (req,res, dbInfo)=>{
  con.getConnection((err,conn)=>{
    const {host, port, db, user, pw} = req.body
    
    if(dbInfo.host===host && dbInfo.port.toString()===port && dbInfo.database===db&& dbInfo.user===user && dbInfo.password===pw){
        res.send(true)
      }else{
        res.send(false)
      }
  })
}

module.exports = dblogin