import React from 'react';
import './Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row'
import Fab from './Fab.js';
import NavBar from './Navbar';

export default class Main extends React.Component {
    render() {
        return (
            <div>
                <NavBar></NavBar>
                <Row>
                    <Fab></Fab>
                </Row>
            </div>
        )
    }
}

