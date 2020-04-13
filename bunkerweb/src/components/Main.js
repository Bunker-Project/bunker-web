import React from 'react';
import './Main.css';
import '../global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import MessageIcon from '@material-ui/icons/Message';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonIcon from '@material-ui/icons/Person';

export default function Main() {

    const palette = {
        primary: {
            main: '#fff'
        }
    };

    const theme = createMuiTheme({ palette });

    function handleButtonClick() {
        alert('clicked');
    }

    return (
        <div className="row">
            <div className="inner">
                <ThemeProvider theme={theme}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <div className="paper">
                                <button
                                    className="mainButton"
                                    onClick={handleButtonClick}>
                                    <i>
                                        <SearchIcon
                                            color="primary"
                                            style={{ fontSize: 40 }} />
                                    </i>
                                </button>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="paper">
                                <button
                                    className="mainButton"
                                    onClick={handleButtonClick}>
                                    <i>
                                        <MessageIcon
                                            color="primary"
                                            style={{ fontSize: 40 }} />
                                    </i>
                                </button>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="paper">
                                <button
                                    className="mainButton"
                                    onClick={handleButtonClick}>
                                    <i>
                                        <VpnKeyIcon
                                            color="primary"
                                            style={{ fontSize: 40 }} />
                                    </i>
                                </button>
                            </div>

                        </Grid>
                        <Grid item xs={6}>
                            <div className="paper">
                                <button
                                    className="mainButton"
                                    onClick={handleButtonClick}>
                                    <i>
                                        <PersonIcon
                                            color="primary"
                                            style={{ fontSize: 40 }} />
                                    </i>
                                </button>
                            </div>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </div>
        </div>
    )
}

