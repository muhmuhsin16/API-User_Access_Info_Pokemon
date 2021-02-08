const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
 
// parse application/json
app.use(bodyParser.json());
 
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'info_pokemon'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 
//show all users
app.get('/api/users',(req, res) => {
  let sql = "SELECT * FROM users";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

 
//add new user
app.post('/api/users',(req, res) => {
    let data = {name: req.body.name, register_time: new Date()};
    let sql = "INSERT INTO users SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});
