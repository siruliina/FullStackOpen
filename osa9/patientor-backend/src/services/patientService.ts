import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, NonSensitivePatient, NewPatient } from '../types';

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitiveData = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, 
    name, 
    dateOfBirth, 
    gender, 
    occupation,
    entries
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  try {
    const patient = patients.find(patient => patient.id === id);
    console.log(patient);
    return patient;
  } catch (error) {
    return undefined;
  }
};

const addPatient = (patient: NewPatient): Patient => {

  const newPatient = {
    id: uuid(),
    ...patient,
    entries: []
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