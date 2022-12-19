var con = require('./connect');
var search = {};

function searchMethod(tablename, key, att, attName){
  var sql = "select * from scan_done_table";
  if (tablename==null && key==null && att==null && attName==null)
      var sql = "select * from scan_done_table";
  else if(tablename==null && key==null && att==null)
      var sql = "SELECT * FROM scan_done_table WHERE 테이블_명=(SELECT table_name FROM information_schema.COLUMNS WHERE COLUMN_NAME='"+attName+"');";
  else if(tablename==null && key==null && attName==null)
      var sql = "SELECT * FROM scan_done_table WHERE 대표_속성 like'%"+att+"%';";
  else if(tablename==null && att==null && attName==null)
      var sql = "SELECT * FROM scan_done_table WHERE 대표_결합키 like '%"+key+"%'";
  else if(key==null && att==null && attName==null)
      var sql = "SELECT * FROM scan_done_table WHERE 테이블_명 like'%"+tablename+"%'";
  else if(tablename==null && key==null)
      var sql = "SELECT * FROM scan_done_table WHERE 테이블_명=(SELECT table_name FROM information_schema.COLUMNS WHERE COLUMN_NAME='"+attName+"') and 대표_속성='%"+att+"'%";
  else if(tablename==null && att==null)
      var sql = "SELECT * FROM scan_done_table WHERE 대표_결합키='"+key+"' and 테이블_명=(SELECT table_name FROM information_schema.COLUMNS WHERE COLUMN_NAME='"+attName+"');";
  else if(tablename==null && attName==null)
      var sql = "SELECT * FROM scan_done_table WHERE 대표_결합키='"+key+"' and 대표_속성='%"+att+"'%";
  else if(key==null && att==null)
      var sql = "SELECT * FROM scan_done_table WHERE 테이블_명='"+tablename+"' and 테이블_명=(SELECT table_name FROM information_schema.COLUMNS WHERE COLUMN_NAME='"+attName+"');";
  else if(key==null && attName==null)
      var sql = "SELECT * FROM scan_done_table WHERE 테이블_명='"+tablename+"' and 대표_속성='"+attName+"';";
  else if(att==null && attName==null)
      var sql = "SELECT * FROM scan_done_table WHERE 테이블_명='"+tablename+"' and 대표_결합키='"+key+"';";
  else if(tablename==null)
      var sql = "SELECT * FROM scan_done_table WHERE 테이블_명=(SELECT table_name FROM information_schema.COLUMNS WHERE COLUMN_NAME='"+attName+"') and 대표_결합키='"+key+"' and 대표_속성='%"+att+"'%";
  else if(key==null)
      var sql = "SELECT * FROM scan_done_table WHERE 테이블_명=(SELECT table_name FROM information_schema.COLUMNS WHERE COLUMN_NAME='"+attName+"') and 테이블_명='"+tablename+"' and 대표_속성='%"+att+"'%";
  else if(att=null)
      var sql = "SELECT * FROM scan_done_table WHERE 테이블_명=(SELECT table_name FROM information_schema.COLUMNS WHERE COLUMN_NAME='"+attName+"') and 테이블_명='"+tablename+"' and 대표_결합키='"+key+"'";
  else if(attName==null)
      var sql = "SELECT * FROM scan_done_table WHERE 대표_속성='%"+att+"%' and 테이블_명='"+tablename+"' and 대표_결합키='"+key+"'";
  else
  var sql = "SELECT * FROM scan_done_table WHERE 테이블_명=(SELECT table_name FROM information_schema.COLUMNS WHERE COLUMN_NAME='"+attName+"') and 테이블_명='"+tablename+"' and 대표_결합키='"+key+"' and 대표_속성='%"+att+"'%";
  return sql;
}

search.create = function (req, res, tablename, key, att, attName){
    con.getConnection((err,conn)=>{
      const sql = searchMethod(tablename, key, att, attName)
      console.log(sql)
      conn.query(sql, (err, row)=>{
        res.send(row)
        console.log("search done")
      })
    })
}

module.exports = search;