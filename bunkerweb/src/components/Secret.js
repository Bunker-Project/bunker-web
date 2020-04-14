import React, { useState } from 'react';
import './Secret.css';
import Api from '../Api';
import { v4 as uuidv4 } from 'uuid'
import '../global.css';

import SnackBar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// class Secret extends React.Component {
function Secret(props) {

    const defaultIdHelperMessage = '* This field is required, otherwise we can not find the key for you afterwards :)';
    const api = new Api({ isDev: true });
    const [showPassword, setShowPassword] = useState(false);
    const [txtId, setTxtId] = useState('');
    const [txtPassword, setTxtPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [messageType, setMessageType] = useState('');
    const [message, setMessage] = useState('');
    const [isErrorId, setIdError] = useState(false);
    const [isErrorPassword, setPasswordError] = useState(false);
    const [idErrorMessage, setIdErrorMessage] = useState(defaultIdHelperMessage);
    const [passwordErrorMessage, setPasswordMessage] = useState('');

    function handleClickShowPassword() {
        setShowPassword(!showPassword);
    }

    async function save() {
        if (validate()) {
            let response = await api.insert({
                api: "secrets",
                data: {
                    id: uuidv4(),
                    secretId: txtId,
                    passwordAsString: txtPassword
                }
            });
            if (response.status === 201) {
                clearAllData();
                openMessage('Secret created successfully', 'success');
            } else {
                openMessage(response.statusText, 'error');
            }

            document.getElementById("txtId").focus();
        }
    }

    function clearAllData() {
        setTxtId('');
        setTxtPassword('');
    }

    function closeMessage() {
        setOpen(false);
    }

    function openMessage(message, messageType) {
        setMessage(message);
        setMessageType(messageType);
        setOpen(true);
    }

    //Clean the validation before make a new one
    function clearPreviousValidation() {
        setIdError(false);
        setIdErrorMessage(defaultIdHelperMessage);
        setPasswordError(false);
        setPasswordMessage('');
    }

    //Validates the form
    function validate() {
        clearPreviousValidation();
        let validated = true;

        if (txtId.length === 0) {
            setIdError(true);
            setIdErrorMessage('An ID must have a value');
            validated = false;
        }

        if (txtPassword.length === 0) {
            setPasswordError(true);
            setPasswordMessage('The password must have a value');
            validated = false;
        }

        return validated;
    }

    //Check if enter was pressed and then fires up the save method
    function enterWasPressed(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            save();
        }
    }

    return (
        <div className="container">
            <label
                htmlFor="txtId"
                className="label"> Your ID:</label>
            <input
                type="text"
                id="txtId"
                className={isErrorId ? "defaultTextBoxError" : "defaultTextBox"}
                placeholder="Type an ID to identify your key in the future"
                autoFocus
                onChange={e => setTxtId(e.target.value)}
                value={txtId}></input>
            <label
                className={isErrorId ? "showLabelError" : "labelError"}>
                {idErrorMessage}
            </label>

            <label
                id="labelPassword"
                htmlFor="txtPassword"
                className="label"> Your password:</label>
            <input
                type={showPassword ? 'text' : 'password'}
                id="txtPassword"
                className={isErrorPassword ? "defaultTextBoxError" : "defaultTextBox"}
                placeholder="Type the password you want"
                onChange={e => setTxtPassword(e.target.value)}
                value={txtPassword}></input>
            <label
                className={isErrorPassword ? "showLabelError" : "labelError"}>
                {passwordErrorMessage}
            </label>
            <div
                className="viewPassword">
                <button
                    className="buttonPassword"
                    onClick={() => handleClickShowPassword()}>View password</button>
            </div>

            <div className="save">
                <button
                    className="saveButton"
                    onClick={() => save()}>
                    Save
                </button>
            </div>

            <SnackBar
                open={open}
                onClose={() => closeMessage()}
                autoHideDuration={2000}>
                <MuiAlert elevation={6} variant="filled" severity={messageType}>
                    {message}
                </MuiAlert>
            </SnackBar>
        </div>
    );
}


export default Secret;