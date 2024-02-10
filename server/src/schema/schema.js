const mongoose=require("mongoose");
const validator=require("validator")
const Schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        // validate(value){
        //     if(validator.isEmail(value)){
        //         throw new Error ("Emial is inValid")
        //     }
        // }
  
    },
    password:{  
    type:String,
    required:true,
    unique:true,
    }
})


const Collection=new mongoose.model("Collection",Schema);
module.exports=Collection;