const express = require('express')
const app = express()

app.get('/', (req, res)=> res.send('HELLO WORLD!!'))

app.get('/page/:pageId', (req, res)=>{
  res.send(req.params)
})

app.listen(3000, ()=> console.log('start!'))

