import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import CreateEgresso from './pages/Egressos/Create';
import CreateEmpresa from './pages/Empresas/Create'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={'/egresso/novo'} component={CreateEgresso} exact/>
                <Route path={'/empresa/novo'} component={CreateEmpresa} exact/>

            </Switch>
        </BrowserRouter>
    )
}
