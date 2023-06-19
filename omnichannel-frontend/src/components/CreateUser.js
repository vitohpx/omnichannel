import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
            console.log('YAMETEEEEEEEEEEEEEE', user);
            await createUser(user);

            navigate('/');

        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

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
            <br />
            <div>
                <label>CEP:</label>
                <input
                    type="text"
                    name="address"
                    value={user.address}
                    onChange={handleChange}
                />
            </div>
            <br />
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
            <br />
            <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Submit'}
            </button>
        </form>
    );
};

export default CreateUser;
