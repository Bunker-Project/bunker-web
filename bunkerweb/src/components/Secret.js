import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import './Secret.css';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import Api from '../Api';
import { v4 as uuidv4 } from 'uuid'
import '../global.css';
import LockIcon from '@material-ui/icons/Lock';

// class Secret extends React.Component {
function Secret(props) {

    const api = new Api({ isDev: true });
    const [showPassword, setShowPassword] = useState(false);
    const [txtId, setTxtId] = useState('');
    const [txtPassword, setTxtPassword] = useState('');


    function handleClickShowPassword() {
        setShowPassword(!showPassword);
    }

    function handleMouseDownPassword(event) {
        event.preventDefault();
    }

    function save() {
        api.insert({
            api: "secrets",
            data: {
                id: uuidv4(),
                secretId: txtId,
                description: txtPassword
            }
        });
    }

    return (
        <div className="container">
            <div className="inputId">
                <TextField
                    id="txtId"
                    label="Your ID"
                    style={{ margin: 8 }}
                    placeholder="Type an ID to identify your key in the future"
                    helperText="* This field is required, otherwise we can not find the key for you afterwards :)"
                    fullWidth
                    margin="normal"
                    value={txtId}
                    onChange={e => setTxtId(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon color="action" className="lockIcon"/>
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
                    value={txtPassword}
                    onChange={e => setTxtPassword(e.target.value)}
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
        </div>
    );
}


export default Secret;