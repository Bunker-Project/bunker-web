import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import './Secret.css';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import Api from '../Api';
import { v4 as uuidv4 } from 'uuid'
import '../global.css';
import LockIcon from '@material-ui/icons/Lock';
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

    function handleMouseDownPassword(event) {
        event.preventDefault();
    }

    async function save() {
        if (validate()) {
            let response = await api.insert({
                api: "secrets",
                data: {
                    id: uuidv4(),
                    secretId: txtId,
                    password: txtPassword
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
    function enterWasPressed(e){
        if (e.key === 'Enter') {
            e.preventDefault();
            save();
        }
    }

    return (
        <div className="container">
            <div className="inputId">
                <TextField
                    id="txtId"
                    label="Your ID"
                    style={{ margin: 8 }}
                    placeholder="Type an ID to identify your key in the future"
                    helperText={idErrorMessage}
                    fullWidth
                    error={isErrorId}
                    margin="normal"
                    value={txtId}
                    onChange={e => setTxtId(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon color="action" className="lockIcon" />
                            </InputAdornment>
                        ),
                        shrink: true
                    }}
                />
            </div>
            <div className="inputPassword">
                <TextField
                    label="Your password"
                    id="txtPassword"
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Type the password you want"
                    helperText={passwordErrorMessage}
                    error={isErrorPassword}
                    value={txtPassword}
                    onChange={e => setTxtPassword(e.target.value)}
                    onKeyDown={enterWasPressed}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>),
                        shrink: true
                    }}
                />
            </div>
            <div className="save">
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => save()}
                    startIcon={<CheckIcon></CheckIcon>}>
                    Save
                    </Button>
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