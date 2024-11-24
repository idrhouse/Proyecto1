import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Persona } from "../types/Personas";

const Eliminar: React.FC = () => {
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
  
    const handleDelete = async () => {
      try {
        const response = await fetch(`http://localhost:8080/personas/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          console.log('Persona eliminada exitosamente');
          navigate(`/`);
        } else {
          console.error('Error al eliminar la persona:', response.statusText);
        }
      } catch (error) {
        console.error('Error al eliminar la persona:', error);
      }
    };
  
    if (!persona) {
      return <div>Error</div>;
    }
  
    return (
      <div>
        <h2>Confirmar Eliminacion</h2>
        <p>ID: {persona.id}</p>
        <p>Nombre: {persona.firstName}</p>
        <p>Apellido: {persona.lastName}</p>
        <p>Telefono: {persona.telephone}</p>
        <p>Edad: {persona.age}</p>
        <button onClick={() => navigate(`/`)}>Cancelar</button>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
    );
  };

  export default Eliminar;