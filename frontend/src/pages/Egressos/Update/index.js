import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import api from '../../../services/api';


export default function UpadateEgresso(){
    const [matricula, setMatricula] = useState("");
    const [nome, setNome] = useState("");
    const [curso, setCurso] = useState("");

    const { id }  = useParams();

    useEffect(() => {
        api.get(`graduate/${id}`)
            .then(res => {
                setMatricula(res.data['matricula']);
                setCurso(res.data['curso']);
                setNome(res.data['nome']);
            })
            .catch(err => console.log(err));
    }, [id])

    function handleSubmit(e){
        e.preventDefault();

        const data = {nome, matricula, curso}

        api.put(`graduate/${id}`, data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    return(
        <div>
            <h2>Atualização do Egresso</h2>
            <form onSubmit={handleSubmit}>
                <label>Nome: </label>
                <input type="text" value={nome} onChange={e => setNome(e.target.value)}/>
                <label>Matrícula: </label>
                <input type="text" value={matricula} onChange={e => setMatricula(e.target.value)}/>
                <label>Curso</label>
                <input type="text" value={curso} onChange={e => setCurso(e.target.value)}/>

                <input type={"submit"} value={"Salvar"}/>
            </form>
        </div>
    )
}
