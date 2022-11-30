const express = require('express');
const app = express();
const path = require('path')
const qs = require('querystring')
const bodyParser = require('body-parser')
const server = app.listen(3000, ()=>{
  console.log('start server');
});


//connect db
const maria = require('mysql');
const conn = maria.createConnection({
  host:'127.0.0.1',
  port:3307,
  user:'root',
  password:'910226',
  database:'test_db'
});

conn.connect();
app.use(bodyParser.json())


//id에 AUTHOR 넣으면 모든 row 가져올 수 있음
// app.get('/:id', (req, res)=>{
//   const values = req.params.id.toString()
//   var sql = 'SELECT * FROM '+values
  
//   conn.query(sql ,(err,row,fields)=>{
//     res.send(row)
//     //res.send(fields);
//   })
// });



//AUTHOR 테이블에 info row 추가
// const info ={
//   "id" : 11,
//   "name" : "db",
//   "profile" : "tester"
// }
// var sql = 'INSERT INTO AUTHOR(id,name,profile) VALUES(?,?,?)';
// var params = [info["id"], info["name"], info["profile"]]
// conn.query(sql, params, (err, rows, fields)=>{
//   if(err){
//     console.log(err)
//   }else{
//     console.log(rows)
//   }
// })

// body 받아서 db에 추가
// app.post('/post', (req, res)=>{
//   console.log("통신")
//   console.log(req.body)
  
//   const {id, name, profile} = req.body
    
//   var sql = 'INSERT INTO AUTHOR(id,name,profile) VALUES(?,?,?)';
//   var params = [id, name, profile]
//   conn.query(sql, params, (err, rows, fields)=>{
//     if(err){
//       res.send(err)
//     }else{
//       res.send(rows)
//       console.log("success")
//     }
//   })
// })


// 대표속성 업데이트
app.post('/post/attr', (req, res)=>{
  const {attr} = req.body
  console.log(attr)
  var sql = 'UPDATE attr_scan SET head_attr="'+attr+'" where attr_name="나이"';
  var params = attr
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

// 사용자 추가 대표속성 업데이트
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

// 표준결합키 업데이트
app.post('/post/key', (req, res)=>{
  const {key} = req.body
  var sql = 'UPDATE attr_scan SET head_key="'+key+'" where attr_name="나이"';
  var params = key
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
    // const values = req.params.id.toString()
    var sql = 'SELECT * FROM attr_dic'
    
    conn.query(sql ,(err,row,fields)=>{
      res.send(row)
      //res.send(fields);
    })
  });

//표준결합키 사전 값 불러오기
app.get('/key/dic', (req, res)=>{
  // const values = req.params.id.toString()
  var sql = 'SELECT * FROM key_dic'
  
  conn.query(sql ,(err,row,fields)=>{
    res.send(row)
    //res.send(fields);
  })
});

//스캔 값 불러오기
app.get('/scan', (req, res)=>{
  // const values = req.params.id.toString()
  var sql = 'SELECT * FROM attr_scan'
  
  conn.query(sql ,(err,row,fields)=>{
    res.send(row)
    //res.send(fields);
  })
});