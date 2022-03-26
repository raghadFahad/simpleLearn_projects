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

/* Log in */
router.post('/login', async function (req, res, next) {
  try {
    let { email, password } = req.body; 
    console.log(email)
    console.log(password)
    const hashed_password = md5(password.toString())
    const sql = `SELECT email,password FROM admin WHERE email = '${email}' AND password = '${hashed_password}'`
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

router.post('/profile', async function (req, res, next) {
  try {
    let email = req.body; 
    let userEmail = email[0]['email']
    const sql = `SELECT * FROM admin WHERE email = '${userEmail}'`
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
    console.log(email);
    console.log(userinfo[1]['oldPassword']);
    console.log(userinfo[1]['newPassword'])
  
    const hashed_password = md5(userinfo[1]['oldPassword'].toString());
    const newHashed_password = md5(userinfo[1]['newPassword'].toString());

    const checkPassword = `Select * FROM admin WHERE email = '${email}' and password = '${hashed_password}'`;
    
    con.query(checkPassword, (err, result, fields) => {
      if(result.length){
        const sql = `update admin set password = '${newHashed_password}' where email = '${email}'`
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

    const checkPassword = `Select * FROM admin WHERE email = '${email}'`;
    
    con.query(checkPassword, (err, result, fields) => {
      if(result.length){
        const sql = `update admin set password = '${newHashed_password}' where email = '${email}'`
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
//view Contacte us
router.get('/contactusView', async function (req, res, next) {
  try {
   

    const sql = `Select * FROM contactus `;
    
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

//add products
router.post('/addProduct', async function (req, res, next) {
  try {
   
     let productInfo = req.body; 
    let product_n = productInfo[0];
    let product_q = productInfo[1];
    let product_t = productInfo[2];
    let product_p = productInfo[3];
    let product_i = productInfo[4];
    
    const sql = `insert into products(product_n,product_q,product_t,product_p,product_i)
                values('${product_n}','${product_q}','${product_t}','${product_p}','${product_i}')`
    con.query(
      sql, 
    (err, result, fields) =>{
      if(err){
        console.log(err);
        res.send({ status: 0, data: err });
      }else{
        let token = jwt.sign({ data: result }, '39899300303')
        res.send({ status: 1, data: result, token : token });
      }
      
    });
    
   
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
router.get('/orderView', async function (req, res, next) {
  try {
   

    const sql = `Select * FROM orders`;
    
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
//deleteProducts
router.post('/productsDelete', async function (req, res, next) {
  try {
   
    let product_n = req.body;
    const sql = `delete FROM products WHERE  product_n = '${product_n[0]}'`;
    con.query(sql, (err, result, fields) => {
      if(err){
        res.send({ status: 0, data: err });
      }else{
        let token = jwt.sign({ data: result }, '39899300303')
        res.send({ status: 1, data: result, token : token });
      }
    });
   
  }
   catch (error) {
    res.send({ status: 0, error: error });
  }
});


  module.exports = router;