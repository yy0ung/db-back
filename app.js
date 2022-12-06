const express = require('express');
const fs = require('fs')
const app = express();
const path = require('path')
const qs = require('querystring')
const bodyParser = require('body-parser')
const server = app.listen(3000, ()=>{
  console.log('start server');
});


//connect db
const maria = require('mysql');
const dbInfo = JSON.parse(fs.readFileSync('./db.json'));
const conn = maria.createConnection({
  host: dbInfo.host,
  port: dbInfo.port,
  user: dbInfo.user,
  password: dbInfo.password,
  database: dbInfo.database
});

conn.connect();
app.use(bodyParser.json())


//db connect 
app.post('/db/connect', (req, res)=>{
  const {host, port, db, user, pw} = req.body
  console.log(dbInfo.database)
  
  if(dbInfo.host===host && dbInfo.port.toString()===port && dbInfo.database===db&& dbInfo.user===user && dbInfo.password===pw){
        res.send(true)
      }else{
        res.send(false)
      }
})


// 사용자가 추가한 속성 att dic 에 추가
app.post('/post/attr/dic', (req, res)=>{
  const {id, attr} = req.body
  var sql = 'INSERT INTO attr_dic(id,attr) VALUES(?,?)';
  var params = [id, attr]
  conn.query(sql, params, (err, rows, fields)=>{
    if(err){
      res.send(err)
      console.log(err)
    }else{
      res.send(rows)
      console.log("success")
    }
  })
})

// 사용자가 추가한 키 key dic 에 추가
app.post('/post/key/dic', (req, res)=>{
  const {id, key} = req.body
  console.log("444444", id, key)
  var sql = 'INSERT INTO key_dic(id, key_attr) VALUES(?,?)';
  var params = [id, key]
  conn.query(sql, params, (err, rows, fields)=>{
    if(err){
      res.send(err)
      console.log(err)
    }else{
      res.send(rows)
      console.log("success")
    }
  })
})

// scan table에 대표속성 업데이트
app.put('/put/attr', (req, res)=>{
  const {attr, name} = req.body
  console.log(attr, name)
  var sql = 'UPDATE attr_scan SET head_attr=(?) where attr_name=(?)';
  var params = [attr, name]
  conn.query(sql, params, (err, rows, fields)=>{
    if(err){
      res.send(err)
      console.log(err)
    }else{
      res.send(rows)
      console.log("success")
    }
  })
})


// scan table에 표준결합키 업데이트
app.put('/put/key', (req, res)=>{
  const {key, name} = req.body
  var sql = 'UPDATE attr_scan SET head_key=(?) where attr_name=(?)';
  var params = [key, name]
  conn.query(sql, params, (err, rows, fields)=>{
    if(err){
      res.send(err)
      console.log(err)
    }else{
      res.send(rows)
      console.log("success")
    }
  })
})

//대표속성 사전 값 불러오기
app.get('/attr/dic', (req, res)=>{
    var sql = 'SELECT * FROM attr_dic'
    conn.query(sql ,(err,row,fields)=>{
      res.send(row)
    })
  });


//표준결합키 사전 값 불러오기
app.get('/key/dic', (req, res)=>{
  var sql = 'SELECT * FROM key_dic'
  conn.query(sql ,(err,row,fields)=>{
    res.send(row)
  })
});

//scan table 값 불러오기
app.get('/scan', (req, res)=>{
  var sql = 'SELECT * FROM attr_scan'
  
  conn.query(sql ,(err,row,fields)=>{
    res.send(row)
  })
});

// 속성편집
// 데이터타입 편집
app.put('/edit/type', (req, res)=>{
  const {type, name} = req.body
  var sql = 'UPDATE attr_scan SET attr_type=(?) where attr_name=(?)';
  var params = [type, name]
  conn.query(sql, params, (err, rows, fields)=>{
    if(err){
      res.send(err)
      console.log(err)
    }else{
      res.send(rows)
      console.log("success")
    }
  })
})

// 속성 삭제
app.delete('/delete/attr', (req,res)=>{
  var sql = 'DELETE FROM attr_scan where attr_name=(?)'
  var params = req.body.name
  conn.query(sql, params, (err, rows, fields)=>{
    if(err){
      res.send(err)
      console.log(err)
    }else{
      res.send(rows)
      console.log("success")
    }
  })
})

