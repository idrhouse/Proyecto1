import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Persona } from "../types/Personas";

const Edit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [persona, setPersona] = useState<Persona | null>(null);
    const { register, handleSubmit, setValue } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      fetch(`http://localhost:8080/personas/${id}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setPersona(data);
          setValue('firstName', data.firstName); 
          setValue('lastName', data.lastName);
          setValue('telephone', data.telephone);
          setValue('age', data.age);
          setValue('country', data.country);
          setValue('province', data.province);
        })
        .catch(error => console.error('Error fetching:', error));
    }, [id, setValue]);
  
    const onSubmit = async (data: any) => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/personas/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          console.log('Persona actualizada');
          navigate(`/`);
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
      setLoading(false);
    };
  
    if (!persona) {
      return <div>Error</div>;
    }
  
    return (
      <div>
        <h2>Editar Persona</h2>
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

  export default Edit;