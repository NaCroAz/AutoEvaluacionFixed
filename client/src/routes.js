import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import PagSecundaria from './pagSecundaria';
import PagPrincipal from './pagPrincipal';
import './App.css'
const Rutas = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

return (
    <Router>
      <Routes>
        <Route path="*" element={<PagPrincipal isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/pagSecundaria" element={<PagSecundaria isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
      </Routes>
    </Router>
  );
}

export default Rutas