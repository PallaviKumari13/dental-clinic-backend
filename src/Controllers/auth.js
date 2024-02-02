const users = require("../Models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = async (req,res,next) =>{
    const{ name, PhoneNo ,email,password } = req.body
    const hash_password = bcrypt.hashSync(password,10)
    const _user = new users(req.body)
    const eUser = await users.findOne({email})
    if(!eUser){
        _user.save().then(newuser => {
            req.subject= "User Registration"
            req.text= "You have successfully Signed up"
next()
          }).
          catch(error=>{
              return res.status(400).json({error,message:"Error Occurred"})
      
          })

    }else{
        return res.status(400).json({message:"Account already exists"})
    }
// to save
   
    console.log(req.body)
}

exports.login = async ( req,res)=>{
    const { email, password} = req.body
    const eUser = await users.findOne({email})

    if(eUser){
        
        if(eUser.authenticate(password)){

            const token = jwt.sign({
                id:eUser._id
            },"MYSECRETKEY@",{
                expiresIn:"1y"
            })
            res.status(200).json({token,message:"Login Succesfull"})

        }else{
            return res.status(401).json({message:"Email or password is incorrect"})
        }


    }else{
        return res.status(404).json({message:"user not found"})
    }
}


exports.findUsers = async(req,res) =>{
    const user = await users.findbyid(req.id)
    return res.status(200).json({user})
}  

