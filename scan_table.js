var con = require('./connect');
var scan_table = {};

async function create_statistic(tablename){
  con.getConnection((err,conn)=>{
    var params = tablename.toString()+"_statistic_attribute"
    var sql = "create table if not exists "+params+"(속성명 VARCHAR(255), 데이터_타입 TEXT, NULL_레코드_수 int, NULL_레코드_비율 real, 상이_수치_값 int, 최대_값 int, 최소_값 int, 영_레코드_수 int, 영_레코드_비율 int, 대표_속성 TEXT, 결합키_후보 TEXT, 대표_결합키 VARCHAR(255));";
    conn.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
    var sql = "insert into "+params+"(속성명, 데이터_타입) select column_name, data_type from INFORMATION_SCHEMA.COLUMNS where table_name='"+tablename+"' and data_type='int'";
    conn.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
    // var sql = "insert into "+params+"(결합키_후보) VALUES (0)";
    //     conn.query(sql, function (err, result) {
    //       if (err) throw err;
    //       console.log("결합키_후보 inserted");
    // });
    conn.query("select 속성명 from "+params, function(err, row, fields){
      for(var i=0; i<row.length;i++){
        conn.query("UPDATE "+params+" SET NULL_레코드_수 = (SELECT COUNT(*) FROM "+tablename+" WHERE "+row[i].속성명+" IS NULL) WHERE 속성명='"+row[i].속성명+"'");
        conn.query("UPDATE "+params+" SET NULL_레코드_비율 = NULL_레코드_수/(SELECT COUNT(*) FROM "+tablename+") WHERE 속성명='"+row[i].속성명+"'");
        conn.query("UPDATE "+params+" SET 상이_수치_값 = (SELECT COUNT(DISTINCT "+row[i].속성명+") FROM "+tablename+") WHERE 속성명='"+row[i].속성명+"'");
        conn.query("UPDATE "+params+" SET 최대_값 = (SELECT MAX("+row[i].속성명+") FROM "+tablename+") WHERE 속성명='"+row[i].속성명+"'");
        conn.query("UPDATE "+params+" SET 최소_값 = (SELECT MIN("+row[i].속성명+") FROM "+tablename+") WHERE 속성명='"+row[i].속성명+"'");
        conn.query("UPDATE "+params+" SET 영_레코드_수 = (SELECT COUNT(*) FROM "+tablename+" WHERE "+row[i].속성명+"=0) WHERE 속성명='"+row[i].속성명+"'");
        conn.query("UPDATE "+params+" SET 영_레코드_비율 = 영_레코드_수/(SELECT COUNT(*) FROM "+tablename+") WHERE 속성명='"+row[i].속성명+"'");
        conn.query("UPDATE "+params+" SET 결합키_후보 = '"+"1"+"' WHERE (속성명='"+row[i].속성명+"') AND (상이_수치_값    + NULL_레코드_수) >= (SELECT COUNT(*) FROM "+tablename+")*9/10");
      }
    });
    return ;
  })
}

async function create_category(tablename){
  con.getConnection((err,conn)=>{
    var params = tablename.toString()+"_category_attribute"
    var sql = "create table if not exists "+params+"(속성명 VARCHAR(255), 데이터_타입 TEXT, NULL_레코드_수 int, NULL_레코드_비율 real, 상이_범주_값 int, 특수문자_포함_레코드_수 int, 특수문자_포함_레코드_비율 real, 대표_속성 TEXT, 결합키_후보 TEXT, 대표_결합키 VARCHAR(255));";
    conn.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
    var sql = "insert into "+params+"(속성명, 데이터_타입) select column_name, data_type from INFORMATION_SCHEMA.COLUMNS where table_name='"+tablename+"' and data_type='text'";
    conn.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  
    conn.query("select 속성명 from "+params, async function(err, row, fields){
      for (var att of row){
        conn.query("UPDATE "+params+" SET NULL_레코드_수 = (SELECT COUNT(*) FROM "+tablename+" WHERE "+att.속성명+" IS NULL) WHERE 속성명='"+att.속성명+"'");
        conn.query("UPDATE "+params+" SET NULL_레코드_비율 = NULL_레코드_수/(SELECT COUNT(*) FROM "+tablename+") WHERE 속성명='"+att.속성명+"'");
        conn.query("UPDATE "+params+" SET 상이_범주_값 = (SELECT COUNT(DISTINCT "+att.속성명+") FROM "+tablename+") WHERE 속성명='"+att.속성명+"'");
        conn.query("UPDATE "+params+" SET 특수문자_포함_레코드_수=(select COUNT(*) FROM "+tablename+" WHERE "+att.속성명+" not REGEXP '^[0-9a-zA-Z가-힣]+$') WHERE 속성명='"+att.속성명+"'");
        conn.query("UPDATE "+params+" SET 특수문자_포함_레코드_비율=(select 특수문자_포함_레코드_수 from "+params+" where 속성명='"+att.속성명+"')/(SELECT COUNT(*) FROM "+tablename+") WHERE 속성명='"+att.속성명+"'");  
        conn.query("UPDATE "+params+" SET 결합키_후보 = '"+"1"+"' WHERE (속성명='"+att.속성명+"') AND (상이_범주_값 + NULL_레코드_수) >= (SELECT COUNT(*) FROM "+tablename+")*9/10");
      }
    });
    return ;
  })
}

scan_table.create = async (req,res)=>{
  con.getConnection(async (err,conn)=>{
    const {table} = req.body
    await create_category(table);
    await create_statistic(table);
    res.send(true)
  })
}

module.exports = scan_table
