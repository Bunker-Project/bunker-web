import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Main from './components/Main';
import Edit from './components/Edit';
import Search from './components/Search';
import Register from './components/Register';
import Secret from './components/Secret';
import NavBar from './components/Navbar';
import Login from './components/Login';
import Route from './components/Route';
import SignUp from './components/SignUp';
import Profile from './components/Profile';

export default function Routes() {

    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/home" component={Main} isPrivate />
                <Route path="/search" component={Search} isPrivate />
                <Route path="/register" component={Register} isPrivate />
                <Route path="/secret" component={Secret} isPrivate />
                <Route path="/edit" component={Edit} isPrivate />
                <Route path="/signUp" component={SignUp} />
                <Route path="/editSecret" component={Secret} isPrivate />
                <Route path="/profile" component={Profile} isPrivate />
            </Switch>

            {/* <Route 
                path="/search" 
                render={(props) => <Form {...props} id="search"/>} />

            <Route 
                path="/register" 
                render={(props) => <Form {...props} id="register"/>} />   
            
            <Route 
                path="/secret" 
                render={(props) => <Form {...props} id="secret"/>} />    */}



        </BrowserRouter>
    )
}