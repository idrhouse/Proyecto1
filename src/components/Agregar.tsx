import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Agregar: React.FC = () => {
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const onSubmit = async (data: any) => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/personas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          console.log('Persona agregada exitosamente');
          navigate(`/`);
        } else {
          console.error('Error al agregar la persona:', response.statusText);
        }
      } catch (error) {
        console.error('Error al agregar la persona:', error);
      }
      setLoading(false);
    };
  
    return (
      <div>
        <h2>Agregar Persona</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Nombre:</label>
          <input {...register('firstName')} />
          <label>Apellido:</label>
          <input {...register('lastName')} />        
          <label>Telefono:</label>
          <input type="number" {...register('telephone')} />
          <label>Edad:</label>
          <input type="number" {...register('age')} />
          <label>Pais:</label>
          <input {...register('country')} />
          <label>Provincia:</label>
          <input {...register('province')} /> 
          <h4>      
          <button onClick={() => navigate(`/`)}>Cancelar</button>    
          <button type="submit" disabled={loading}>Guardar</button>        
          </h4>
          
        </form>
      </div>
    );
  };

  export default Agregar;