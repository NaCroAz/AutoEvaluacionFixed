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

  const pagPrincipal = (
    <div className="App">
      <div className="navbar">
        <div className="logo">
          <img src="./images/Logo-for-Black-Ver.png" alt="SkillScore Logo" />
        </div>
        <div className="texts">
          <a href="/">Concepto</a>
          <a href="/">Inicio</a>
          <a href="/">Acerca de</a>
        </div>
        <button className="switch-button">
          <input type="checkbox" id="toggle" />
          <label htmlFor="toggle" className="slider round"></label>
        </button>
      </div>
      <div>
        <h1>Seleccione el nivel para SkillScore</h1>
        <div className="cards-container">
          <div className="card-item" id='primaria'>
            <div className="card-number">#1</div>
            <div className="card-content">
              <h2>Primaria</h2>
              <p>Domina temas de primaria con exámenes personalizados que fortalecen tu aprendizaje de manera efectiva.</p>
            </div>
          </div>
          <div className="card-item" id='secundaria'>
            <div className="card-number">#2</div>
            <div className="card-content">
              <h2>Secundaria</h2>
              <p>Mejora tu rendimiento en secundaria con exámenes que evalúan y consolidan tus conocimientos clave.</p>
            </div>
          </div>
          <div className="card-item" id='superior'>
            <div className="card-number">#3</div>
            <div className="card-content">
              <h2>Educacion Superior</h2>
              <p>Evalúa tu dominio en temas universitarios con exámenes personalizados que aseguran una preparación completa.</p>
            </div>
          </div>
          <div className="card-item" id='autodidacta'>
            <div className="card-number">#4</div>
            <div className="card-content">
              <h2>Autodidacta</h2>
              <p>Refuerza tus conocimientos autodidactas con exámenes que te ayudan a medir tu progreso y comprensión de los temas.</p>
            </div>
          </div>
        </div>
        <h2>PUNTUACIÓN PRECISA, POTENCIAL CLARO.</h2>
      </div>
    </div>
  )
  const pagSecundaria = (
    <div className="App">
      <button onClick={crearFormulario}>Crear Formulario</button>
      <button onClick={generarPregunta}>Generar Pregunta</button>
      {form && <pre>{JSON.stringify(form, null, 2)}</pre>}
      {question && <p>{question}</p>}
    </div>
  );

  return (
    <div>
      {pagPrincipal}
      {/* {pagSecundaria} */}
    </div>
  );
}

export default App;
