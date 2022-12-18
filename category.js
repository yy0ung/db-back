var con = require('./connect');
var category = {};

category.create = function (tablename){
    con.getConnection(function(err,conn){
        var sql = "create table if not exists category_attribute(속성명 VARCHAR(255), 데이터_타입 TEXT, NULL_레코드_수 int, NULL_레코드_비율 real, 상이_범주_값 int, 특수문자_포함_레코드_수 int, 특수문자_포함_레코드_비율 real, 대표_속성 TEXT, 결합키_후보 TEXT, 대표_결합키 VARCHAR(255));";
        conn.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
        var sql = "insert into category_attribute(속성명, 데이터_타입) select column_name, data_type from INFORMATION_SCHEMA.COLUMNS where table_name='"+tablename+"' and data_type='text'";
        conn.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
        conn.query("select 속성명 from category_attribute", async function(err, row, fields){
          for (var att of row){
            conn.query("UPDATE category_attribute SET NULL_레코드_수 = (SELECT COUNT(*) FROM "+tablename+" WHERE "+att.속성명+" IS NULL) WHERE 속성명='"+att.속성명+"'");
            conn.query("UPDATE category_attribute SET NULL_레코드_비율 = NULL_레코드_수/(SELECT COUNT(*) FROM "+tablename+") WHERE 속성명='"+att.속성명+"'");
            conn.query("UPDATE category_attribute SET 상이_범주_값 = (SELECT COUNT(DISTINCT "+att.속성명+") FROM "+tablename+") WHERE 속성명='"+att.속성명+"'");
            //특수문자포함 SQL구문
            conn.query("UPDATE category_attribute SET 특수문자_포함_레코드_수 COUNT(*) FROM "+tablename+" WHERE "+att.속성명+" REGEXP '[`~!#$%^&*|\\\'\";:\/?\\-\\+\\[\\]\\{\\}\\(\\)_=<>,.]'");
            conn.query("UPDATE category_attribute SET 특수문자_포함_레코드_비율 특수문자_포함_레코드_수/(SELECT COUNT(*) FROM "+tablename+") WHERE 속성명='"+att.속성명+"'");
            //이지
            conn.query("UPDATE category_attribute SET 결합키_후보 = '"+att.속성명+"' WHERE (속성명='"+att.속성명+"') AND (상이_범주_값 + NULL_레코드_수) >= (SELECT COUNT(*) FROM "+tablename+")*9/10");
          }
        });
        return ;
    });
}

module.exports = category;