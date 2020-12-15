import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { Link, useParams } from "react-router-dom";


export default function Contratar() {
    const [egressos, setEgressos] = useState([]);
    const [empresa, setEmpresa] = useState('');
    const [contratado, setContratado] = useState('');
    const [date, setdate] = useState('');

    const { id } = useParams();

    function handleContratar(e) {
        e.preventDefault();

        const data = {
            egresso:contratado,
            empresa:id,
            data:date
        };

        api.post('/relation', data)
            .then(res => console.log(res.data.msg))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        api.get(`/company/${id}`)
            .then(res => {
                setEmpresa(res.data)
            })

        api.get("/graduate")
            .then(res => setEgressos(res.data))
            .catch(err => console.log(err));

    }, [id])

    return (
        <div>
            <Link to={`/empresa/profile/${id}`}>Voltar</Link>
            <h2>Egressos para a {empresa.nome}</h2>
            <p>Selecione o seu funcionario</p>
            <form onSubmit={handleContratar}>
                <select value={egressos._id} onChange={e => setContratado(e.target.value)}>
                    {egressos.map(egresso => (
                        <option key={egresso._id} value={egresso._id}>{egresso.nome}</option>
                    ))}
                </select>
                <label>data: </label>
                <input type="date" onChange={e => setdate(e.target.value)}/>
                <button className="button" type="submit">Fazer Contrato</button>
            </form>
        </div>
    )
}
