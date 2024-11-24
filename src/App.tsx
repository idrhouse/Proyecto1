import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import TablaPersona from './components/TablaPersona';
import Ver from './components/Ver';
import Edit from './components/Edit';
import Eliminar from './components/Eliminar';
import Agregar from './components/Agregar';


const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<TablaPersona />} />
          <Route path="/persona/:id" element={<Ver />} />
          <Route path="/persona/:id/edit" element={<Edit />} />
          <Route path="/persona/:id/eliminar" element={<Eliminar />} />
          <Route path="/persona/agregar" element={<Agregar />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
