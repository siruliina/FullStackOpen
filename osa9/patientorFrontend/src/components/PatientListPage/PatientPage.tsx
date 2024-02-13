import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Diagnosis, Entry, Patient } from "../../types";
import { useEffect, useState } from "react";
import { assertNever } from "../../constants";
import { Work, MedicalServices, LocalHospital, Favorite } from "@mui/icons-material";

interface Props {
  diagnoses: Diagnosis[]
}


const EntryDetails = ({ entry } : { entry: Entry }) => {

  const checkRating = (rating: number) => {
    if (rating == 0) {
      return <Favorite style={{color: 'green'}} />;
    }
    if (rating == 1) {
      return <Favorite style={{color: 'yellow'}} />;
    }
    if (rating == 2) {
      return <Favorite style={{color: 'red'}} />;
    }
    if (rating == 3) {
      return <Favorite />;
    }
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <div>
          <p><LocalHospital /></p>
          <p>Discharge date: {entry.discharge.date} <br/>
          Criteria: {entry.discharge.criteria}</p>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <p><Work /></p>
          <p>Employer: {entry.employerName}</p>
          {entry.sickLeave?
            <p>Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>
            : null}
        </div>
      );
    case "HealthCheck":
      return (
        <div>
          <p><MedicalServices /></p>
          Health rating: {checkRating(entry.healthCheckRating)}
        </div>
      );
    default:
      return assertNever(entry);
  }
};

const PatientPage = ({ diagnoses } : Props ) => {
  const [patient, setPatient] = useState<Patient>();
  const id = useParams().id;

  useEffect(() => {
    
    const fetchPatient = async () => {
      if (id) {
        const patient = await patientService.getPatientById(id);
        setPatient(patient);
      } 
    };
    void fetchPatient();
  }, []);

  if (!patient) {
    return (
      <div>
        <h2 style={{color: "red"}}>
          No patient found with this id!
        </h2>
      </div>
    );
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>
        <b>SSN:</b> {patient.ssn} <br />
        <b>Gender:</b> {patient.gender} <br />
        <b>Occupation:</b> {patient.occupation}
      </p>
      <h3>Entries:</h3>
      {patient.entries.map((entry) => {
        return (
          <div key={entry.id} style={{border: 'solid', borderRadius: '10px', padding: '10px', margin: '10px'}}>
            {entry.date} {entry.description}<br />
            <EntryDetails entry={entry} />
            {entry.diagnosisCodes? <div> 
            <h4>Diagnoses:</h4>
            <ul>
              {entry.diagnosisCodes?.map((code) => {
                return <li key={code}>{code}
                  {diagnoses.map((diagnosis) => (
                    <div key={diagnosis.code}>
                      {diagnosis.code === code ? <> {diagnosis.name}</> : null}
                    </div>
                  ))}
                </li>;
              })}
            </ul></div>
            : null}
            <p>Diagnosis by: {entry.specialist}</p>
          </div>
        );
      })}
    </div>
      
  );
};

export default PatientPage;