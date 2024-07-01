import React, { useState, useEffect, useRef } from 'react';
import './pagSecundaria3.css';
import logoBlack from './Logo-for-Black-Ver.png';
import logoWhite from './Logo-for-White-Ver.png';

function PagSecundaria3({ isDarkMode, setIsDarkMode }) {
    const [chatMessages, setChatMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [logoSrc, setLogoSrc] = React.useState(isDarkMode ? logoBlack : logoWhite);
    const [generatedQuestions, setGeneratedQuestions] = useState([]);
    const [buttonChange, setButtonChange] = useState(true)
    const textareaRef = useRef(null);
    // const [lastQuestion, setLastQuestion] = useState(null);

    const chatAreaRef = useRef(null);

    useEffect(() => {
        fetchInitialMessages();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    const fetchInitialMessages = () => {
        setChatMessages([
            { content: '¡Bienvenido! Soy SkillBot (nivel terciario)', sender: 'bot3', timestamp: new Date() },
            { content: '¿Estás listo para mostrar todo lo que sabes y alcanzar tu máximo potencial?', sender: 'bot3', timestamp: new Date() },
            { content: 'Ingrese el año en el que se encuentra y el tema a evaluar. Los temas pueden ser fusionados con algún tema de interes del usuario.', sender: 'bot3', timestamp: new Date() }
        ]);
    };

    const generarPregunta = async () => {
        try {
            const response = await fetch('http://localhost:3003/generate-question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: inputValue, tipo: "secundario" }),
            });
            const data = await response.json();
            const newMessage = { content: data.question, sender: 'bot3', timestamp: new Date() };
            setChatMessages(prevMessages => [...prevMessages, newMessage]);
            setGeneratedQuestions(prevQuestions => [...prevQuestions, data.question]); // Agregar la pregunta generada al estado
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
            if (inputValue.trim() !== '' && buttonChange === true) {
                const newMessage = { content: inputValue, sender: 'user', timestamp: new Date() };
                setChatMessages(prevMessages => [...prevMessages, newMessage]);
                setInputValue('');
                setButtonChange(prevState => !prevState);
                generarPregunta();
            } else {
                setInputValue('');
                setButtonChange(prevState => !prevState);
                evaluarResultados()
            }
        };
    }

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            setButtonChange(prevState => !prevState);
            sendMessage(); // Ensure this function sends the message and populates respuestasUsuario if needed
        }
    };

    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.style.height = textarea.scrollHeight + 'px';
    });

    // Inside PagSecundaria component
    const sendMessage = () => {
        const respuestasUsuario = {}; // Populate with user inputs if needed

        fetch('http://localhost:3003/evaluar-examen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ respuestasUsuario, preguntas: generatedQuestions }),
        })
            .then(response => response.json())
            .then(data => {
                const mensajeResultado = {
                    content: `Resultado del examen: ${data.resultadoEvaluacion}`,
                    sender: 'bot3',
                    timestamp: new Date()
                };
                setChatMessages(prevMessages => [...prevMessages, mensajeResultado]);
                setInputValue('');
                setButtonChange(prevState => !prevState);
            })
            .catch(error => {
                console.error('Error al evaluar el examen:', error);
                const errorMessage = { content: 'Error al evaluar el examen.', sender: 'bot3', timestamp: new Date() };
                setChatMessages(prevMessages => [...prevMessages, errorMessage]);
            });
    };


    const evaluarResultados = () => {
        // Make sure respuestasUsuario is correctly populated based on user's input
        // Example:
        const respuestasUsuario = { pregunta: chatMessages[chatMessages.length - 1].content, respuesta: inputValue }; // Replace with actual logic to populate this

        // Convert array of generated questions to a single string with newlines
        const preguntasString = generatedQuestions.join('\n');

        fetch('http://localhost:3003/evaluar-examen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ respuestasUsuario, preguntas: preguntasString }),
        })
            .then(response => response.json())
            .then(data => {
                const resultados = `Resultado del examen: ${data.resultadoEvaluacion}`;
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

    const scrollToBottom = () => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
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
                    <textarea
                        autoFocus
                        type='text'
                        ref={textareaRef}
                        required placeholder='Ingresar temas a evaluar'
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                    />
                    {buttonChange ?
                        (<button onClick={handleButtonClick}>Enviar</button>) :
                        (<button onClick={evaluarResultados}>Evaluar</button>)}
                </div>
            </div>
        </div>
    );
}

export default PagSecundaria3;

