import React, { useState } from 'react';
import api from '../../../services/api';
import {useHistory, Link } from 'react-router-dom';

export default function CreateEmpresa() {
    const [nome, setNome] = useState("");
    const [cnpj, setCnpj] = useState("");
    
    const history = useHistory();
   

    function handleSubmit(e) {
        e.preventDefault();
        let data;

        if (cnpj === "") {
            data = { nome }
        } else {
            data = { nome, cnpj };
        }
        api.post('/company', data)
            .then(res => console.log(res.data.msg))
            .catch(err => console.log(err));

            history.push('/');
    }

    return (
        <div>
            <Link to={"/empresa/"}>Voltar</Link>
            <h2>Cadastro de Empresa</h2>
            <form onSubmit={handleSubmit}>
                <label>Nome: </label>
                <input type="text" onChange={e => setNome(e.target.value)} />
                <label>Cnpj: </label>
                <input type="text" onChange={e => setCnpj(e.target.value)} />

                <input type={"submit"} value={"Salvar"} />
            </form>
        </div>
    )
}
