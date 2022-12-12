const express = require('express');
const fs = require('fs')
const app = express();
const path = require('path')
const qs = require('querystring')
const multer = require('multer')
const bodyParser = require('body-parser')

const server = app.listen(3000, ()=>{
  console.log('start server');
});

// var filePath = path.join(__dirname, "sample.csv")
// const csv = fs.readFileSync(filePath, {encoding : "utf-8"})
// const rows = csv.split("\r\n")
// console.log(rows)


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

//csv upload 파트 완성
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
app.post('/fileupload', upload.single('file'), (req,res,next)=>{
  const fileName = './asset/'+req.file.filename
  var sql = "LOAD DATA LOCAL INFILE ? INTO TABLE "+req.file.filename+" FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS"
  
  var params = [fileName]
  conn.query(sql, params, (err,row,fields)=>{
    if(err){
      //throw err
      return res.send(err)
    }else{
      console.log("success")
      return res.send("성공")
    }
  })
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

//검색어 + 검색 버튼 눌렀을 때
//스캔이 끝난 테이블을 저장한 테이블에 접근해서 검색해야할 테이블을 받아옴.
app.get('/scan/done', (req, res)=>{
  //해당 테이블 읽어오기
  var sql = 'SELECT * FROM scan_done'
    conn.query(sql ,(err,row,fields)=>{
      res.send(row)
    })
})

//검색어에 해당하는 테이블을 찾아서 프론트에 send해줌
app.post('/search/table', (req, res)=>{
  const {keyword} = req.body
  console.log(keyword)
  // (테이블명 무시하고 봐주세요!) 검색어 = keyword / 속성명에 검색어가 포함된 테이블을 불러와라는 명령.
  var sql = "select * from attr_scan where attr_name like'%"+keyword+"%'"
  
    conn.query(sql, (err,row,fields)=>{
      //프론트에 보내줌
      res.send(row)
    })
})

