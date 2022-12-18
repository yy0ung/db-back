var con = require('./connect');
var scan_table = {};

scan_table.create = function (tableName){  /// table name을 받도록 추가했습니다.
    con.getConnection(function(err,conn){
      console.log("여긴 scantable");
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

        

        //대표_속성, 대표_결합키 SQL문 필요 //기본 값이 null이라면...  scantable에서 테이블_명 값을 기준으로 update하도록 만들었습니다
        var sqlForProperty = 'update  scantable set 대표_속성=(SELECT  GROUP_CONCAT(IFNULL(대표_속성,""),ifnull(CONCAT (",", 대표_속성),"") SEPARATOR "," ) FROM statistic_attribute, category_attribute) where 테이블_명='+tableName;
        
        var sqlForKey = 'update  scantable set 대표_속성=(SELECT  GROUP_CONCAT(IFNULL(대표_결합키,""),ifnull(CONCAT (",", 대표_결합키),"") SEPARATOR "," ) FROM statistic_attribute, category_attribute) where 테이블_명='+tableName;
        conn.query([sqlForProperty,sqlForKey], function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
        return ;
    });
}

module.exports = scan_table;
