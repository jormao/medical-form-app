import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import './PatientsList.css';
import EditPatientModal from './EditPatientModal';

function PatientsList() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState(null); // para botones individuales

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'patients'));
      const patientsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPatients(patientsData);
      setFilteredPatients(patientsData);
    } catch (error) {
      console.error('Error fetching patients: ', error);
      alert('Error al cargar pacientes.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = patients.filter(patient =>
      patient.name.toLowerCase().includes(searchValue) ||
      patient.symptoms.toLowerCase().includes(searchValue) ||
      patient.observations.toLowerCase().includes(searchValue) ||
      patient.medications.toLowerCase().includes(searchValue) ||
      patient.recommendations.toLowerCase().includes(searchValue)
    );
    setFilteredPatients(filtered);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro que quieres eliminar este paciente?');
    if (!confirmDelete) return;

    setProcessingId(id);
    try {
      await deleteDoc(doc(db, 'patients', id));
      alert('Paciente eliminado correctamente');
      await fetchPatients();
    } catch (error) {
      console.error('Error al eliminar paciente: ', error);
      alert('Error al eliminar paciente');
    }
    setProcessingId(null);
  };

  const handleSave = async (updatedPatientData) => {
    setLoading(true);
    try {
      const patientRef = doc(db, 'patients', selectedPatient.id);
      await updateDoc(patientRef, updatedPatientData);
      alert('Paciente actualizado correctamente');
      await fetchPatients();
      setSelectedPatient(null);
    } catch (error) {
      console.error('Error updating patient:', error);
      alert('Error al actualizar paciente');
    }
    setLoading(false);
  };

  return (
    <div className="patients-container">
      <h2 className="patients-title">Patients List</h2>
      <input
        type="text"
        placeholder="Search patients..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
        disabled={loading}
      />
      {loading && <p>Cargando pacientes...</p>}
      {!loading && filteredPatients.length === 0 && (
        <p className="no-patients">No patients found</p>
      )}
      {!loading && filteredPatients.length > 0 && (
        <ul className="patients-list">
          {filteredPatients.map((patient) => (
            <li key={patient.id} className="patient-item">
              <strong>{patient.name}</strong>
              <p><strong>Symptoms:</strong> {patient.symptoms}</p>
              <p><strong>Observations:</strong> {patient.observations}</p>
              <p><strong>Medications:</strong> {patient.medications}</p>
              <p><strong>Recommendations:</strong> {patient.recommendations}</p>
              <button
                className="edit-button"
                onClick={() => setSelectedPatient(patient)}
                disabled={loading || processingId !== null}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(patient.id)}
                disabled={loading || processingId === patient.id}
              >
                {processingId === patient.id ? 'Deleting...' : 'Delete'}
              </button>
            </li>
          ))}
        </ul>
      )}
      {selectedPatient?.id && (
        <EditPatientModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default PatientsList;