import React, { useRef } from 'react';
import '../../global.css';
import './Login.css';
import { Form } from '@unform/web';
import Input from '../Input';
import { connect, useDispatch, useSelector } from 'react-redux';
import { signInRequest } from '../../store/modules/auth/actions';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

function Login() {

    const history = useHistory();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);
    const formRef = useRef(null);

    async function submitLogin(user) {
        try {
            formRef.current.setErrors({});

            const schema = Yup.object().shape({
                username: Yup.string().required('The email or username is required'),
                password: Yup.string().required('The password is required'),
            });

            await schema.validate(user, {
                abortEarly: false,
            });

            dispatch(signInRequest(user, history));
        } catch (err) {
            const validationErrors = {};

            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });
                formRef.current.setErrors(validationErrors);
            }
        }
    }

    function signUpClick(){
        history.push('/signUp');
    }

    return (
        <div className="container">
            <Form ref={formRef} onSubmit={submitLogin}>
                <div className="loginContainer">
                    <label
                        htmlFor="txtUsername"
                        className="label"> Username:</label>
                    <Input
                        id="txtUsername"
                        name="username"
                        placeholder="Your email"></Input>

                    <label
                        id="labelPassword"
                        htmlFor="txtPassword"
                        className="label"> Password:</label>
                    <Input
                        id="txtPassword"
                        name="password"
                        isPassword={true}
                        placeholder="Your password"
                        className="defaultTextBox"></Input>

                    <button
                        type="submit"
                        disabled={loading}
                        className="loginButton">
                        {loading ? "WAIT..." : "LOGIN"}
                    </button>
                </div>
            </Form>
            <div className="signUpContainer">
                <label className="or">OR</label>
                <button
                    className="signUpButton"
                    onClick={() => signUpClick()}>SIGN UP
                </button>
            </div>
        </div>
    )
}

// export default Login;
export default connect()(Login);