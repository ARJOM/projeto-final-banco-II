import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home'

import CreateEgresso from './pages/Egressos/Create';
import ListEgresso from './pages/Egressos/List';
import UpadateEgresso from "./pages/Egressos/Update";
import ProfileEgresso from "./pages/Egressos/Profile";

import CreateEmpresa from './pages/Empresas/Create';
import ListEmpresa from './pages/Empresas/List';
import UpadateEmpresa from './pages/Empresas/Update';
import ProfileEmpresa from './pages/Empresas/Profile';
import Contratar from './pages/Empresas/Relacionamento';

import CreateLocation from './pages/Localizacoes/Create';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={'/'} component={Home} exact />
                <Route path={'/egresso/novo'} component={CreateEgresso} exact />
                <Route path={'/empresa/novo'} component={CreateEmpresa} exact />
                <Route path={'/egresso'} component={ListEgresso} exact />
                <Route path={'/empresa'} component={ListEmpresa} exact />
                <Route path={'/egresso/:id'} component={UpadateEgresso} exact />
                <Route path={'/empresa/:id'} component={UpadateEmpresa} exact />
                <Route path={'/empresa/profile/:id'} component={ProfileEmpresa} exact />
                <Route path={'/egresso/profile/:id'} component={ProfileEgresso} exact />
                <Route path={'/contratar/:id'} component={Contratar} exact />

                <Route path={'/location/:id'} component={CreateLocation} exact/>
            </Switch>
        </BrowserRouter>
    )
}
