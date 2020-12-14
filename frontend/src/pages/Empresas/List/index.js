import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { Link } from "react-router-dom";


export default function ListEmpresa() {
    const [empresa, setempresa] = useState([])

    useEffect(() => {
        api.get("/company")
            .then(res => setempresa(res.data))
            .catch(err => console.log(err));
    }, [])

    return (
        <div>
            <h2>Lista de Empresas</h2>
            <ul>
                {empresa.map(empresa => (
                    <li key={empresa._id}>
                        <a href={`/empresa/profile/${empresa._id}`}>
                            {empresa.nome}
                        </a>- {empresa.cnpj}
                        <a href={`/empresa/${empresa._id}`}>
                            Editar
                        </a>
                    </li>
                ))}
            </ul>
            <Link to={"/empresa/novo"}>Nova Empresa</Link>
        </div>
    )
}
