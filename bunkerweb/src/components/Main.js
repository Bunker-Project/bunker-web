import React from 'react';
import './Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SpeedDials from './FABButton'

export default class Main extends React.Component {
    render() {
        return (
            // <Row xs={2} md={4} lg={6}>
            <Row>
                {/* <Col className="leftside" md={6}>
                </Col>
                <Col className="rightside" md={6}>
            
                </Col> */}
                <SpeedDials></SpeedDials>
            </Row>
        )
    }
}

