import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Main from './components/Main';
import Search from './components/Search';
import Register from './components/Register';
import Secret from './components/Secret';
import Edit from './components/Edit';

export default function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Main} />
            <Route path="/search" component={Search} />
            <Route path="/register" component={Register} />
            <Route path="/secret" component={Secret} />
            <Route path="/edit" component={Edit} />
        </BrowserRouter>
    )
}