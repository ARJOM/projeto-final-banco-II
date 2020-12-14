import React, {useState} from 'react';
import api from '../../../services/api';

export default function CreateEgresso(){
    const [matricula, setMatricula] = useState("");
    const [nome, setNome] = useState("");
    const [curso, setCurso] = useState("");


    function handleSubmit(e){
        e.preventDefault();

        const data = {matricula, nome, curso};

        api.post('/graduate', data)
            .then(res => console.log(res.data.msg))
            .catch(err => console.log(err));
    }

    return(
        <div>
            <h2>Cadastro de Egresso</h2>
            <form onSubmit={handleSubmit}>
                <label>Nome: </label>
                <input type="text" onChange={e => setNome(e.target.value)}/>
                <label>Matrícula: </label>
                <input type="text" onChange={e => setMatricula(e.target.value)}/>
                <label>Curso</label>
                <input type="text" onChange={e => setCurso(e.target.value)}/>

                <input type={"submit"} value={"Salvar"}/>
            </form>
        </div>
    )
}
