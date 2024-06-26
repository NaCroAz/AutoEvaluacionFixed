import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import PagSecundaria from './pagSecundaria';
import PagSecundaria2 from './pagSecundaria2';
import PagSecundaria3 from './pagSecundaria3';
import PagSecundaria4 from './pagSecundaria4';
import PagPrincipal from './pagPrincipal';

import './App.css'
const Rutas = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

return (
    <Router>
      <Routes>
        <Route path="*" element={<PagPrincipal isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/pagSecundaria" element={<PagSecundaria isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/pagSecundaria2" element={<PagSecundaria2 isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/pagSecundaria3" element={<PagSecundaria3 isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/pagSecundaria4" element={<PagSecundaria4 isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
      </Routes>
    </Router>
  );
}

export default Rutas