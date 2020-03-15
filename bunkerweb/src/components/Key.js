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

                <FormControl >
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        // id="standard-adornment-password"
                        // type={values.showPassword ? 'text' : 'password'}
                        // value={values.password}
                        // onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    // onClick={handleClickShowPassword}
                                    // onMouseDown={handleMouseDownPassword}
                                >
                                    <Visibility />
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