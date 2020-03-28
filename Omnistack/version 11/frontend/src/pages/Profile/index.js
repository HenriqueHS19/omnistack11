import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api';

import './style.css';

import logo from '../../assets/logo.svg';

export default function Profile() {
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const [ incidents, setIncidents ] = useState([]);

    const history = useHistory('');

    useEffect(function() {

        //get all incidents relationship with logged ong
        async function  getIncidents() {
            const response = await api.get('/profile', {
                headers: {
                    idOng: ongId
                }
            });
            setIncidents(response.data);
        }
        
        getIncidents();

    }, [ongId]);

    async function handleDelete(id) {
        try {
           await api.delete('/incidents/'+id, {
                headers: {
                    idOng: ongId
                }
            });
            
            setIncidents(incidents.filter(function(incident) {
                let obj = {};
                if (incident.id !== id) {
                    obj = incident;
                }
                return obj;
            })); 
        }
        catch (err) {
            alert('Erro ao deletar o incidente, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return ( 
        <div className="profile-container">
            <header>
                <img src={ logo } alt="Be The Hero"/>

                <strong> Bem vinda, { ongName } </strong>

                <Link to="incidents/new" className="button">
                    Cadastrar novo caso
                </Link>

                <button type="button" onClick = { handleLogout } > 
                    <FiPower size={18} color="#E02041"></FiPower>
                </button>

            </header>

            <h1> Casos cadastrados </h1>

            <ul>

                { incidents.map(function(incident) {
                    return (
                        <li key = { incident.id }>
                            <strong> Caso: </strong>
                            <p> { incident.titleIncidents } </p>

                            <strong> Descrição: </strong>
                            <p> { incident.descriptionIncidents } </p>

                            <strong> Valor: </strong>
                            <p> { Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.valueIncidents) } </p>

                        <button type="button" onClick = { function() { handleDelete(incident.id) }}> 
                            <FiTrash2 size = {20} color="#a8a8b3"></FiTrash2>
                        </button>
                    </li>
                    );
                })}

            </ul>
        </div>
    );
}