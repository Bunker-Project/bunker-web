import React, { useState } from 'react';
import './Navbar.css'
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';

import logo from '../icons/logo.png';


function NavBar(props) {

    const history = useHistory();
    const [hiddenReturnButton, setButton] = useState(props.hiddenReturnButton);

    function handleClick() {
        history.push('/');
    }

    return (
        <div className="title">
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                className="logoButton"
                onClick={() => handleClick()}>
                <img src={logo} alt="Bunker logo" className="icon" />
            </IconButton>

        </div>

    )

}

export default NavBar;