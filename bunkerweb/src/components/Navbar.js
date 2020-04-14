import React, { useState } from 'react';
import './Navbar.css'
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';
import logo from '../icons/logo.png';
import '../global.css';


function NavBar(props) {

    const history = useHistory();
    const [hiddenReturnButton, setButton] = useState(props.hiddenReturnButton);

    function handleClick() {
        history.push('/');
    }

    return (
        <div className="title">
            {/* <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                className="logoButton"
                onClick={() => handleClick()}> */}
            <button
                aria-label="logo menu"
                className="logoButton">
                <img src={logo} alt="Bunker logo" className="icon" />
            </button>
            {/* </IconButton> */}

        </div>

    )

}

export default NavBar;