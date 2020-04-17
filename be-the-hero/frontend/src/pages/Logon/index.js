import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './style.css';

import heroImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

export default function Logon() {

    const [ id, setId ] = useState('');

    const history = useHistory('');

    async function handleLogin(event) {
        event.preventDefault();

        try {
            const response = await api.post('/session', {
                idOng: id
            });
            
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.nameOng);

            history.push('/profile');
        }
        catch (err) {
            alert('Falha no login, tente novamente.');
        }
        
    }

    return (
        <div className="logon-container">

            <section className="form">

                <img src={ logo } alt="logo"/>

                <form onSubmit = { handleLogin }>
                    <h1> Faça seu Logon </h1>

                    <input 
                        placeholder="Sua ID" 
                        value = { id }
                        onChange = { function(event) {
                            setId(event.target.value);
                        }}    
                    />

                    <button className="button" type="submit"> Entrar </button>

                    <Link to="/register" className="link">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>

            </section>

            <img src={ heroImg } alt="Heroes"/>

        </div>
    );
}