const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const server = app.listen(3000, ()=>{console.log('start server');});

//connect db
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

var category = require('./category');
category.create('1_fitness_measurement');
var statistic = require('./statistic');
statistic.create('1_fitness_measurement');

app.get('/api/table',(req,res) => {
  conn.query(
    "SELECT table_name 테이블명 FROM information_schema.tables WHERE table_schema= 'dbproject'",
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});