import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/api';


export default function Profile() {
    const [exFuncionarios, setexFuncionarios] = useState([]);
    const [contratados, setContratados] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        api.get(`relation/worked/${id}`)
            .then(res => {
                setexFuncionarios(res.data)
            })
            .catch(err => console.log(err));

        api.get(`/relation/work/${id}`)
            .then(res => {
                setContratados(res.data)
            })
            .catch(err => console.log(err));
    }, [id])

    return (
        <div>
            <div>
                <h2>Lista de ex Funcionarios</h2>
                <ul>
                    {exFuncionarios.map(exFuncionario => (
                        <li key={exFuncionario.chave}>
                            <strong> Nome do ex aluno: </strong>
                            <p>{exFuncionario.nome}</p>
                            <strong>Trabalhou de:</strong>
                            <p>{exFuncionario.de}</p>
                            <strong>até: </strong>
                            <p>{exFuncionario.ate}</p>
                        </li>
                    ))}
                </ul >
            </div>
            <div>
                <h2>Lista dos Funcionarios atuais</h2>
                <ul>
                    {contratados.map(contratado => (
                        <li key={contratado.chave}>
                            <strong> Nome do funcionario: </strong>
                            <p>{contratado.nome}</p>
                            <strong>Começou em:</strong>
                            <p>{contratado.desde}</p>
                        </li>
                    ))}
                </ul >
            </div>
        </div >

    )
}