import React, { useEffect } from 'react';
import './Navbar.css'
import { useHistory } from 'react-router-dom';
import logo from '../../icons/logo.png';
import '../../global.css';
import Api from '../../Api';
import { useDispatch } from 'react-redux';
import { setRefreshToken } from '../../store/modules/auth/actions';
import { store } from '../../store';


function NavBar(props) {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        async function refreshToken() {

            var api = new Api();
            let signed = store.getState().auth.signed;
            
            if (signed) {
                if (!api.validateToken()) {
                    let response = await api.refreshToken();

                    if (response)
                        dispatch(setRefreshToken(response));

                    if (!response)
                        history.push('/');
                }
            }
        }

        refreshToken();
    }, [dispatch, history]);



    function handleClick() {
        history.push('/');
    }

    return (
        <div className="title" role="heading" aria-level="1">
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