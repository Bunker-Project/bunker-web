import React from 'react';
import '../global.css';
import './Login.css';

function Login() {
    return (
        <div className="container">
            <div className="loginContainer">
                <label
                    htmlFor="txtUsername"
                    className="label"> Username:</label>
                <input
                    type="text"
                    id="txtUsername"
                    // className={isErrorTitle ? "defaultTextBoxError" : "defaultTextBox"}
                    className="defaultTextBox"
                    placeholder="Type your username or email"
                    autoFocus
                // onChange={e => setTitle(e.target.value)}
                // value={title}
                ></input>

                <label
                    htmlFor="txtPassword"
                    className="label"> Password:</label>
                <input
                    type="password"
                    id="txtPassword"
                    // className={isErrorTitle ? "defaultTextBoxError" : "defaultTextBox"}
                    className="defaultTextBox"
                    placeholder="Type your password"
                    autoFocus
                // onChange={e => setTitle(e.target.value)}
                // value={title}
                ></input>

                <div className="showPassword">
                    <button
                        className="buttonPassword">View password</button>
                </div>
                <button
                    className="loginButton">LOGIN
                </button>
                <label className="or">OR</label>
                <button
                    className="loginButton">SIGN UP
                </button>
            </div>
        </div>
    )
}

export default Login;