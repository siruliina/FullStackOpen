import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, NonSensitivePatient, NewPatient } from '../types';

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitiveData = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, 
    name, 
    dateOfBirth, 
    gender, 
    occupation
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {

  const newPatient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
  };

export default {
  getPatients,
  getNonSensitiveData,
  getPatientById,
  addPatient
};