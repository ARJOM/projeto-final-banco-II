import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import api from '../../../services/api';


export default function UpadateEmpresa(){
    const [cnpj, setCnpj] = useState("");
    const [nome, setNome] = useState("");

    const { id }  = useParams();

    useEffect(() => {
        api.get(`company/${id}`)
            .then(res => {
                setCnpj(res.data['cnpj']);
                setNome(res.data['nome']);
            })
            .catch(err => console.log(err));
    }, [id])

    function handleSubmit(e){
        e.preventDefault();

        const data = {nome, cnpj}

        api.put(`company/${id}`, data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    return(
        <div>
            <h2>Atualização do Empresas</h2>
            <form onSubmit={handleSubmit}>
                <label>Nome: </label>
                <input type="text" value={nome} onChange={e => setNome(e.target.value)}/>
                <label>Cnpj: </label>
                <input type="text" value={cnpj} onChange={e => setCnpj(e.target.value)}/>
                <input type={"submit"} value={"Salvar"}/>
            </form>
        </div>
    )
}
