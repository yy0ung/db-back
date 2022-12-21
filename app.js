const express = require('express');
const fs = require('fs')
const app = express();
const path = require('path')
const qs = require('querystring')
const multer = require('multer')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

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
var dblogin = require('./dblogin.js')
app.post('/db/connect', (req, res)=>{
  dblogin.create(req,res,dbInfo)  
})

//csv 파일이 올라갈 폴더 만들기
try{ fs.readdirSync('asset') }
catch(e){ console.log('not exist directory')
          fs.mkdirSync('asset')}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done)=>{
      done(null, 'asset/')
    },
    filename: (req,file,done)=>{
      const ext = path.extname(file.originalname)
      done(null, path.basename(file.originalname, ext))
    }
  })
})

//schema
app.post('/schema', (req,res)=>{
  const {sqlSchema} = req.body
  for(let i in sqlSchema){
    conn.query(sqlSchema[i], (err,row)=>{
      console.log("스키마")
    })
  }
  
})

//upload csv
var upload_csv = require('./upload_csv.js')
app.post('/fileupload', upload.single('file'), (req,res,next)=>{
  upload_csv.create(req,res)
})

//csv_done_table 만들기 (속성스캔 전 테이블)
var csv_done_table = require('./csv_done_table')
app.post('/post/csvdonetable', (req,res)=>{
  const {fileName} = req.body
  csv_done_table.create(req,res,fileName)
})

//csv_done_table 불러오기 (모듈화 x)
app.get('/get/csvdonetable', (req,res)=>{
  var sql = 'SELECT * FROM csv_done_table'
    conn.query(sql ,(err,row,fields)=>{
      res.send(row)
  })
})

//속성 스캔 완료한 테이블 스캔여부 bool 업데이트
app.put('/put/scanbool', (req,res)=>{
  const {table} = req.body
  const sql = 'UPDATE csv_done_table set 스캔여부=true where 테이블_명="'+table+'"'
  conn.query(sql, (err,row,fields)=>{
    res.send(true)
  })
})

// 사용자가 추가한 속성 att dic 에 추가
var attr_dic = require('./add_attr_dic.js')
app.post('/post/attr/dic', (req, res)=>{
  attr_dic.create(req,res)
})

// 사용자가 추가한 키 key dic 에 추가
var key_dic = require('./add_key_dic.js')
app.post('/post/key/dic', (req, res)=>{
  key_dic.create(req,res)
})

// scan table에 대표속성 업데이트
var update_attr = require('./update_attr.js')
app.put('/put/attr', (req, res)=>{
  update_attr.create(req,res)
})


// scan table에 표준결합키 업데이트
var update_key = require('./update_key.js')
app.put('/put/key', (req, res)=>{
  update_key.create(req,res)
})

//대표속성 사전 값 불러오기 (모듈화 x)
app.get('/attr/dic', (req, res)=>{
    var sql = 'SELECT * FROM attr_dic'
    conn.query(sql ,(err,row,fields)=>{
      res.send(row)
  })
  });


//표준결합키 사전 값 불러오기 (모듈화 x)
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

//scan_done_table 만들기 (속성편집 완료 테이블)
var scan_done_table = require('./scan_done_table')
app.post('/post/scandonetable', (req,res)=>{
  const {fileName} = req.body
  console.log(fileName)
  scan_done_table.create(req, res, fileName)
})

//scan_done_table 불러오기 (모듈화 x)
app.get('/get/scandonetable', (req,res)=>{
  var sql = 'SELECT * FROM scan_done_table'
    conn.query(sql ,(err,row,fields)=>{
      res.send(row)
  })
})

// 속성편집
// 데이터타입 편집
var edit_type = require('./edit_type')
app.put('/edit/type', (req, res)=>{
  edit_type.create(req,res)
})

// 속성 삭제
var delete_attr = require('./delete_attr.js')
app.delete('/delete/attr', (req,res)=>{
  delete_attr.create(req,res)
})

//스캔 완성본
var scan_table = require('./scan_table.js')
app.post('/scan/scantable', (req,res)=>{
  scan_table.create(req,res)
})

//category table 불러오기 (모듈화 x)
app.get('/api/categorytable/:table',(req,res) => {
  const {table} = req.params
  conn.query(
    "SELECT * FROM "+table+"_category_attribute",
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

//statistic table 불러오기 (모듈화 x)
app.get('/api/statistictable/:table',(req,res) => {
  const {table} = req.params
  conn.query(
    "SELECT * FROM "+table+"_statistic_attribute",
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

//search
var search = require('./search.js')
app.post('/search', (req,res)=>{
  const {tablename, key, att, attName} = req.body
  search.create(req, res, tablename, key, att, attName)
})

//single join
var single_join = require('./single_join.js')
app.post('/post/singlejoin', (req,res)=>{
  const {table1, table2, att1, att2} = req.body
  console.log(table1, table2, att1, att2)
  single_join.create(req, res, table1, table2, att1, att2)
})

//multi join
var multi_join = require('./multi_join.js')
app.post('/post/multijoin', (req,res)=>{
  const {table1, table2, att1, att2} = req.body
  console.log(table1, table2, att1, att2)
  multi_join.create(req, res, table1, table2, att1, att2)
})


//table a+b 단순 결합 테이블 보여주기
app.get('/get/singlejoin/:table1/:table2', (req,res)=>{
  const {table1, table2} = req.params
  const sql = "SELECT * FROM single_"+table1+"_"+table2;
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
      console.log("done")
    }
  )
})

app.get('/get/multijoin', (req,res)=>{
  const sql = "SELECT * FROM multi_join_result";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
      console.log("done")
    }
  )
})

//single join result table 올리기
var single_join_result = require('./single_join_result.js')
app.post('/post/singleresult', (req,res)=>{
  const {table1, table2, key} = req.body
  single_join_result.create(table1, table2, key)  
  console.log("결과 테이블 완료")
})

//single join result table 불러오기
app.get('/get/singleresult', (req,res)=>{
  const sql = "SELECT * FROM single_join_result";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
      console.log("테이블 읽어오기")
    }
  )
})

//multi join result table 올리기
var multi_join_result = require('./multi_join_result.js')
app.post('/post/multiresult', (req,res)=>{
  const {table1, table2, key} = req.body
  multi_join_result.create(table1, table2, key)  
  console.log("결과 테이블 완료")
})

//multi join result table 불러오기
app.get('/get/multiresult', (req,res)=>{
  const sql = "SELECT * FROM multi_join_result";
  conn.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
      console.log("테이블 읽어오기")
    }
  )
})

//key attr 찾아오기
var key_att = require('./key_att.js')
app.post('/get/attrkey', (req,res)=>{
  const {tablename, key} = req.body
  key_att.create(req,res,tablename,key)
})

//down csv
var make_csv = require('./make_csv.js')

app.get('/download/:csv', (req,res)=>{
  const {csv} = req.params
  make_csv.get(req,res,csv)
})

/*
반영 예정
app.get('/download/csv', (req,res)=>{   /// html에서 <a href="/downlaod/csv></a>로 하면 되는 것 같습니다
  make_csv.get("1_fitness_measurement")
  var filepath =C:\Users\oinbo\Desktop\디비 파일 다운로드\"  // filepath는 csv파일 local에 저장된 위치 ex)C:/result/
  var savedfilename ="1_fitness_measurement.csv"; //  name은 csv파일 이름  ex) abcd.csv
  res.download(filepath+savedfilename);
})
*/

