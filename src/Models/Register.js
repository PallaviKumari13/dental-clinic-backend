const  mongoose = require("mongoose")

const register = new mongoose.Schema(
    {
        email: {
     type: String,
        required:true,
    },
    password: {type: String,
        required:true},
    },
   
            );
            
            module.exports=mongoose.model("registers",register)