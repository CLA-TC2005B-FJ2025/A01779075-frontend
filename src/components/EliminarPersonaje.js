import React, { useState, useEffect } from 'react';
import { deletePersonaje, getPersonajes } from '../api';

function EliminarPersonaje() {
    const [idEliminar, setIdEliminar] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState(null);
    const [personajes, setPersonajes] = useState([]);

    
    useEffect(() => {
        const fetchPersonajes = async () => {
            try {
                const data = await getPersonajes();
                setPersonajes(data);
            } catch (err) {
                setError('Error al obtener personajes');
            }
        };

        fetchPersonajes();
    }, []);

    const handleChange = (e) => {
        setIdEliminar(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await deletePersonaje(idEliminar);
            setMensaje(response.message);
            setError(null);
            setIdEliminar('');
        } catch (error) {
            setError(error.message);
            setMensaje('');
        }
    };

    return (
        <div>
            <h2>Eliminar Personaje</h2>
            <ul>
                {personajes.map((p) => (
                    <li key={p.id}>
                        ID: {p.id} - Nombre: {p.nombre}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID del Personaje a Eliminar:</label>
                    <input type="number" value={idEliminar} onChange={handleChange} required />
                </div>
                <button type="submit">Eliminar Personaje</button>
            </form>
            {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
}

export default EliminarPersonaje;