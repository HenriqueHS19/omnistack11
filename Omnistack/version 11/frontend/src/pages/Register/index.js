import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

import logo from '../../assets/logo.svg';

export default function Register() {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ whatsApp, setWhatsApp ] = useState('');
    const [ city, setCity ] = useState('');
    const [ uf, setUF ] = useState('');

    const history = useHistory('/');

    async function handleRegister(event) {
        event.preventDefault();

        const response = await api.post('/ong', {
            nameOng: name,
            emailOng: email,
            whatsappOng: whatsApp,
            cityOng: city,
            ufOng: uf
        }); 

        try {
            alert('Seu ID de acesso: ' + response.data.idOng);
            history.push('/');
        }
        catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
        
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={ logo } alt="Be The Hero"/>

                    <h1> Cadastro </h1>
                    <p>
                        Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.
                    </p>

                    <Link to = "/" className="link">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para o logon
                    </Link>
                </section>

                <form onSubmit = { handleRegister }>
                    <input 
                        type="text" 
                        placeholder="Nome da ONG" 
                        value = { name }
                        onChange = { function(event) {
                            setName(event.target.value);
                        }}
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value = { email }
                        onChange = { function(event) {
                            setEmail(event.target.value);
                        }}
                    />
                    <input 
                        type="text" 
                        placeholder="WhatsApp"
                        value = { whatsApp }
                        onChange = { function(event) {
                            setWhatsApp(event.target.value);
                        }}
                    />

                    <div className="group-input">
                        <input 
                            type="text" 
                            placeholder="Cidade"
                            value = { city }
                            onChange = { function(event) {
                                setCity(event.target.value);
                            }}
                        />
                        <input 
                            type="text" 
                            placeholder="UF" 
                            style = {{ width: 80 }} 
                            value = { uf }
                            onChange = { function(event) {
                                setUF(event.target.value);
                            }}
                        />
                    </div>

                    <button type="submit" className="button"> Cadastrar </button>
                </form>
            </div>
        </div>
    );
}