import React from 'react';
import './Navbar.css'
import { useHistory } from 'react-router-dom';
import logo from '../../icons/logo.png';
import '../../global.css';


function NavBar(props) {

    const history = useHistory();

    function handleClick() {
        history.push('/');
    }

    return (
        <div className="title">
            <button
                aria-label="This is the logo, it's just simple image where is written Bunker, nothing else and also it is used to return to main page if you want"
                className="logoButton"
                onClick={() => handleClick()}>
                <img src={logo} alt="Bunker logo" className="icon" />
            </button>
        </div>

    )

}

export default NavBar;