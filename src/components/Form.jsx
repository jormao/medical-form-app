import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import './Form.css';

function Form() {
  const [name, setName] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [observations, setObservations] = useState('');
  const [medications, setMedications] = useState('');
  const [recommendations, setRecommendations] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'patients'), {
        name,
        symptoms,
        observations,
        medications,
        recommendations,
        createdAt: new Date()
      });
      alert('Patient data added successfully!');
      setName('');
      setSymptoms('');
      setObservations('');
      setMedications('');
      setRecommendations('');
    } catch (error) {
      console.error('Error adding patient: ', error);
      alert('Error adding patient');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Medical Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label">Name</label>
          <input 
            type="text" 
            className="form-input" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-field">
          <label className="form-label">Symptoms</label>
          <textarea 
            className="form-input" 
            value={symptoms} 
            onChange={(e) => setSymptoms(e.target.value)} 
            required 
          />
        </div>
        <div className="form-field">
          <label className="form-label">Observations</label>
          <textarea 
            className="form-input" 
            value={observations} 
            onChange={(e) => setObservations(e.target.value)} 
            required 
          />
        </div>
        <div className="form-field">
          <label className="form-label">Medications</label>
          <textarea 
            className="form-input" 
            value={medications} 
            onChange={(e) => setMedications(e.target.value)} 
            required 
          />
        </div>
        <div className="form-field">
          <label className="form-label">Recommendations</label>
          <textarea 
            className="form-input" 
            value={recommendations} 
            onChange={(e) => setRecommendations(e.target.value)} 
            required 
          />
        </div>
        <button className="form-button" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;