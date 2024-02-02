const mongoose = require("mongoose");
const Form = require("../Models/Form");


exports.addForm = async (req,res) =>{
    try{
    const{ name, PhoneNo ,email,password,interest } = req.body
    const _form = new Form(req.body)
     await_Form.save()
      res.status(201).json({message:"form has been submitted"})
          } catch (error){
             res.status(400).json({message:"Error"})
      
          }
        }




        
       