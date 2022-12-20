const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const server = app.listen(3000, ()=>{console.log('start server');});

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const maria = require('mysql');

const conn = maria.createConnection({
  host: conf.host,
  port: conf.port,
  user: conf.user,
  password:conf.password,
  database:conf.database
});
conn.connect();

var select_table = require('./select_table');
select_table.create();

var statistic = require('./statistic');
statistic.create('1_fitness_measurement');

var category = require('./category');
category.create('1_fitness_measurement');

var scan_table = require('./scan_table');
scan_table.create('1_fitness_measurement');

var search = require('./search');

var single_join = require('./single_join_result');
single_join.create('1_fitness_measurement','2_physical_instructor_practice_info');
var multi_join = require('./multi_join_result');
multi_join.create('1_fitness_measurement','2_physical_instructor_practice_info');

var key_att = require('./key_att');
key_att.create('scan_table');

//선택 가능한 테이블 목록
//대표속성은 하나만 입력되어 있을 경우 검색 가능
app.get('/api/search',(req,res) => {
  //search.create에 순서대로 테이블명,표준결합키,대표속성,속성명 을 인자로 받고 해당하는 레코드(scantable의)를 반환. 여기서 레코드는 선택 가능한 테이블 목록의 레코드를 의미
  conn.query(search.create('2_physical_instructor_practice_info',0,0,'TEL_NO'), function (err, result) {
    if (err) throw err;
    res.send(result);
  });
})

//현재 등록된 테이블들 전부 표시
app.get('/api/table',(req,res) => {
  conn.query(
    "SELECT * FROM selecttable",
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

//1_fitness_measurement의 수치 속성 목록
app.get('/api/table/1_fitness_measurement/statistic',(req,res) => {
  conn.query(
    "SELECT * FROM statistic_attribute",
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

//범주 속성 목록
app.get('/api/table/1_fitness_measurement/category',(req,res) => {
  conn.query(
    "SELECT * FROM category_attribute",
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

/*
app.get('/api/single',(req,res)=>{

});
*/