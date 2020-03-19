import React from 'react';
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

class Secret extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            api: new Api({ isDev: true }),
            txtId: '',
            txtPassword: ''
        }
    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    }

    handleMouseDownPassword = event => {
        event.preventDefault();
    }

    updateVariables = event => {
        console.log(event.target.id);
        console.log(event.target.value);
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    save = () => {
        this.state.api.insert({
            api: "secrets",
            data: {
                id: uuidv4(),
                secretId: this.state.txtId,
                description: this.state.txtPassword
            }
        });
    }

    render() {
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
                    value={this.state.txtId}
                    onChange={this.updateVariables}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <FormControl className='pwd'>
                    <InputLabel htmlFor="txtPassword">Password</InputLabel>
                    <Input
                        id="txtPassword"
                        type={this.state.showPassword ? 'text' : 'password'}
                        onChange={this.updateVariables}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                    onMouseDown={this.handleMouseDownPassword}
                                >
                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <div className="save">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => this.save()}
                        startIcon={<CheckIcon></CheckIcon>}>
                        Save
                    </Button>
                </div>
            </div>
        );
    }
}

export default Secret;