import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [form, setForm] = useState(null);
  const [question, setQuestion] = useState('');

  const crearFormulario = async () => {
    try {
      const response = await axios.post('http://localhost:3003/crear-formulario', {}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setForm(response.data);
    } catch (error) {
      console.error('Error al crear el formulario:', error);
    }
  };

  const generarPregunta = async () => {
    try {
      const response = await axios.get('http://localhost:3003/generar-pregunta');
      setQuestion(response.data.question);
    } catch (error) {
      console.error('Error al generar la pregunta:', error);
    }
  };

  return (
    <div className="App">
      <button onClick={crearFormulario}>Crear Formulario</button>
      <button onClick={generarPregunta}>Generar Pregunta</button>
      {form && <pre>{JSON.stringify(form, null, 2)}</pre>}
      {question && <p>{question}</p>}
    </div>
  );
}

export default App;
