import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Persona } from "../types/Personas";
  
  const PAGE_SIZE = 5; 
  
  const TablaPersona: React.FC = () => {
    const [personas, setPersonas] = useState<Persona[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
      fetch('http://localhost:8080/personas')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setPersonas(data);
        })
        .catch(error => console.error('Error fetching:', error));
    }, []);
  
    const totalPages = Math.ceil(personas.length / PAGE_SIZE);
  
    const handlePageChange = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };
  
    const paginatedProducts = personas.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  
    const filteredProducts = searchTerm ? personas.filter(persona => persona.firstName.toLowerCase().includes(searchTerm.toLowerCase())) : paginatedProducts;
  
    return (
      <div>
        <h2>Tabla Personas</h2>
        <input type="text" placeholder="Busqueda por nombre" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <h4><button onClick={() => navigate(`/persona/agregar`)}>Agregar nueva persona</button></h4>
        
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Telefono</th>
              <th>Edad</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(persona => (
              <tr key={persona.id}>
                <td>{persona.id}</td>
                <td>{persona.firstName}</td>
                <td>{persona.lastName}</td>
                <td>{persona.telephone}</td>
                <td>{persona.age}</td>
                <td>
                  <button onClick={() => navigate(`/persona/${persona.id}`)}>Ver</button>
                  <button onClick={() => navigate(`/persona/${persona.id}/edit`)}>Editar</button>
                  <button onClick={() => navigate(`/persona/${persona.id}/eliminar`)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i + 1} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
          ))}
        </div>
      </div>
    );
  };

  export default TablaPersona;