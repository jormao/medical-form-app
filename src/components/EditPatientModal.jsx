import React, { useState } from 'react';

function EditPatientModal({ patient, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: patient.name || '',
    symptoms: patient.symptoms || '',
    observations: patient.observations || '',
    medications: patient.medications || '',
    recommendations: patient.recommendations || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      setError('Error saving patient');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Patient</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
          />
        </label>
        <label>
          Symptoms:
          <input
            type="text"
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            disabled={loading}
          />
        </label>
        <label>
          Observations:
          <input
            type="text"
            name="observations"
            value={formData.observations}
            onChange={handleChange}
            disabled={loading}
          />
        </label>
        <label>
          Medications:
          <input
            type="text"
            name="medications"
            value={formData.medications}
            onChange={handleChange}
            disabled={loading}
          />
        </label>
        <label>
          Recommendations:
          <input
            type="text"
            name="recommendations"
            value={formData.recommendations}
            onChange={handleChange}
            disabled={loading}
          />
        </label>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button onClick={onClose} disabled={loading}>Cancel</button>
      </div>
    </div>
  );
}

export default EditPatientModal;