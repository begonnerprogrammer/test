const express = require("express");
const app = express();
const port = 4000 || process.env.PORT;
const Collection = require("./src/schema/schema");
const cors=require("cors")
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const nodemailer=require("nodemailer");
const cookieParser = require("cookie-parser");
const { useState } = require("react");
const router=require("./src/router/route")
const PostModel =require("./src/schema/postmodel")
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:["https://deploy-mern-1whq.vercel.app"],
    methods:["POST","GET","CREATE","DELETE"],
    credentials:true
}))

//To use images from public folder
app.use(express.static('Public'))
require("./src/db/conn");
app.use(router)









app.listen(port, () => {
    console.log(`server is on the port ${port}`)
})



// app.post('/forgot',(req,res)=>{
// const {email}=req.body;
// Collection.findOne({email:email})
// .then((user)=>{
//     if(!user){
//       return  res.json("nouser")
//     }



//     //sending token to user
//     const token=jwt.sign({id:user._id},"jwt-swcret-ket",{expiresIn:"1d"});
//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: 'nn000@gmail.com',
//           pass: 'nnnnn'
//         }
//       });
      
//       var mailOptions = {
//         from: 'ut027908@gmail.com',
//         to: 'ut027908@gmail.com',
//         subject: 'reset password',
//         text:`http://localhost:3000/forgot/${user._id}/${token}`
//       };
      
//       transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//           console.log(error);
//         } else {
//          res.json("success")
//         }
//       });







// })
// .catch(err=>console.log(err))
// })