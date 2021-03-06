import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import api from '../../../services/api';


export default function ProfileEmpresa() {
    const [exFuncionarios, setexFuncionarios] = useState([]);
    const [contratados, setContratados] = useState([]);
    const [empresa, setEmpresa] = useState({});

    const { id } = useParams();

    useEffect(() => {
        api.get(`/company/${id}`)
            .then(res => {
                setEmpresa(res.data)
            })
        api.get(`/relation/worked/${id}`)
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


    function handleDemitir(id_funcionario){
        const today = new Date();
        const date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
        const data = {empresa:id, data:date}
        api.put(`/relation/${id_funcionario}`, data)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        window.location.reload();
    }


    return (
        <div>
            <Link to={"/empresa/"}>Voltar</Link>
            <h1>Empresa: {empresa.nome} {empresa.cnpj}</h1>
            <div>
                <h2>Lista de ex Funcionarios </h2>
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
                        <li key={contratado._id}>
                            <strong> Nome do funcionario: </strong>
                            <p>
                                {contratado.nome}
                                <button onClick={() => handleDemitir(contratado._id)}>Demitir</button>
                            </p>

                            <strong>Começou em:</strong>
                            <p>{contratado.desde}</p>
                        </li>
                    ))}
                </ul >
            </div>
            <Link to={`/contratar/${id}`}>Contratar</Link>
        </div >

    )
}
