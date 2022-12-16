var con = require('./connect');
var category = {};

category.create = function (tablename){
    con.getConnection(function(err,conn){
        var sql = "create table if not exists category_attribute(속성명 VARCHAR(255), 데이터_타입 TEXT, NULL_레코드_수 int, NULL_레코드_비율 real, 상이_수치_값 int, 최대_값 int, 최소_값 int, 영_레코드_수 int, 영_레코드_비율 int, 대표_속성 TEXT, 결합키_후보 TEXT, 대표_결합키 VARCHAR(255));";
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
        var sql = "insert into category_attribute(속성명, 데이터_타입) select column_name, data_type from INFORMATION_SCHEMA.COLUMNS where table_name='"+tablename+"' and data_type='int'";
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
        conn.query("select 속성명 from category_attribute", function(err, row, fields){
            for(var i=0; i<row.length;i++){
                conn.query("UPDATE category_attribute SET NULL_레코드_수 = (SELECT COUNT(*) FROM "+tablename+" WHERE "+row[i].속성명+" IS NULL) WHERE 속성명='"+row[i].속성명+"'");
                conn.query("UPDATE category_attribute SET NULL_레코드_비율 = NULL_레코드_수/(SELECT COUNT(*) FROM "+tablename+") WHERE 속성명='"+row[i].속성명+"'");
                conn.query("UPDATE category_attribute SET 상이_수치_값 = (SELECT COUNT(DISTINCT "+row[i].속성명+") FROM "+tablename+") WHERE 속성명='"+row[i].속성명+"'");
                conn.query("UPDATE category_attribute SET 최대_값 = (SELECT MAX("+row[i].속성명+") FROM "+tablename+") WHERE 속성명='"+row[i].속성명+"'");
                conn.query("UPDATE category_attribute SET 최소_값 = (SELECT MIN("+row[i].속성명+") FROM "+tablename+") WHERE 속성명='"+row[i].속성명+"'");
                conn.query("UPDATE category_attribute SET 영_레코드_수 = (SELECT COUNT(*) FROM "+tablename+" WHERE "+row[i].속성명+"=0) WHERE 속성명='"+row[i].속성명+"'");
                conn.query("UPDATE category_attribute SET 영_레코드_비율 = 0_레코드_수/(SELECT COUNT(*) FROM "+tablename+") WHERE 속성명='"+row[i].속성명+"'");
            }
        });
        return ;
    });
}

module.exports = category;