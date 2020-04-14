import React from 'react';
import './Chip.css';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

function Chip({ title }) {

    const palette = {
        primary: {
            main: '#fff'
        }
    };

    const theme = createMuiTheme({ palette });

    return (
        <div className="rectangle">
            <ThemeProvider theme={theme}>
                <p className="content">Key 0hdauiohdaihdauidaiduih</p>
                <IconButton size="small" className="close">
                    <CloseIcon color="primary" fontSize="inherit" />
                </IconButton>
            </ThemeProvider>
        </div>
    )
}

export default Chip;