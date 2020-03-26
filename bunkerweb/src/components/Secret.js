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
            <TextField
                id="txtId"
                label="Type an ID"
                style={{ margin: 8 }}
                placeholder="Type an ID to identify your key in the future"
                helperText="* This field is required, otherwise we can not find the key for you afterwards :)"
                fullWidth
                margin="normal"
                value={txtId}
                onChange={e => setTxtId(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <FormControl className='pwd'>
                <InputLabel htmlFor="txtPassword">Password</InputLabel>
                <Input
                    id="txtPassword"
                    type={showPassword ? 'text' : 'password'}
                    onChange={e => setTxtPassword(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
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