import React, { useState } from 'react';
import './Navbar.css'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { useHistory } from 'react-router-dom';
import { ReactComponent as BunkerIcon } from '../icons/bunker.svg';

function NavBar(props) {

    const history = useHistory();
    const [showReturnButton, setButton] = useState(props.showReturnButton);

    function handleClick() {
        console.log("here");
        console.log(history);
        history.push('/');
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => handleClick()}>
                    <BunkerIcon className="icon" />
                </IconButton>
                <Link className="title">
                    Bunker
                    </Link>
                <IconButton
                    color="inherit"
                    hidden={showReturnButton}
                    onClick={() => handleClick()}>
                    <ArrowBackIosOutlinedIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )

}

export default NavBar;