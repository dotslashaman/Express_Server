const express = require('express')
const app = express()
const port = 3006

app.post('/ans1', (req, res) => {

    res.send("you hit server1");
})

app.post('/ans2', (req, res) => {
    res.send("you hit sever2");
    
})

app.post('/', (req, res) => {
    console.log(req.headers);
    res.send("test: you hit main server");
    res.send("test.");
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})