const mongoose = require ('mongoose');
//const Schema = mongoose.Schema;


//Create Schema
const AppointmentSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true,
    }, 
    time:{
        type: String,
        required: true
    }
});

module.exports = Appointment = mongoose.model('appointment', AppointmentSchema)