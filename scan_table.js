var con = require('./connect');
var scan_table = {};

scan_table.create = function (){
    con.getConnection(function(err,conn){
        var sql = "create table if not exists scantable(테이블_명 VARCHAR(255), 레코드_수 int, 대표_속성 VARCHAR(255), 대표_결합키 VARCHAR(255));";
        conn.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
        var sql = "insert into scantable(테이블_명, 레코드_수) select table_name, TABLE_ROWS from INFORMATION_SCHEMA.tables where table_schema='dbproject' and not table_name in ('selecttable','statistic_attribute','category_attribute','scantable')";
        conn.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
        //대표_속성, 대표_결합키 SQL문 필요 //기본 값이 null이라면...
        var sqlForStatistic = "select 대표_속성, 대표_결합키  from statistic_attribute";
        var sqlForCategory = "select 대표_속성, 대표_결합키 from category_attribute";
        var primaryProperties='';
        var primaryKey='';
        conn.query(sqlForStatistic, function (err, result) {
          if (err) throw err;
          for(let i=0;i<result.length;i++){
            primaryProperties += result[0][i];
            primaryProperties +=", ";
            primaryKey += result[1][i];
            primaryKey +=", ";
          }
        }); /// 쿼리 순서가 걱정됨.
        conn.query(sqlForCategory, function (err, result) {
          if (err) throw err;
          for(let i=0;i<result.length-1;i++){
            primaryProperties += result[0][i];
            primaryProperties +=", ";
            primaryKey += result[1][i];
            primaryKey +=", ";
          }
          primaryProperties += result[0][result.length-1];
          primaryKey += result[1][result.length-1];
          
        });
        var sql = "insert into scantable(대표_속성, 대표_결합키) VALUES (?,?)";
        conn.query(sql, [primaryProperties,primaryKey],function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
        return ;
    });
}

module.exports = scan_table;
