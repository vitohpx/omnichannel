import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';


const CreateUser = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        address: '',
        state: '',
        birth_date: '',
    });
    const navigate = useNavigate();

    const createUser = async (user) => {
        try {
            setLoading(true);
            setError(null);
            await api.post('/users', user);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.error);
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
        setLoading(true);
        try {
            await createUser(user);

            navigate('/');

        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <form className='form' onSubmit={handleSubmit}>
            <div>
                <label>Nome:</label>
                <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                />
            </div>
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
            <div>
                <label>Data de Nascimento:</label>
                <input
                    type="date"
                    name="birth_date"
                    value={user.birth_date}
                    onChange={handleChange}
                />
            </div>
            <div className='buttons-create-edit'>
                <button className='submit-button' type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Submeter'}
                </button>
                <Link className='cancel-link' to="/">Cancelar</Link>
            </div>
        </form>
    );
};

export default CreateUser;
