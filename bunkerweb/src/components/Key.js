import React from 'react';
import TextField from '@material-ui/core/TextField';
import './Key.css';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

class Key extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            showPassword: false,
        }
    }

    handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword});
    }

    handleMouseDownPassword = event => {
        event.preventDefault();
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
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <FormControl className='pwd'>
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={this.state.showPassword ? 'text' : 'password'}
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

            </div>
        );
    }
}

export default Key;