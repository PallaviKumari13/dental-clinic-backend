const User = require("../Models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PaymentDetails = require("../Models/PaymentDetails"); // Import Payment model
const patient = require("../Models/Patient");

exports.register = async (req, res, next) => {
    const { name, PhoneNo, email, password } = req.body;
    const hash_password = bcrypt.hashSync(password, 10);
    const _user = new User(req.body);
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Account already exists" });
        }
        _user.password = hash_password; // Set hashed password
        await _user.save();
        req.subject = "User Registration";
        req.text = "You have successfully Signed up";
        next();
    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(400).json({ error, message: "Error Occurred" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({ message: "Email or password is incorrect" });
        }
        const token = jwt.sign({
            id: user._id
        }, "MYSECRETKEY@", {
            expiresIn: "1y"
        });
        res.status(200).json({ token, message: "Login Successful" });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.findUsers = async (req, res) => {
    try {
        const user = await User.findById(req.id); // Fix typo here (findById instead of findbyid)
        return res.status(200).json({ user });
    } catch (error) {
        console.error("Find User Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.appointment = async (req, res, next) => {
    const { name, PhoneNo, email, date, time } = req.body;
    const _user = new User(req.body);
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            await _user.save();
            req.subject = "User Appointment";
            req.text = "You have successfully got an appointment";
            next();
        } else {
            return res.status(400).json({ message: "User already exists" });
        }
    } catch (error) {
        console.error("Appointment Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// API endpoint to handle payment submission
exports.submitPayment = async (req, res) => {
    try {
        const newPayment = new Payment(req.body);
        await newPayment.save();
        res.status(201).json({ message: 'Payment details stored successfully' });
    } catch (error) {
        console.error('Error saving payment details:', error);
        res.status(500).json({ message: 'Failed to store payment details' });
    }
};




exports.createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create patient', error: error.message });
  }
};

// Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch patients', error: error.message });
  }
};

// Get a single patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch patient', error: error.message });
  }
};

// Update a patient by ID
exports.updatePatientById = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update patient', error: error.message });
  }
};

// Delete a patient by ID
exports.deletePatientById = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete patient', error: error.message });
  }
};
