var con = require('./connect');
var multi_join = {};

//table명이랑 att에 해당되는 대표결합키 받아올 방법 찾기
multi_join.create = function (req, res, table1, table2, att1, att2){
  con.getConnection((err,conn)=>{
    for(let i=0; i<table2.length; i++){
      const sql2 = "CREATE TABLE if not exists multi_"+table1+"_"+table2[i]+" SELECT * FROM "+table1+" JOIN "+table2[i]+" ON "+att1+" = "+att2[i];
      console.log(sql2)
      conn.query(sql2, (err,row)=>{
        console.log("create join")
      })
    }
    
   })
   return;
}
module.exports = multi_join;