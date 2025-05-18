// src/App.jsx
import React from 'react';
import Form from './components/Form';
import PatientsList from './components/PatientsList';

function App() {
  return (
    <div>
      <h1>Medical Form App</h1>
      <Form />
      <hr />
      <PatientsList />
    </div>
  );
}

export default App;