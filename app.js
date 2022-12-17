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
// console.log("SELECT") ///////////////////////////////////asdfasdf
var select_table = require('./select_table');
select_table.create();

//var category = require('./category');
// console.log("figure") ///////////////////////////////////asdfasdf
var category = require('./figure');
category.create('1_fitness_measurement');

// var statistic = require('./statistic');
// console.log("category") ///////////////////////////////////asdfasdf
var statistic = require('./category');
statistic.create('1_fitness_measurement');

app.get('/api/table',(req,res) => {
  conn.query(
    "SELECT * FROM selecttable",
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/table/1_fitnescas_measurement/tegory',(req,res) => {
  conn.query(
    "SELECT * FROM category_attribute",
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.get('/api/table/1_fitness_measurement/statistic',(req,res) => {
  conn.query(
    "SELECT * FROM statistic_attribute",
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});