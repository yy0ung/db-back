const fs = require('fs');
const express = require('express');
const app = express();
//const path = require('path');
//const qs = require('querystring');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const server = app.listen(3000, ()=>{console.log('start server');});

//connect db
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const maria = require('mysql');
const { workerData } = require('worker_threads');

const conn = maria.createConnection({
  host: conf.host,
  port: conf.port,
  user: conf.user,
  password:conf.password,
  database:conf.database
});

conn.connect();

function create_category(tablename){
  var sql = "create table if not exists category_attribute(속성명 VARCHAR(255), 데이터_타입 TEXT, NULL_레코드_수 int, NULL_레코드_비율 real, 상이_수치_값 int, 최대_값 int, 최소_값 int, 0_레코드_수 int, 0_레코드_비율 int, 대표_속성 TEXT, 결합키_후보 TEXT, 대표_결합키 VARCHAR(255));";
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
      conn.query("UPDATE category_attribute SET 0_레코드_수 = (SELECT COUNT(*) FROM "+tablename+" WHERE "+row[i].속성명+"=0) WHERE 속성명='"+row[i].속성명+"'");
      conn.query("UPDATE category_attribute SET 0_레코드_비율 = 0_레코드_수/(SELECT COUNT(*) FROM "+tablename+") WHERE 속성명='"+row[i].속성명+"'");
    }
  });
  return ;
}

function create_statistic(tablename){
  var sql = "create table if not exists statistic_attribute(속성명 VARCHAR(255), 데이터_타입 TEXT, NULL_레코드_수 int, NULL_레코드_비율 real, 상이_범주_값 int, 특수문자_포함_레코드_수 int, 특수문자_포함_레코드_비율 real, 대표_속성 TEXT, 결합키_후보 TEXT, 대표_결합키 VARCHAR(255));";
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  var sql = "insert into statistic_attribute(속성명, 데이터_타입) select column_name, data_type from INFORMATION_SCHEMA.COLUMNS where table_name='"+tablename+"' and data_type='text'";
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  
  conn.query("select 속성명 from statistic_attribute", async function(err, row, fields){
    for (var att of row){
      conn.query("UPDATE statistic_attribute SET NULL_레코드_수 = (SELECT COUNT(*) FROM "+tablename+" WHERE "+att.속성명+" IS NULL) WHERE 속성명='"+att.속성명+"'");
      conn.query("UPDATE statistic_attribute SET NULL_레코드_비율 = NULL_레코드_수/(SELECT COUNT(*) FROM "+tablename+") WHERE 속성명='"+att.속성명+"'");
      conn.query("UPDATE statistic_attribute SET 상이_범주_값 = (SELECT COUNT(DISTINCT "+att.속성명+") FROM "+tablename+") WHERE 속성명='"+att.속성명+"'");
    }
  });
  return ;
}

create_category('1_fitness_measurement');
create_statistic('1_fitness_measurement');

app.get('/api/table',(req,res) => {
  conn.query(
    "SELECT table_name 테이블명 FROM information_schema.tables WHERE table_schema= 'dbproject'",
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});