const express = require('express')
const app = express()

app.get('/', function(req, res) {
  res.send('Hellow World')
})

app.get('/user/:name', function(req, res) {
  const { name } = req.params
  
  if(name == "dog"){
    res.send("멍멍")
  }else if(name == "cat"){
    res.send("야옹")
  }else if(name == "pig"){
    res.send("꿀꿀")
  }else{
    res.send("알 수 없음")
  }

})

app.get('/cat', function(req, res) {
  res.send('고양이')
})

app.listen(3000)