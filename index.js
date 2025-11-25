const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

//const jwt = require("jsonwebtoken");
//const jwtPassword = "123456";
//const fs = require("fs");


/*const filepath = 'hello.txt';

fs.readFile(filepath,'utf-8',(err,data)=>{
    if(err){
        console.log("Error reading file.");
        return;
    }
    console.log(data+"\nHello");
})/*





/* const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.listen(3000);

app.use(bodyParser.json());

app.post('/apiTest',(req,res) => {
    console.log(req.body);
    res.status(401).send("Server Is Online"); 
})

app.get('/getReq2',(req,res) =>{
    res.status(201).send("Api Req - Get Server 1");
})

app.post('/postReq',(req,res) =>{
    console.log(req.body);
    res.status(202).send("Api Req - Post Server 1");
})

app.get('/getReq',(req,res) =>{
    console.log(req.body);
    res.status(200).send("Get request check");
})


let a = 10;
console.log(typeof a);

if (typeof a == 'number'){
    console.log("accepted");
}

const num = [1,2,3,4,5];
const copy = num.map(num => num*2);

console.log(copy);

(function(){
    console.log("hehehe");
})(); 






let noOfKidney = null;

app.get('/NumberOfKidneys',(req,res)=>{
    res.send("The number of kidney is :" + noOfKidney);
})

app.get('/addKidney',(req,res)=>{
    res.send("Added successfully");
    noOfKidney = noOfKidney + 1;
})

app.put('/reset',(req,res)=>{
    
    if(noOfKidney >=1){
    noOfKidney = 0;
    res.send("reset done");
    }else{
        res.send("Kidney already zero");
    }
})

*/

/*
input = [1,2,3,4,5];
const fun = (i) =>{
return i*2;
}
const ans = input.map((i) =>{
    return i*3;
});

console.log(ans);

//write a map function manually



const mdware = (req,res,next) => {
    let a = req.headers.name;
    if(a != "Aman"){
        res.status(400).json({
            msg : "User not found"
        });
    }else{
        next();
    }
}

const carchk = (req,res,next) => {
    let a = req.headers.car;
    if(a != "Range Rover"){
        res.status(400).json({
            msg : "Car not found"
        });
    }else{
        next();
    }
}

app.post('/',mdware,carchk,(req,res)=>{
    let name = req.headers.name;
    let car = req.headers.car;
    res.status(201).json({
        msg : "Welcome! Hello from server 1 " + name + "Your car is: "+ car
    })
})

app.listen(3001);
*/

let req = 0;
function countreq(req,res,next){
    req++;
    res.send(req);
    next();
}

app.get('/',(req,countreq,res) =>{
    const userName = req.headers.user;
    const password = req.headers.pass;
    const carId = req.query.carId;

    if(userName != 'TestUser' && password != 'pass'){
        res.status(400).json({"msg" : "Something is wrong with your creds"});

    }

    if(carId != 0){
        res.send("Wrong car ID");
    }

    res.send("Welcome : )");


});

app.get('/req',(req,res,countreq)=>{
    
});



app.get('/returnjson',(req,res) =>{
    res.json({
        "name" : "aman",
    })
});

function checkUserCreds(req,res,next){
    let name = req.query.name;
    let pass = req.headers.pass;

    if(name!= 'Aman' ||  pass != 'Pass'){
        res.status(501).send("Wrong creds");
    }else{
        next();
    }
}

app.post('/postJsonTest',checkUserCreds,(req,res) => {
    res.send("welcome : )");
});




const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function userExists(username, password) {
   for(let i = 0; i < ALL_USERS.length; i++){
    if(ALL_USERS[i].username == username && ALL_USERS[i].password == password){
        return true;
    }
   }
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, "shhhhh");
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    // return a list of users other than this username
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token provided",
    });
  }
});


app.get('/sum',(req,res) =>{
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    const sum = a+b;
    res.send(sum.toString());
});

app.get('/interest',(req,res) =>{
    const principal = parseInt(req.query.pricipal);
    const time = parseInt(req.query.time);
    const rate = parseInt(req.query.rate);
    const interest = (principal * rate * time)/100;
    const amount = interest + principal;

    res.send({
            "amount" : amount,
            "interest" : interest
    });
});

app.listen(3000);