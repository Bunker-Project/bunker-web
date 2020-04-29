import React from 'react';
import './Main.css';
import '../../global.css';
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
        history.push({
            pathname: '/secret',
            state : {
                isEditing: false,
            }
        });
    }

    function goToSearch() {
        history.push('/search');
    }

    function goToUser(){
        // history.push('/login');
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
                                        aria-label="Go to search page and find your things"
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
                                        aria-label="Go to item's registration"
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
                                        aria-label="Go to secret's registration"
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
                                        className="mainButton"
                                        aria-label="Go to user's profile"
                                        onClick={goToUser}>
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

