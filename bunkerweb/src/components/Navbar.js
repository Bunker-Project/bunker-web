import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './Navbar.css'

export default class NavBar extends React.Component {
    render() {
        return (
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#home">Bunker</Navbar.Brand>
            </Navbar>
        )
    }
}