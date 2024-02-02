exports.sendEmail = async (req,res)=> {
const nodemailer = require("nodemailer")
    try{
       const transport = nodemailer.createTransport({
        service:"gmail",
        host:"smtp.gmail.com",
        port:465,
        auth:{
            user:"Shikharaj506@gmail.com",
            pass:"esyp iuwj mykv yxvz"
        }
       })
       const data={
        from:"Shikharaj506@gmail.com",
        to:req.body.email,
        subject:req.subject,
        text:req.text
       }
       transport.sendMail(data,(error,info)=>{
       if(error){
        console.log(error);
        res.status(400).json({message:"Email Delivery Error"})
       }else{
        console.log(info);
        res.status(200).json({message:"Success"})
       }
       
       })
       
    }catch(error){
        return res.status(400).json({error,message:"Error Occurred"})

    }
}