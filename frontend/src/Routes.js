import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import CreateEgresso from './pages/Egressos/Create';
import ListEgresso from './pages/Egressos/List';
import UpadateEgresso from "./pages/Egressos/Update";

import CreateEmpresa from './pages/Empresas/Create';
import ListEmpresa from './pages/Empresas/List';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={'/egresso/novo'} component={CreateEgresso} exact/>
                <Route path={'/empresa/novo'} component={CreateEmpresa} exact/>
                <Route path={'/egresso'} component={ListEgresso} exact/>
                <Route path={'/empresa'} component={ListEmpresa} exact/>
                <Route path={'/egresso/:id'} component={UpadateEgresso} exact/>
            </Switch>
        </BrowserRouter>
    )
}
