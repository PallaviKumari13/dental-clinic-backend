const  mongoose = require("mongoose")


const paymentSchema = new mongoose.Schema({
  patientName: String,
  paymentAmount: Number,
  paymentMethod: String,
  notes: String
});


