var express = require('express');
var router = express.Router();
var md5 = require('md5');
var jwt = require('jsonwebtoken');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "healthCare"
});

// con.connect(err=>{
//     if(err){console.log(err)}
//     else{console.log("DB connected")}
// })


router.post('/profile', async function (req, res, next) {
  try {
    let email = req.body; 
   
    let userEmail = email[0]['email'];
   
    const sql = `SELECT * FROM users WHERE email = '${userEmail}'`
    con.query(
      sql,
    function(err, result, fields){
      if(!result.length){
        res.send({ status: 0, data: err });
      }else{
        
        let token = jwt.sign({ data: result }, '39899300303')
        res.send({ status: 1, data: result, token: token });
      }
     
    })
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});

/* GET users listing. */
router.post('/register', async function (req, res, next) {
    try {
     
       let {email, password,name,phone } = req.body; 
     
      const hashed_password = md5(password.toString())
      const checkEmail = `Select email FROM users WHERE email = ?`;
      
      con.query(checkEmail, [email], (err, result, fields) => {
        if(!result.length){
          const sql = `insert into users(email,password,name,phone)
                     values('${email}','${hashed_password}','${name}','${phone}')`
          con.query(
            sql, 
          (err, result, fields) =>{
            if(err){
              res.send({ status: 0, data: err });
            }else{
              let token = jwt.sign({ data: result }, '39899300303')
              res.send({ status: 1, data: result, token : token });
            }
           
          })
        }else{
          res.send({ status: 2,data: err});
        }
      });
      
     
    } catch (error) {
      res.send({ status: 0, error: error });
    }
  });

/* Log in */
  router.post('/login', async function (req, res, next) {
    try {
      let { email, password } = req.body; 
     
      const hashed_password = md5(password.toString())
      const sql = `SELECT email,password FROM users WHERE email = '${email}' AND password = '${hashed_password}'`
      con.query(
        sql,
      function(err, result, fields){
        if(!result.length){
          res.send({ status: 0, data: err });
        }else{
          let token = jwt.sign({ data: result }, '39899300303')
          res.send({ status: 1, data: result, token: token });
        }
       
      })
    } catch (error) {
      res.send({ status: 0, error: error });
    }
  });

/* change password*/
/* GET users listing. */
router.post('/changePassword', async function (req, res, next) {
  try {
   
    let userinfo = req.body; 
    email = userinfo[0];
  
    const hashed_password = md5(userinfo[1]['oldPassword'].toString());
    const newHashed_password = md5(userinfo[1]['newPassword'].toString());

    const checkPassword = `Select * FROM users WHERE email = '${email}' and password = '${hashed_password}'`;
    
    con.query(checkPassword, (err, result, fields) => {
      if(result.length){
        const sql = `update users set password = '${newHashed_password}' where email = '${email}'`
        con.query(
          sql, 
        (err, result, fields) =>{
          if(err){
            res.send({ status: 0, data: err });
          }else{
            let token = jwt.sign({ data: result }, '39899300303')
            res.send({ status: 1, data: result, token : token });
          }
         
        })
      }else{
        res.send({ status: 2,data: err});
      }
    });
    
   
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});

router.post('/passwordRecovery', async function (req, res, next) {
  try {
   
    let {email,oldPassword,newPassword} = req.body; 

    const newHashed_password = md5(newPassword.toString());

    const checkPassword = `Select * FROM users WHERE email = '${email}'`;
    
    con.query(checkPassword, (err, result, fields) => {
      if(result.length){
        const sql = `update users set password = '${newHashed_password}' where email = '${email}'`
        con.query(
          sql, 
        (err, result, fields) =>{
          if(err){
            res.send({ status: 0, data: err });
          }else{
            let token = jwt.sign({ data: result }, '39899300303')
            res.send({ status: 1, data: result, token : token });
          }
         
        })
      }else{
        res.send({ status: 2,data: err});
      }
    });
    
   
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});
//contact us
router.post('/contactus', async function (req, res, next) {
  try {  
     let {name,email,text } = req.body; 
        const sql = `insert into contactus(name,email,text)
                   values('${name}','${email}','${text}')`
        con.query(
          sql, 
        (err, result, fields) =>{
          if(err){
            res.send({ status: 0, data: err });
          }else{
            let token = jwt.sign({ data: result }, '39899300303')
            res.send({ status: 1, data: result, token : token });
          }
         
        })
    
   
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});

//order
router.post('/order', async function (req, res, next) {
  try {  
     let userInfo = req.body; 
  

        const sql = `insert into orders(email,products,price)
                   values('${userInfo[0]['email']}','${userInfo[1]}','${userInfo[2]}')`
        con.query(
          sql, 
        (err, result, fields) =>{
          if(err){
            res.send({ status: 0, data: err });
          }else{
            let token = jwt.sign({ data: result }, '39899300303')
            res.send({ status: 1, data: result, token : token });
          }
         
        })
    
   
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});



//View  Procucts
router.get('/productsView', async function (req, res, next) {
  try {
   

    const sql = `Select * FROM products`;
    
    con.query(sql, (err, result, fields) => {
      if(result.length){
            res.send({ status: 1, data: result });
      }else{
        res.send({ status: 2,data: err});
      }
    });
    
   
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});
  module.exports = router;