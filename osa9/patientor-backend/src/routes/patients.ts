import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';


const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveData());
});

router.get('/:id', (req, res) => {
  try {
    const patientId = req.params.id;

    const patient = patientService.getPatientById(patientId);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    
    return res.json(patient);
  } catch (error) {
    console.error('Error fetching patient data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }  
});

export default router;