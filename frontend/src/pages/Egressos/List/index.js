import React, {useState, useEffect} from 'react';
import api from '../../../services/api';
import {Link} from "react-router-dom";


export default function ListEgresso(){
    const [egressos, setEgressos] = useState([])

    useEffect(() => {
        api.get("/graduate")
            .then(res => setEgressos(res.data))
            .catch(err => console.log(err));
    }, [])

    return(
        <div>
            <h2>Lista de Egressos</h2>
            <ul>
            {egressos.map(egresso => (
                <li key={egresso._id}>{egresso.nome} - {egresso.matricula}</li>
            ))}
            </ul>
            <Link to={"/egresso/novo"}>Novo Egresso</Link>
        </div>
    )
}
