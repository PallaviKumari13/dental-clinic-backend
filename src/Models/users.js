const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const user = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    PhoneNo:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true   
    },
    hash_password:{
        type:String,
        required:true
    }
})

 user.virtual("password").set(function(password){
this.hash_password = bcrypt.hashSync(password,10)

})
 
user.method = {
    authenticate : function(password){
       return bcrypt.compareSync(password,this.hash_password)   
    }
}



module.exports = mongoose.model("Users",user)








// {
//     "name": "Park",
//     "phoneNumber":9470796926,
//     "email":"Shikharaj506@gmail.com"
//     "password":"ghgfhgfhg"
// }