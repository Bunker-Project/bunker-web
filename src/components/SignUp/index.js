import React, { useRef, useState } from 'react';
import '../../global.css';
import { Form } from '@unform/web';
import Input from '../Input';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
// import Api from '../../Api';
import { signUp } from '../../store/modules/user/actions';
import { Helmet } from 'react-helmet';

function SignUp() {

    const history = useHistory();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.user.loading);
    const formRef = useRef(null);
    const [username, setUsername] = useState('');
    // const api = new Api({ isDev: true });

    const schema = Yup.object().shape({
        firstName: Yup.string().required('Name is required').max(50),
        lastname: Yup.string().required('Last name is required').max(50),
        email: Yup.string().email().required('Email is required'),
        passwordAsString: Yup.string().required('Password is required'),
        passwordConfirmation: Yup.string().oneOf([Yup.ref('passwordAsString'), null], 'Passwords do not match'),
        username: Yup.string().required('Username is required')
    })

    async function submitData(data) {
        try {
            formRef.current.setErrors({});

            await schema.validate(data, {
                abortEarly: false
            });

            dispatch(signUp(data, history));
        } catch (err) {
            const validationErrors = {};

            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message
                });

                formRef.current.setErrors(validationErrors);
            }
        }
    }

    async function checkUserName() {
        // let response = await api.checkUsername(username);
    }

    return (
        <div className="signUpContainer">
            <Helmet>
                <title>SignUp / Bunker</title>
            </Helmet>
            <Form ref={formRef} onSubmit={submitData}>
                <div className="signUpContainer">
                    <label
                        htmlFor="txtName"
                        className="label"> First name:</label>
                    <Input
                        id="txtName"
                        data-testid="sign_name_input"
                        name="firstName"
                        placeholder="Your name"></Input>
                    <label
                        htmlFor="txtLastName"
                        className="label"> Last name:</label>
                    <Input
                        id="txtLastName"
                        data-testid="sign_lastName_input"
                        name="lastname"
                        placeholder="Your last name"></Input>

                    <label
                        htmlFor="txtEmail"
                        className="label"> Email:</label>
                    <Input
                        id="txtEmail"
                        data-testid="sign_email_input"
                        name="email"
                        type="email"
                        placeholder="Tell us you e-mail"></Input>

                    <label
                        htmlFor="txtUsername"
                        className="label"> Username:</label>
                    <Input
                        id="txtUsername"
                        data-testid="sign_username_input"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={() => checkUserName()}
                        placeholder="How do you want to be called?"></Input>

                    <label
                        htmlFor="txtPassword"
                        className="label"> Password:</label>
                    <Input
                        id="txtPassword"
                        data-testid="sign_password_input"
                        name="passwordAsString"
                        isPassword={true}
                        placeholder="Your password"></Input>

                    <label
                        htmlFor="txtPasswordConfirmation"
                        className="label"> Confirm your Password:</label>
                    <Input
                        id="txtPasswordConfirmation"
                        data-testid="sign_password_confirmation_input"
                        name="passwordConfirmation"
                        isPassword={true}
                        placeholder="Confirm your password"></Input>
                    <button
                        type="submit"
                        data-testid="sign_submit_button"
                        disabled={loading}
                        className="loginButton">
                        {loading ? "WAIT..." : "SIGN UP"}
                    </button>
                </div>
            </Form>
        </div>
    )
}

export default SignUp;