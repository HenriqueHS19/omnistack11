import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

import logo from '../../assets/logo.svg';

export default function NewIncident() {

    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ value, setValue ] = useState('');

    const history = useHistory('');

    async function handleRegister(event) {
        event.preventDefault();

        try {
            const reponse = await api.post('/incidents', {
                titleIncidents: title,
                descriptionIncidents: description,
                valueIncidents: value,
            },
            {
                headers: {
                    idOng: localStorage.getItem('ongId')
                }
            });

            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar o caso, tente novamente.');
        }
    }

    return (
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={ logo } alt="Be The Hero"/>

                <h1> Cadastro novo caso </h1>
                <p>
                    Descreva o caso detalhadamente para encontrar um heroi para resolver isso
                </p>

                <Link to = "/profile" className="link">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar para a home
                </Link>
            </section>

            <form onSubmit = { handleRegister }>
                <input 
                    type="text" 
                    placeholder="Titulo do caso"
                    value = { title }
                    onChange = { function(event) {
                        setTitle(event.target.value);
                    }}
                />
                <textarea 
                    type="email" 
                    placeholder="Descrição"
                    value = { description }
                    onChange = { function(event) {
                        setDescription(event.target.value);
                    }}
                />
                <input 
                    type="text" 
                    placeholder="Valor em reais"
                    value = { value }
                    onChange = { function(event) {
                        setValue(event.target.value);
                    }}
                />
                
                <div className="group-button">
                    <button type="button" className="button"> Cancelar </button>
                    <button type="submit" className="button"> Cadastrar </button>
                </div>
                
            </form>
        </div>
    </div>
    );
}