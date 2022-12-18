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
        ar sqlForStatistic = 'insert into scantable(대표_속성, 대표_결합키) SELECT  GROUP_CONCAT(IFNULL(대표_속성,""),ifnull(CONCAT (",", 대표_결합키),"") SEPARATOR "," ) FROM statistic_attribute, category_attribute';
        var sqlForCategory = 'insert into scantable(대표_속성, 대표_결합키) SELECT  GROUP_CONCAT(IFNULL(student_name,""),ifnull(CONCAT (",", candidate_key),"") SEPARATOR "," ) FROM statistic_attribute, category_attribute';
        conn.query([sqlForStatistic,sqlForCategory], function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
        return ;
    });
}

module.exports = scan_table;
