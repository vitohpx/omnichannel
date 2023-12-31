import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import './Users.css';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await api.get('/users');
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className='div-subtitle'>
                <Link className='link-add' to="/users">Adicionar Usuário</Link>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td><Link className='edit-link' to={{ pathname: `/users/edit/${user.id}`, search: `name=${user.name}&email=${user.email}&address=${user.address}&state=${user.state}&birth_date=${user.birthDate}` }}>Editar</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
