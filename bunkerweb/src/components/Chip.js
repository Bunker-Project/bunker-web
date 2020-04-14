import React from 'react';
import './Chip.css';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import PropTypes from 'prop-types';

function Chip({ label, onDelete }) {

    const palette = {
        primary: {
            main: '#fff'
        }
    };

    const theme = createMuiTheme({ palette });

    return (
        <div className="rectangle">
            <ThemeProvider theme={theme}>
                <p className="content">{label}</p>
                <IconButton
                    size="small"
                    className="close"
                    onClick={onDelete}>
                        <CloseIcon 
                            color="primary" 
                            fontSize="inherit" />
                </IconButton>
            </ThemeProvider>
        </div>
    )
}

Chip.propTypes = {
    label: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default Chip;