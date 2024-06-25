import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './pagSecundaria.css';
import logoBlack from './Logo-for-Black-Ver.png';
import logoWhite from './Logo-for-White-Ver.png';

function PagSecundaria({ isDarkMode, setIsDarkMode }) {
    const [chatMessages, setChatMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [logoSrc, setLogoSrc] = React.useState(isDarkMode ? logoBlack : logoWhite);

    useEffect(() => {
        fetchInitialMessages();
    }, []);

    const fetchInitialMessages = async () => {
        setChatMessages([
            { content: '¡Bienvenido! Soy SkillBot (nivel primario)', sender: 'bot1', timestamp: new Date() },
            { content: '¿Sos lo suficientemente valiente como para poner a prueba tus conocimientos? ¡Ingresa los temas a evaluar y ponte a prueba!', sender: 'bot1', timestamp: new Date() }
        ]);
    };

    const generarPregunta = async () => {
        try {
            const response = await axios.get('http://localhost:3003/generar-pregunta');
            const newMessage = { content: response.data.question, sender: 'user', timestamp: new Date() };
            setChatMessages([...chatMessages, newMessage]);
        } catch (error) {
            console.error('Error al generar la pregunta:', error);
        }
        setInputValue('');
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (inputValue.trim() !== '') {
                const newMessage = { content: inputValue, sender: 'user', timestamp: new Date() };
                setChatMessages([...chatMessages, newMessage]);
                generarPregunta();
            }
            setInputValue('');
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        setLogoSrc(isDarkMode ? logoWhite : logoBlack);
    };

    return (
        <div className={`App1 ${isDarkMode ? '' : 'light-mode'}`}>
            <button className="switch-button">
                <input type="checkbox" id="toggle" onClick={toggleDarkMode} />
                <label htmlFor="toggle" className="slider round"></label>
            </button>
            <div className='form_container'>
                <div className='chat_area' style={{ backgroundImage: `url(${logoSrc})` }}>
                    {chatMessages.map((message, index) => (
                        <div key={index} className={`message ${message.sender}`}>
                            <p>{message.content}</p>
                        </div>
                    ))}
                </div>
                <div className='input_container'>
                    <input
                        type='text'
                        placeholder='Ingresar temas a evaluar'
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={handleKeyPress}>Enviar</button>
                </div>
            </div>
        </div>
    );
}

export default PagSecundaria;

