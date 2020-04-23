import React from 'react';
import '../../global.css';
import './Login.css';
import { Form } from '@unform/web';
import Input from '../Input';
import { connect, useDispatch, useSelector } from 'react-redux';
import { signInRequest } from '../../store/modules/auth/actions';
import { useHistory } from 'react-router-dom';

function Login() {

    const history = useHistory();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);

    function submitLogin(user) {
        dispatch(signInRequest(user, history));
    }

    return (
        <div className="container">
            <Form onSubmit={submitLogin}>
                <div className="loginContainer">
                    <label
                        htmlFor="txtUsername"
                        className="label"> Username:</label>
                    <Input
                        id="txtUsername"
                        name="username"
                        type="email"
                        placeholder="Your email"></Input>

                    <label
                        htmlFor="txtPassword"
                        className="label"> Password:</label>
                    <Input
                        id="txtPassword"
                        name="password"
                        type="password"
                        placeholder="Your password"
                        className="defaultTextBox"></Input>

                    <div className="showPassword">
                        <button
                            className="buttonPassword">View password</button>
                    </div>
                    <button
                        type="submit"
                        className="loginButton">
                        {loading ? "WAIT..." : "LOGIN"}
                    </button>
                    <label className="or">OR</label>
                    <button
                        className="loginButton">SIGN UP
                    </button>
                </div>
            </Form>
        </div>
    )
}

// export default Login;
export default connect()(Login);