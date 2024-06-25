import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './pagSecundaria4.css';
import logoBlack from './Logo-for-Black-Ver.png';
import logoWhite from './Logo-for-White-Ver.png';

function PagSecundaria4({ isDarkMode, setIsDarkMode }) {
    const [chatMessages, setChatMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [logoSrc, setLogoSrc] = React.useState(isDarkMode ? logoBlack : logoWhite);

    useEffect(() => {
        fetchInitialMessages();
    }, []);

    const fetchInitialMessages = async () => {
        setChatMessages([
            { content: '¡Bienvenido! Soy SkillBot (nivel superior)', sender: 'bot4', timestamp: new Date() },
            { content: 'Profundiza en los temas seleccionados y verifica tu nivel de comprensión académica.', sender: 'bot4', timestamp: new Date() }
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
        <div className={`App2 ${isDarkMode ? '' : 'light-mode'}`}>
            <button className="switch-button">
                <input type="checkbox" id="toggle" onClick={toggleDarkMode} />
                <label htmlFor="toggle" className="slider round"></label>
            </button>
            <div className='form_container3'>
                <div className='chat_area4' style={{ backgroundImage: `url(${logoSrc})` }}>
                    {chatMessages.map((message, index) => (
                        <div key={index} className={`message ${message.sender}`}>
                            <p>{message.content}</p>
                        </div>
                    ))}
                </div>
                <div className='input_container4'>
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

export default PagSecundaria4;

