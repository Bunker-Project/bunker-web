import React from 'react';
import '../../global.css';
import { Form } from '@unform/web';
import Input from '../Input';
import './styles.css';

function SignUp() {
    return (
        <div className="container">
            <Form>
                <div className="signUpMain">
                    <label
                        htmlFor="txtName"
                        className="label"> First name:</label>
                    <Input
                        id="txtName"
                        name="name"
                        placeholder="Your name"></Input>
                    <label
                        htmlFor="txtLastName"
                        className="label"> Last name:</label>
                    <Input
                        id="txtLastName"
                        name="lastname"
                        placeholder="Your last name"></Input>

                    <label
                        htmlFor="txtEmail"
                        className="label"> Email:</label>
                    <Input
                        id="txtEmail"
                        name="email"
                        type="email"
                        placeholder="Tell us you e-mail"></Input>

                    <label
                        htmlFor="txtUsername"
                        className="label"> Username:</label>
                    <Input
                        id="txtUsername"
                        name="username"
                        placeholder="How do you want to be called?"></Input>

                    <label
                        htmlFor="txtPassword"
                        className="label"> Password:</label>
                    <Input
                        id="txtPassword"
                        name="password"
                        isPassword={true}
                        placeholder="Your password"></Input>
                        
                    <label
                        htmlFor="txtPasswordConfirmation"
                        className="label"> Confirm your Password:</label>
                    <Input
                        id="txtPasswordConfirmation"
                        name="passwordConfirmation"
                        isPassword={true}
                        placeholder="Confirm your password"></Input>

                </div>
            </Form>
        </div>
    )
}

export default SignUp;