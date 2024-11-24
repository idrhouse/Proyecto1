import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Persona } from "../types/Personas";

const Ver: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [persona, setPersona] = useState<Persona | null>(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      fetch(`http://localhost:8080/personas/${id}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setPersona(data);
        })
        .catch(error => console.error('Error fetching ', error));
    }, [id]);
  
    if (!persona) {
      return <div>Error</div>;
    }
  
    return (
      <div>
        <h2>Persona Detalles</h2>
        <p>ID: {persona.id}</p>
        <p>Nombre: {persona.firstName}</p>
        <p>Apellido: {persona.lastName}</p>
        <p>Telefono: {persona.telephone}</p>
        <p>Edad: {persona.age}</p> 
        <p>Pais: {persona.country}</p> 
        <p>Provincia: {persona.province}</p>  
        <button onClick={() => navigate(`/`)}>Volver</button>
      </div>
    );
  };

  export default Ver;