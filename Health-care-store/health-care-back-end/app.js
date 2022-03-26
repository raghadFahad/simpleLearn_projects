const express = require('express');
var indexRouter = require('./routes/index');
var cors = require('cors');
const app = express();
app.use(cors())
app.use(express.json());
app.use('/', indexRouter);
app.listen(3000, () => {
    console.log('listening on port 3000');
})
// 
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "123456",
//     database: "healthCare"
//   });
  
//   con.connect(err=>{
//       if(err){console.log(err)}
//       else{console.log("DB connected")}
//   })
  
  
//   app.get('/user',(err,res)=>{
//     let qr = "select * from users";
//     con.query(qr, (err,qrsult)=>{
//         if(err){console.log(err)}
//         if(qrsult.length>0){
//             res.send({
//                 message:"found",
//                 data:qrsult
//             })
//         }
//         else{
//             res.send({
//                 message:"not found"
//             })
//         }
//     })
  
//   })