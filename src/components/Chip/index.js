import React from 'react';
import './Chip.css';
import '../../global.css';
import CloseIcon from '@material-ui/icons/Close';
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
        <div className="rectangle" tabIndex="0" role="complementary" aria-label="Tab again to use the remove button and delete this keyword">
            <ThemeProvider theme={theme}>
                <p className="content smallFont" >{label}</p>
                <button
                    className="close"
                    onClick={onDelete}>
                    {/* <i> */}
                        <CloseIcon
                            color="primary"
                            // className="closeIcon"
                            fontSize="small"/>
                    {/* </i> */}
                </button>
            </ThemeProvider>
        </div>
    )
}

Chip.propTypes = {
    label: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default Chip;