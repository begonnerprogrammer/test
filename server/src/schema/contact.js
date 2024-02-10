const mongoose=require("mongoose");
const Schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    subject:{  
    type:String,
    required:true,
    }
    ,
    massage:{
        type:String,
        required:true,
    }
})


const Contact=new mongoose.model("Contact",Schema);
module.exports=Contact;