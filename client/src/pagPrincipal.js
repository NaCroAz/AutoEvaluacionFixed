import React from 'react';
import { useNavigate } from 'react-router-dom';
/*import logoBlack from './Logo-for-Black-Ver.png';
import logoWhite from './Logo-for-White-Ver.png';*/
import './App.css';

function PagPrincipal({ isDarkMode, setIsDarkMode }) {
    const navigate = useNavigate();
    const [showInicio, setShowInicio] = useState(false);
    const [showConcepto, setShowConcepto] = useState(false);
    const [showAcercaDe, setShowAcercaDe] = useState(false);
    /*const [logoSrc, setLogoSrc] = React.useState(isDarkMode ? logoBlack : logoWhite);*/

    const handleNavigate = (path) => {
        navigate(path);
    };

    const toggleInicio = () => {
        setShowInicio(!showInicio);
        setShowConcepto(false);
        setShowAcercaDe(false);
    };

    const toggleConcepto = () => {
        setShowConcepto(!showConcepto);
        setShowAcercaDe(false);
    };

    const toggleAcercaDe = () => {
        setShowAcercaDe(!showAcercaDe);
        setShowConcepto(false);
    };
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        /*setLogoSrc(isDarkMode ? logoWhite : logoBlack);*/
    };

    return (
        <div className={`App ${isDarkMode ? '' : 'light-mode'}`}>
            <div className="navbar">
                <div className="logo">
                    <img /*src={logoSrc}*/ src='./images/Logo-for-Black-Ver.png' alt="SkillScore Logo" />
                </div>
                <div className="texts">
                    <a href="/" onClick={toggleConcepto}>Concepto</a>
                    <a href="/" className='inicio-link'>Inicio</a>
                    <a href="/" onClick={toggleAcercaDe}>Acerca de</a>
                </div>
                <button className="switch-button">
                    <input type="checkbox" id="toggle" onClick={toggleDarkMode} />
                    <label htmlFor="toggle" className="slider round"></label>
                </button>
            </div>
            <div>
                <h1>Seleccione el nivel para SkillScore</h1>
                <div className="cards-container">
                    <div className="card-item" id='primaria' onClick={() => handleNavigate('/pagSecundaria')}>
                        <div className="card-number">#1</div>
                        <div className="card-content">
                            <h2>Primaria</h2>
                            <p>Domina temas de primaria con exámenes personalizados que fortalecen tu aprendizaje de manera efectiva.</p>
                        </div>
                    </div>
                    <div className="card-item" id='secundaria' onClick={() => handleNavigate('/pagSecundaria')}>
                        <div className="card-number">#2</div>
                        <div className="card-content">
                            <h2>Secundaria</h2>
                            <p>Mejora tu rendimiento en secundaria con exámenes que evalúan y consolidan tus conocimientos clave.</p>
                        </div>
                    </div>
                    <div className="card-item" id='superior' onClick={() => handleNavigate('/pagSecundaria')}>
                        <div className="card-number">#3</div>
                        <div className="card-content">
                            <h2>Educacion Superior</h2>
                            <p>Evalúa tu dominio en temas universitarios con exámenes personalizados que aseguran una preparación completa.</p>
                        </div>
                    </div>
                    <div className="card-item" id='autodidacta' onClick={() => handleNavigate('/pagSecundaria')}>
                        <div className="card-number">#4</div>
                        <div className="card-content">
                            <h2>Autodidacta</h2>
                            <p>Refuerza tus conocimientos autodidactas con exámenes que te ayudan a medir tu progreso y comprensión de los temas.</p>
                        </div>
                    </div>
                </div>
                <h2 className='final-text'>PUNTUACIÓN PRECISA, POTENCIAL CLARO.</h2>
            </div>
        </div>
    );
}

export default PagPrincipal