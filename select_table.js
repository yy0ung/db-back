var con = require('./connect');
var select_table = {};

select_table.create = function (){
    con.getConnection(function(err,conn){
        var sql = "create table if not exists selecttable(테이블_명 VARCHAR(255), 레코드_수 int, 속성 VARCHAR(255), 스캔여부 boolean);";
        conn.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
        var sql = "insert into selecttable(테이블_명, 레코드_수) select table_name, TABLE_ROWS from INFORMATION_SCHEMA.tables where table_schema='dbproject' and not table_name in ('selecttable','statistic_attribute','category_attribute','scantable')";
        conn.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
        
        //속성 update 필요
        var sql = "SELECT COLUMN_NAME FROM information_schema.columns WHERE TABLE_NAME = '"+fileName+"'";
        conn.query(sql, function (err, result) {
          if (err) throw err;
          let properties='';
          for (let i=0;i<result.length-1;i++) {
            properties += result[i];
            properties += ', ';
          }
          properties += result[result.length-1];
          var sql = "insert into selecttable(속성) VALUES(?)";
          
          conn.query(sql, properties, function(err,result){
            if (err) throw err;
            console.log("insert done");
          });
          console.log("Table created");
        });
        return ;
    });
}

module.exports = select_table;
