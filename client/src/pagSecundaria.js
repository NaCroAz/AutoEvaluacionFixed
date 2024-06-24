import React, { useState } from 'react';
import axios from 'axios';

function PagSecundaria() {
    const [question, setQuestion] = useState('');

    const generarPregunta = async () => {
        try {
            const response = await axios.get('http://localhost:3003/generar-pregunta');
            setQuestion(response.data.question);
        } catch (error) {
            console.error('Error al generar la pregunta:', error);
        }
    };

    return (
        // <div className="App">
        //   <button onClick={crearFormulario}>Crear Formulario</button>
        //   <button onClick={generarPregunta}>Generar Pregunta</button>
        //   {form && <pre>{JSON.stringify(form, null, 2)}</pre>}
        //   {question && <p>{question}</p>}
        // </div>

        <div className='App'>
            <div className='form_container'>
                <div>
                    <img src="./images/Logo-for-Black-Ver.png" alt="SkillScore Logo" />
                </div>
                <button className="switch-button">
                    <input type="checkbox" id="toggle" />
                    <label htmlFor="toggle" className="slider round"></label>
                </button>
                <button onClick={generarPregunta}>Generar Pregunta</button>
                {question && <p>{question}</p>}
            </div>
        </div>
    );
}

export default PagSecundaria;
