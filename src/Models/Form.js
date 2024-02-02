// Form.js
const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    PhoneNo: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    interest: {
        type: String,
        required: true
    }
});



