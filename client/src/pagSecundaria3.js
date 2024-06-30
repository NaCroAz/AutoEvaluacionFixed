import React, { useState, useEffect, useRef } from 'react';
import './pagSecundaria3.css';
import logoBlack from './Logo-for-Black-Ver.png';
import logoWhite from './Logo-for-White-Ver.png';

function PagSecundaria3({ isDarkMode, setIsDarkMode }) {
    const [chatMessages, setChatMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [logoSrc, setLogoSrc] = React.useState(isDarkMode ? logoBlack : logoWhite);
    const examen = [
        {
            tema: 'Tema 1',
            tipo: 'opcion_multiple',
            pregunta: '¿Cuál es la capital de Argentina?',
            opciones: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza'],
            respuesta_correcta: 'Buenos Aires'
        },
        {
            tema: 'Tema 2',
            tipo: 'desarrollo',
            pregunta: 'Explique brevemente el proceso de fotosíntesis.'
        }
        // Add more questions as needed
    ];

    const chatAreaRef = useRef(null);

    useEffect(() => {
        fetchInitialMessages();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    const scrollToBottom = () => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    };

    const fetchInitialMessages = async () => {
        setChatMessages([
            { content: '¡Bienvenido! Soy SkillBot (nivel superior)', sender: 'bot3', timestamp: new Date() },
            { content: 'Profundiza en los temas seleccionados y verifica tu nivel de comprensión académica.', sender: 'bot3', timestamp: new Date() },
            { content: 'Ingrese la carrera en la que se encuentra y el tema a evaluar', sender: 'bot3', timestamp: new Date() }
        ]);
    };

    const generarPregunta = async () => {
        try {
            const response = await fetch('http://localhost:3003/generate-question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: inputValue, tipo: "superior" }),
            });
            const data = await response.json();
            const newMessage = { content: data.question, sender: 'bot3', timestamp: new Date() };
            setChatMessages(prevMessages => [...prevMessages, newMessage]);
        } catch (error) {
            console.error('Error al generar la pregunta:', error);
            const errorMessage = { content: 'Error al generar la pregunta.', sender: 'bot3', timestamp: new Date() };
            setChatMessages(prevMessages => [...prevMessages, errorMessage]);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (inputValue.trim() !== '') {
                const newMessage = { content: inputValue, sender: 'user', timestamp: new Date() };
                setChatMessages(prevMessages => [...prevMessages, newMessage]);
                setInputValue('');
                generarPregunta();
            }
        }
    };

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            sendMessage();
        }
    };

    const sendMessage = () => {
        const newMessage = { content: inputValue, sender: 'user', timestamp: new Date() };
        setChatMessages(prevMessages => [...prevMessages, newMessage]);
        setInputValue('');
        generarPregunta();
    };

    const evaluarResultados = () => {
        const respuestasUsuario = {}; // Object to store user's answers

        // Extract user's answers from chatMessages
        chatMessages.forEach(message => {
            if (message.sender === 'user') {
                // Assuming user's answers for multiple-choice questions are in a specific format
                // Example: "1. Respuesta 1, 2. Respuesta 2, 3. Respuesta 3"
                // You need to parse and store these answers appropriately
                // For simplicity, assume direct mapping from chatMessages for now
                respuestasUsuario[message.tema] = message.content; // Adjust as per your actual structure
            }
        });

        // Evaluate the exam using the function defined on the server side
        fetch('http://localhost:3003/evaluar-examen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ respuestasUsuario, examen }),
        })
            .then(response => response.json())
            .then(data => {
                const puntaje = data.puntaje;
                const resultados = `Resultados del examen: ${puntaje >= examen.length / 2 ? 'No aprobado' : 'Aprobado'}`;
                const mensajeResultado = { content: resultados, sender: 'bot3', timestamp: new Date() };
                setChatMessages(prevMessages => [...prevMessages, mensajeResultado]);
                setInputValue('');
            })
            .catch(error => {
                console.error('Error al evaluar el examen:', error);
                const errorMessage = { content: 'Error al evaluar el examen.', sender: 'bot3', timestamp: new Date() };
                setChatMessages(prevMessages => [...prevMessages, errorMessage]);
            });
    };



    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        setLogoSrc(isDarkMode ? logoWhite : logoBlack);
    };

    return (
        <div className={`App2 ${isDarkMode ? '' : 'light-mode'}`}>
            <button className="switch-button">
                <input type="checkbox" id="toggle" onClick={toggleDarkMode} />
                <label htmlFor="toggle" className="slider round"></label>
            </button>
            <div className='form_container3'>
                <div ref={chatAreaRef} className='chat_area3' style={{ backgroundImage: `url(${logoSrc})`, overflowY: 'auto' }}>
                    {chatMessages.map((message, index) => (
                        <div key={index} className={`message ${message.sender}`}>
                            {typeof message.content === 'string' ?
                                message.content.split('\n').map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                )) :
                                <p>{JSON.stringify(message.content)}</p>
                            }
                        </div>
                    ))}
                </div>
                <div className='input_container3'>
                    <input
                        type='text'
                        placeholder='Ingresar temas a evaluar'
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={handleButtonClick}>Enviar</button>
                    <button onClick={evaluarResultados}>Evaluar</button>
                </div>
            </div>
        </div>
    );
}

export default PagSecundaria3;

