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
import { useHistory } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

export default function Main() {

    const palette = {
        primary: {
            main: '#fff'
        }
    };

    const history = useHistory();

    const theme = createMuiTheme({ palette });

    function goToRegisterItem() {
        history.push('/register');
    }

    function goToRegisterSecret() {
        history.push('/secret');
    }

    function goToSearch() {
        history.push('/search');
    }

    return (
        <div className="row">
            <div className="inner">
                <ThemeProvider theme={theme}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <div className="paper">
                                <Tooltip TransitionComponent={Zoom} title="Search" placement="top">
                                    <button
                                        className="mainButton"
                                        onClick={goToSearch}>
                                        <i>
                                            <SearchIcon
                                                color="primary"
                                                style={{ fontSize: 40 }} />
                                        </i>
                                    </button>
                                </Tooltip>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="paper">
                                <Tooltip TransitionComponent={Zoom} title="Register an item" placement="top" >
                                    <button
                                        className="mainButton"
                                        onClick={goToRegisterItem}>
                                        <i>
                                            <MessageIcon
                                                color="primary"
                                                style={{ fontSize: 40 }} />
                                        </i>
                                    </button>
                                </Tooltip>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="paper">
                                <Tooltip TransitionComponent={Zoom} title="Register a secret">
                                    <button
                                        className="mainButton"
                                        onClick={goToRegisterSecret}>
                                        <i>
                                            <VpnKeyIcon
                                                color="primary"
                                                style={{ fontSize: 40 }} />
                                        </i>
                                    </button>
                                </Tooltip>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="paper">
                                <Tooltip TransitionComponent={Zoom} title="User's configuration">
                                    <button
                                        className="mainButton">
                                        <i>
                                            <PersonIcon
                                                color="primary"
                                                style={{ fontSize: 40 }} />
                                        </i>
                                    </button>
                                </Tooltip>
                            </div>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </div>
        </div>
    )
}

