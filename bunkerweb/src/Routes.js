import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Main from './components/Main';
import Edit from './components/Edit';
import Form from './components/Form';

export default function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Main} />

            <Route 
                path="/search" 
                render={(props) => <Form {...props} id="search"/>} />

            <Route 
                path="/register" 
                render={(props) => <Form {...props} id="register"/>} />   
            
            <Route 
                path="/secret" 
                render={(props) => <Form {...props} id="secret"/>} />   

            <Route path="/edit" component={Edit} />
            
        </BrowserRouter>
    )
}