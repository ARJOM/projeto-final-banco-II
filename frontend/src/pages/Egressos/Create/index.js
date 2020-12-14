import React from 'react';

export default function CreateEgresso(){
    return(
        <div>
            <h2>Cadastro de Egresso</h2>
            <form>
                <label>Nome: </label>
                <input type="text"/>
                <label>Matrícula: </label>
                <input type="text"/>
                <label>Curso</label>
                <input type="text"/>

                <button type={"submit"}>Salvar</button>
            </form>
        </div>
    )
}
