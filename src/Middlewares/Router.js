const express = require('express');
const router = express.Router();
const patientController = require('../Controllers/PatientController');

// Routes for patients
router.post('/patients', patientController.createPatient);
router.get('/patients', patientController.getAllPatients);
router.get('/patients/:id', patientController.getPatientById);
router.put('/patients/:id', patientController.updatePatientById);
router.delete('/patients/:id', patientController.deletePatientById);

module.exports = router;
