import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';


const EditUser = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        address: '',
        state: '',
        birth_date: '',
    });
    const navigate = useNavigate();


    const updateUser = async (user) => {
        try {
            setLoading(true);
            await api.put(`/users/${id}`, user);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(user);
            navigate('/');
            alert('Usuário atualizado com sucesso!');
        } catch (error) {
            console.log(error);
        }
    };

    if (!user) {
        return <div>Carregando...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nome:</label>
                <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                />
            </div>
            <br />
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>CEP:</label>
                <input
                    type="text"
                    name="address"
                    value={user.address}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Estado:</label>
                <input
                    type="text"
                    name="state"
                    value={user.state}
                    onChange={handleChange}
                />
            </div>
            <br />
            <div>
                <label>Data de Nascimento:</label>
                <input
                    type="date"
                    name="birth_date"
                    value={user.birth_date}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Submeter'}
            </button>
        </form>
    );
};

export default EditUser;
