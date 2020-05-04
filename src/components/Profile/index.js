import React from 'react';
import './style.css';
import '../../global.css';
import { Helmet } from 'react-helmet';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/modules/auth/actions';

function Profile() {

    const palette = {
        primary: {
            main: '#fff'
        }
    };

    const theme = createMuiTheme({ palette });
    const history = useHistory();
    const dispatch = useDispatch();

    function handleSignOut() {
        dispatch(logout(history));
    }

    return (
        <>
            <Helmet>
                <title>Profile / Bunker</title>
            </Helmet>
            <div className="profileContainer">
                <ThemeProvider theme={theme}>
                    <Tooltip TransitionComponent={Zoom} title="Logout" placement="top">
                        <button
                            className="mainButton"
                            aria-label="Logout"
                            onClick={handleSignOut}>
                            <i>
                                <PowerSettingsNewIcon
                                    color="primary"
                                    style={{ fontSize: 40 }} />
                            </i>
                        </button>
                    </Tooltip>
                </ThemeProvider>
            </div>
        </>
    )
}

export default Profile;