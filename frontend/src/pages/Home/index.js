import React from 'react';
import { Link } from "react-router-dom";

export default function Home() {
    

    return (
        <div>
            <h2>Home page</h2>

            <Link to={"/empresa/"}>Empresa</Link>
            <br/>
            <Link to={"/egresso/"}>Egresso</Link>
        </div>
    )
}
