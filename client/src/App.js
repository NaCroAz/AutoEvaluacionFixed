import React, { useState } from 'react';

function App() {
  const [form, setForm] = useState(null);
  const [question, setQuestion] = useState('');

  const crearFormulario = async () => {
    try {
      const response = await fetch('http://localhost:3000/crear-formulario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error en la creación del formulario');
      }

      const data = await response.json();
      setForm(data);
    } catch (error) {
      console.error('Error al crear el formulario:', error);
    }
  };

  const generarPregunta = async () => {
    try {
      const response = await fetch('http://localhost:3000/generar-pregunta', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Error al generar la pregunta');
      }

      const data = await response.json();
      setQuestion(data.question);
    } catch (error) {
      console.error('Error al generar la pregunta:', error);
    }
  };

  return (
    <div>
      <button onClick={crearFormulario}>Crear Formulario</button>
      <button onClick={generarPregunta}>Generar Pregunta</button>
      {form && <pre>{JSON.stringify(form, null, 2)}</pre>}
      {question && <p>{question}</p>}
    </div>
  );
}

export default App;
