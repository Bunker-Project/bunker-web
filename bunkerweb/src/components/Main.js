import React from 'react';
import './Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row'
import Fab from './Fab.js';

export default class Main extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Fab></Fab>
                </Row>
            </div>
        )
    }
}

