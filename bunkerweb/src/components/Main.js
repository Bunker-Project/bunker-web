import React from 'react';
import './Main.css';
import '../global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row'
import Fab from './Fab.js';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import search from '../icons/search.png';

export default function Main() {

    return (
        <div className="row">
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Button className="mainButton">
                        {/* <img src={search} alt="search icon"></img> */}
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className="paper">xs=12 sm=6</Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className="paper">xs=12 sm=6</Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className="paper">xs=12 sm=6</Paper>
                </Grid>
            </Grid>
        </div>
    )
}

