import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoBlack from './Logo-for-Black-Ver.png';
import logoWhite from './Logo-for-White-Ver.png';
import './App.css';

function PagPrincipal({ isDarkMode, setIsDarkMode }) {
    const navigate = useNavigate();
    const [showInicio, setShowInicio] = useState(true); // Start with Inicio shown
    const [showConcepto, setShowConcepto] = useState(false);
    const [logoSrc, setLogoSrc] = useState(isDarkMode ? logoBlack : logoWhite);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const toggleInicio = () => {
        setShowInicio(!showInicio);
        setShowConcepto(false);
    };

    const toggleConcepto = (e) => {
        e.preventDefault();
        setShowConcepto(!showConcepto);
        setShowInicio(false);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        setLogoSrc(isDarkMode ? logoWhite : logoBlack);
    };

    return (
        <div className={`App ${isDarkMode ? '' : 'light-mode'}`}>
            <div className="navbar">
                <div className="logo">
                    <img src={logoSrc} alt="SkillScore Logo" />
                </div>
                <div className="texts">
                    <a href="/" className={showConcepto ? 'inicio-activo' : ''} onClick={toggleConcepto}>Concepto</a>
                    <a href="/" className={showInicio ? 'inicio-activo' : ''} onClick={toggleInicio}>Inicio</a>
                    <a href="https://github.com/NaCroAz/AutoEvaluacionFixed">Acerca de</a>
                </div>
                <button className="switch-button">
                    <input type="checkbox" id="toggle" onClick={toggleDarkMode} />
                    <label htmlFor="toggle" className="slider round"></label>
                </button>
            </div>
            <div>
                {showInicio && (
                    <>
                        <h1>Seleccione el nivel para SkillScore</h1>
                        <div className="cards-container">
                            <div className="card-item" id='primaria' onClick={() => handleNavigate('/pagSecundaria')}>
                                <div className="card-number">#1</div>
                                <div className="card-content">
                                    <h2>Primaria</h2>
                                    <p>Domina temas de primaria con exámenes personalizados que fortalecen tu aprendizaje de manera efectiva.</p>
                                </div>
                            </div>
                            <div className="card-item" id='secundaria' onClick={() => handleNavigate('/pagSecundaria2')}>
                                <div className="card-number">#2</div>
                                <div className="card-content">
                                    <h2>Secundaria</h2>
                                    <p>Mejora tu rendimiento en secundaria con exámenes que evalúan y consolidan tus conocimientos clave.</p>
                                </div>
                            </div>
                            <div className="card-item" id='superior' onClick={() => handleNavigate('/pagSecundaria3')}>
                                <div className="card-number">#3</div>
                                <div className="card-content">
                                    <h2>Educacion Superior</h2>
                                    <p>Evalúa tu dominio en temas universitarios con exámenes personalizados que aseguran una preparación completa.</p>
                                </div>
                            </div>
                            <div className="card-item" id='autodidacta' onClick={() => handleNavigate('/pagSecundaria4')}>
                                <div className="card-number">#4</div>
                                <div className="card-content">
                                    <h2>Autodidacta</h2>
                                    <p>Refuerza tus conocimientos autodidactas con exámenes que te ayudan a medir tu progreso y comprensión de los temas.</p>
                                </div>
                            </div>
                        </div>
                        <h2 className='final-text'>PUNTUACIÓN PRECISA, POTENCIAL CLARO.</h2>
                    </>
                )}
                {showConcepto && (
                    <div className='concepto'>
                        <h1>Concepto</h1>
                        <h2 className="final-text2">
                            El desarrollo de una página de <strong className="highlight-rojo">autoevaluación</strong> surge de la necesidad de proporcionar a los estudiantes una herramienta que les permita prepararse de <em>manera efectiva y controlada</em> antes de enfrentar exámenes académicos importantes. Esta idea cobra relevancia considerando los <strong className="highlight-rojo">desafíos y ansiedades comunes que enfrentan los estudiantes al aproximarse a pruebas de conocimientos.</strong>
                            La ansiedad antes de un examen es una experiencia extendida entre estudiantes de todos los niveles educativos. Esta ansiedad puede ser debilitante, <strong>puede afectar negativamente el rendimiento y la confianza de los estudiantes</strong>, y puede afectando negativamente el rendimiento y la confianza de los estudiantes. La página de autoevaluación busca mitigar este estrés al ofrecer un <strong className="highlight-rojo">ambiente controlado</strong> donde los estudiantes pueden evaluar su comprensión y preparación en diferentes temas académicos.
                            La autoevaluación no solo proporciona una <strong className="highlight-azul">medida objetiva del conocimiento adquirido</strong>, sino que también <strong>permite identificar áreas de debilidad que requieren mayor atención</strong>. Al poder realizar pruebas personalizadas y recibir retroalimentación inmediata, los estudiantes pueden fortalecer sus habilidades de manera proactiva y efectiva. Esto no solo mejora su confianza antes de un examen real, sino que también <strong className='highlight-rojo'>fomenta un aprendizaje continuo y autónomo</strong>.
                            Además, la página de autoevaluación puede <em>adaptarse</em> para satisfacer las necesidades específicas de diferentes niveles educativos, desde primaria hasta educación superior, y puede servir tanto a estudiantes que prefieren estudiar de manera <strong>independiente</strong> como a aquellos que buscan <strong>complementar</strong> sus estudios formales.
                            En resumen, la página de <strong className="highlight-rojo">autoevaluación</strong> es crucial porque proporciona a los estudiantes una <em>herramienta valiosa</em> para enfrentar sus exámenes con mayor <em>confianza y preparación</em>. Al ofrecer un entorno donde pueden practicar, aprender de sus errores y mejorar, la página no solo contribuye al éxito académico, sino que también ayuda a reducir el estrés y la ansiedad asociados con los exámenes, promoviendo así un <strong className="highlight-azul">aprendizaje más efectivo y duradero</strong>.
                        </h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PagPrincipal;
