import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../../services/api';


export default function ProfileEgresso() {
    const [exEmpresas, setexEmpresas] = useState([]);
    const [empregosAtual, setempregoAtual] = useState([]);
    const [egresso, setEgresso] = useState({});

    const { id } = useParams();

    useEffect(() => {
        api.get(`/relation/egressoWorked/${id}`)
            .then(res => {
                setexEmpresas(res.data)
            })
            .catch(err => console.log(err));

        api.get(`/relation/egresso/${id}`)
            .then(res => {
                setempregoAtual(res.data)
            })
            .catch(err => console.log(err));

        api.get(`/graduate/${id}`)
            .then(res => setEgresso(res.data))
            .catch(err => console.log(err));
    }, [id])

    return (
        <div>
            <Link to={"/egresso/"}>Voltar</Link>
            <h1>Egresso: {egresso.nome}</h1>
            <h1>Curso: {egresso.curso}</h1>
            <h1>Matrícula: {egresso.matricula}</h1>
            <div>
                <h2>Ja trabalhou: </h2>
                <ul>
                    {exEmpresas.map(exEmpresas => (
                        <li key={exEmpresas.chave}>
                            <strong> Nome Empresa: </strong>
                            <p>{exEmpresas.nome}</p>
                            <strong>Trabalhou de:</strong>
                            <p>{exEmpresas.de}</p>
                            <strong>até: </strong>
                            <p>{exEmpresas.ate}</p>
                        </li>
                    ))}
                </ul >
            </div>
            <div>
                <h2>Trabalhos Ativos</h2>
                <ul>
                    {empregosAtual.map(empregoAtual => (
                        <li key={empregoAtual.chave}>
                            <strong> Nome da Empresa: </strong>
                            <p>{empregoAtual.nome}</p>
                            <strong>Começou em:</strong>
                            <p>{empregoAtual.desde}</p>
                        </li>
                    ))}
                </ul >
            </div>
        </div >

    )
}
